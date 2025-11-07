"""
FastAPI Backend Server for Portfolio Website

This is the main application file that:
1. Initializes FastAPI app
2. Configures CORS for frontend communication
3. Connects to MongoDB database
4. Registers API routes (contact form, etc.)
5. Handles application lifecycle (startup/shutdown)

Environment Variables Required:
- MONGO_URL: MongoDB connection string
- DB_NAME: Database name
"""

from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import contact routes
from routes import contact as contact_routes

# Get the directory where this file is located
ROOT_DIR = Path(__file__).parent

# Load environment variables from .env file
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection setup
# MONGO_URL contains the connection string (e.g., mongodb://localhost:27017)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]  # Get specific database

# Create the main FastAPI application
# No prefix here - we'll add /api prefix to the router
app = FastAPI(
    title="Portfolio API",
    description="Backend API for Ashley Z Hove's portfolio website",
    version="1.0.0"
)

# Create a router with /api prefix
# All routes registered to this router will have /api prepended
api_router = APIRouter(prefix="/api")


# ============================================================================
# EXAMPLE/DEMO ROUTES (can be removed in production)
# ============================================================================

class StatusCheck(BaseModel):
    """Example model for status check endpoint"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    """Input model for creating status check"""
    client_name: str


@api_router.get("/")
async def root():
    """
    Root endpoint - simple health check.
    Returns: Welcome message confirming API is running
    """
    return {"message": "Portfolio API is running!"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    """
    Example endpoint demonstrating database operations.
    Creates a status check record in MongoDB.
    """
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    """
    Example endpoint to retrieve all status checks.
    Demonstrates querying MongoDB.
    """
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# ============================================================================
# REGISTER CONTACT ROUTES
# ============================================================================

# Inject database into contact routes module
contact_routes.set_database(db)

# Include contact router - all contact routes will be at /api/contact/*
api_router.include_router(contact_routes.router)

# ============================================================================
# FINALIZE APP SETUP
# ============================================================================

# Register the main API router with the app
app.include_router(api_router)

# Configure CORS (Cross-Origin Resource Sharing)
# This allows the React frontend to make requests to this backend
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,  # Allow cookies
    allow_origins=["*"],     # Allow all origins (restrict in production)
    allow_methods=["*"],     # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],     # Allow all headers
)

# ============================================================================
# LOGGING CONFIGURATION
# ============================================================================

# Set up logging for debugging and monitoring
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============================================================================
# APPLICATION LIFECYCLE EVENTS
# ============================================================================

@app.on_event("shutdown")
async def shutdown_db_client():
    """
    Cleanup function called when application shuts down.
    Properly closes MongoDB connection to prevent resource leaks.
    """
    logger.info("Closing MongoDB connection...")
    client.close()
    logger.info("MongoDB connection closed.")


@app.on_event("startup")
async def startup_event():
    """
    Initialization function called when application starts.
    Can be used for:
    - Database connection verification
    - Cache warming
    - Loading configurations
    """
    logger.info("Portfolio API starting up...")
    logger.info(f"Connected to database: {os.environ['DB_NAME']}")
    logger.info("API is ready to receive requests!")
