"""
Contact Message Model

This module defines the data model for contact form submissions.
Messages are stored in MongoDB with validation rules and timestamps.
"""

from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional
from datetime import datetime
import uuid


class ContactMessageCreate(BaseModel):
    """
    Schema for creating a new contact message.
    Used for validating incoming POST requests from the contact form.
    
    Fields:
        name: Sender's full name (2-100 characters)
        email: Valid email address
        subject: Message subject line (3-200 characters)
        message: Main message content (10-2000 characters)
    """
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr  # Validates email format automatically
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    
    @validator('name')
    def validate_name(cls, v):
        """Ensure name doesn't contain only whitespace"""
        if not v.strip():
            raise ValueError('Name cannot be empty or only whitespace')
        return v.strip()
    
    @validator('subject')
    def validate_subject(cls, v):
        """Ensure subject doesn't contain only whitespace"""
        if not v.strip():
            raise ValueError('Subject cannot be empty or only whitespace')
        return v.strip()
    
    @validator('message')
    def validate_message(cls, v):
        """Ensure message doesn't contain only whitespace"""
        if not v.strip():
            raise ValueError('Message cannot be empty or only whitespace')
        return v.strip()


class ContactMessage(ContactMessageCreate):
    """
    Complete contact message model with system-generated fields.
    Extends ContactMessageCreate with additional metadata.
    
    Additional Fields:
        id: Unique identifier (UUID)
        created_at: Timestamp when message was received
        status: Message status (new/read/archived)
        ip_address: Optional IP address of sender (for spam prevention)
    """
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")  # new, read, archived
    ip_address: Optional[str] = None
    
    class Config:
        # Allow arbitrary types for datetime serialization
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class ContactMessageResponse(BaseModel):
    """
    Response schema for contact message operations.
    Used to return data to the frontend after successful operations.
    
    Fields:
        id: Message unique identifier
        name: Sender's name
        email: Sender's email
        subject: Message subject
        message: Message content
        created_at: When message was created
        status: Current message status
    """
    id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    status: str
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }