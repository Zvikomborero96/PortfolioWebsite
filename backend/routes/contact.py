"""
Contact Form API Routes

This module handles all contact form related API endpoints:
- POST /api/contact: Submit a new contact message
- GET /api/contact/messages: Retrieve all messages (admin)
- GET /api/contact/messages/{id}: Retrieve specific message

All routes include error handling and validation.
"""

from fastapi import APIRouter, HTTPException, Request, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List
import logging
from datetime import datetime

# Import our contact models
from models.contact import (
    ContactMessageCreate,
    ContactMessage,
    ContactMessageResponse
)

# Set up logging for debugging and monitoring
logger = logging.getLogger(__name__)

# Create router instance - will be included in main app
router = APIRouter(prefix="/contact", tags=["contact"])

# Database instance will be injected when router is included
db: AsyncIOMotorDatabase = None


def set_database(database: AsyncIOMotorDatabase):
    """
    Inject database instance into the router.
    Called from main server.py after DB connection is established.
    
    Args:
        database: MongoDB database instance
    """
    global db
    db = database


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_contact_message(message_data: ContactMessageCreate, request: Request):
    """
    Handle contact form submission.
    
    Process:
    1. Validate incoming data (automatic via Pydantic)
    2. Create ContactMessage object with generated fields
    3. Store in MongoDB
    4. Return success response with message ID
    
    Args:
        message_data: Validated contact form data
        request: FastAPI request object (to get IP address)
    
    Returns:
        dict: Success response with message ID and timestamp
        
    Raises:
        HTTPException: 500 if database operation fails
    
    Example Response:
        {
            "success": true,
            "message": "Message sent successfully!",
            "data": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "created_at": "2025-07-15T10:30:00"
            }
        }
    """
    try:
        # Extract client IP address for spam prevention (optional)
        client_ip = request.client.host if request.client else None
        
        # Create full message object with system-generated fields
        contact_message = ContactMessage(
            **message_data.dict(),  # Spread validated user data
            ip_address=client_ip    # Add IP address
        )
        
        # Convert to dict for MongoDB insertion
        message_dict = contact_message.dict()
        
        # Insert into MongoDB 'contact_messages' collection
        result = await db.contact_messages.insert_one(message_dict)
        
        # Log successful submission
        logger.info(f"Contact message created: {contact_message.id} from {message_data.email}")
        
        # Return success response
        return {
            "success": True,
            "message": "Message sent successfully! I'll get back to you soon.",
            "data": {
                "id": contact_message.id,
                "created_at": contact_message.created_at.isoformat()
            }
        }
    
    except Exception as e:
        # Log error for debugging
        logger.error(f"Error creating contact message: {str(e)}")
        
        # Return user-friendly error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send message. Please try again later."
        )


@router.get("/messages", response_model=dict)
async def get_all_messages():
    """
    Retrieve all contact messages (Admin endpoint).
    
    Process:
    1. Query all messages from database
    2. Sort by created_at (newest first)
    3. Return with count
    
    Returns:
        dict: All messages with count
        
    Example Response:
        {
            "success": true,
            "count": 5,
            "messages": [{...}, {...}]
        }
    
    Note:
        In production, this should be protected with authentication.
    """
    try:
        # Fetch all messages, sorted by newest first
        messages_cursor = db.contact_messages.find().sort("created_at", -1)
        messages = await messages_cursor.to_list(length=None)
        
        # Convert ObjectId to string for JSON serialization
        for msg in messages:
            msg['_id'] = str(msg['_id'])
        
        logger.info(f"Retrieved {len(messages)} contact messages")
        
        return {
            "success": True,
            "count": len(messages),
            "messages": messages
        }
    
    except Exception as e:
        logger.error(f"Error fetching messages: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve messages"
        )


@router.get("/messages/{message_id}", response_model=dict)
async def get_message_by_id(message_id: str):
    """
    Retrieve a specific contact message by ID.
    
    Args:
        message_id: UUID of the message
        
    Returns:
        dict: Message details
        
    Raises:
        HTTPException: 404 if message not found
    
    Example Response:
        {
            "success": true,
            "message": {...}
        }
    """
    try:
        # Find message by ID
        message = await db.contact_messages.find_one({"id": message_id})
        
        if not message:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Message with ID {message_id} not found"
            )
        
        # Convert ObjectId to string
        message['_id'] = str(message['_id'])
        
        logger.info(f"Retrieved message: {message_id}")
        
        return {
            "success": True,
            "message": message
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching message {message_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve message"
        )


@router.patch("/messages/{message_id}/status", response_model=dict)
async def update_message_status(message_id: str, status: str):
    """
    Update the status of a contact message (Admin endpoint).
    
    Args:
        message_id: UUID of the message
        status: New status (new/read/archived)
        
    Returns:
        dict: Updated message
        
    Raises:
        HTTPException: 400 if invalid status, 404 if message not found
    """
    # Validate status value
    valid_statuses = ["new", "read", "archived"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    
    try:
        # Update message status
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Message with ID {message_id} not found"
            )
        
        logger.info(f"Updated message {message_id} status to {status}")
        
        return {
            "success": True,
            "message": f"Message status updated to {status}"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating message status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update message status"
        )
