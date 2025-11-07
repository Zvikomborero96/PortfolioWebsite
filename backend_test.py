"""
Backend API Testing for Ashley Z Hove's Portfolio Website
Tests all contact form endpoints with various scenarios
"""

import requests
import json
from datetime import datetime

# Load backend URL from frontend .env
import os
from pathlib import Path

# Read the backend URL from frontend .env
env_path = Path("/app/frontend/.env")
backend_url = None
if env_path.exists():
    with open(env_path, 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                backend_url = line.split('=', 1)[1].strip()
                break

if not backend_url:
    backend_url = "http://localhost:8001"

BASE_URL = f"{backend_url}/api"

print(f"\n{'='*80}")
print(f"BACKEND API TESTING - Ashley Z Hove Portfolio")
print(f"{'='*80}")
print(f"Base URL: {BASE_URL}")
print(f"Test Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print(f"{'='*80}\n")

# Track test results
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def print_test_header(test_name):
    """Print formatted test header"""
    print(f"\n{'─'*80}")
    print(f"TEST: {test_name}")
    print(f"{'─'*80}")

def print_result(passed, message, details=None):
    """Print test result with formatting"""
    status = "✅ PASSED" if passed else "❌ FAILED"
    print(f"{status}: {message}")
    if details:
        print(f"Details: {details}")
    
    if passed:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1
        test_results["errors"].append(f"{message}: {details}")

def print_response(response):
    """Print formatted response details"""
    print(f"\nResponse Status: {response.status_code}")
    try:
        print(f"Response Body: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Response Body: {response.text}")


# ============================================================================
# TEST 1: Health Check
# ============================================================================
print_test_header("Health Check - GET /api/")

try:
    response = requests.get(f"{BASE_URL}/", timeout=10)
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        if "message" in data:
            print_result(True, "Health check endpoint working")
        else:
            print_result(False, "Health check response missing 'message' field", data)
    else:
        print_result(False, f"Expected status 200, got {response.status_code}", response.text)
        
except Exception as e:
    print_result(False, "Health check request failed", str(e))


# ============================================================================
# TEST 2: Successful Contact Form Submission
# ============================================================================
print_test_header("Successful Contact Form Submission - POST /api/contact")

valid_payload = {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a potential project with you. Looking forward to hearing back."
}

try:
    response = requests.post(
        f"{BASE_URL}/contact",
        json=valid_payload,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    print_response(response)
    
    if response.status_code == 201:
        data = response.json()
        if data.get("success") and "data" in data and "id" in data["data"]:
            print_result(True, "Contact form submission successful with valid data")
            # Store message ID for later tests
            message_id = data["data"]["id"]
        else:
            print_result(False, "Response missing expected fields", data)
    else:
        print_result(False, f"Expected status 201, got {response.status_code}", response.text)
        
except Exception as e:
    print_result(False, "Contact form submission request failed", str(e))


# ============================================================================
# TEST 3: Validation Error - Missing Required Field (name)
# ============================================================================
print_test_header("Validation Error - Missing Required Field - POST /api/contact")

missing_name_payload = {
    "email": "test@example.com",
    "subject": "Test",
    "message": "Test message with sufficient length to pass validation"
}

try:
    response = requests.post(
        f"{BASE_URL}/contact",
        json=missing_name_payload,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    print_response(response)
    
    if response.status_code == 422:
        print_result(True, "Validation error correctly returned for missing 'name' field")
    else:
        print_result(False, f"Expected status 422, got {response.status_code}", response.text)
        
except Exception as e:
    print_result(False, "Validation test request failed", str(e))


# ============================================================================
# TEST 4: Validation Error - Invalid Email
# ============================================================================
print_test_header("Validation Error - Invalid Email - POST /api/contact")

invalid_email_payload = {
    "name": "Test User",
    "email": "notanemail",
    "subject": "Test",
    "message": "Test message here with enough characters to pass length validation"
}

try:
    response = requests.post(
        f"{BASE_URL}/contact",
        json=invalid_email_payload,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    print_response(response)
    
    if response.status_code == 422:
        print_result(True, "Validation error correctly returned for invalid email format")
    else:
        print_result(False, f"Expected status 422, got {response.status_code}", response.text)
        
except Exception as e:
    print_result(False, "Invalid email test request failed", str(e))


# ============================================================================
# TEST 5: Validation Error - Message Too Short
# ============================================================================
print_test_header("Validation Error - Message Too Short - POST /api/contact")

short_message_payload = {
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Short"
}

try:
    response = requests.post(
        f"{BASE_URL}/contact",
        json=short_message_payload,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    print_response(response)
    
    if response.status_code == 422:
        print_result(True, "Validation error correctly returned for message too short (< 10 chars)")
    else:
        print_result(False, f"Expected status 422, got {response.status_code}", response.text)
        
except Exception as e:
    print_result(False, "Short message test request failed", str(e))


# ============================================================================
# TEST 6: Get All Messages (Admin)
# ============================================================================
print_test_header("Get All Messages - GET /api/contact/messages")

try:
    response = requests.get(f"{BASE_URL}/contact/messages", timeout=10)
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        if "success" in data and "count" in data and "messages" in data:
            print_result(True, f"Successfully retrieved all messages (count: {data['count']})")
        else:
            print_result(False, "Response missing expected fields", data)
    else:
        print_result(False, f"Expected status 200, got {response.status_code}", response.text)
        
except Exception as e:
    print_result(False, "Get all messages request failed", str(e))


# ============================================================================
# FINAL SUMMARY
# ============================================================================
print(f"\n{'='*80}")
print(f"TEST SUMMARY")
print(f"{'='*80}")
print(f"Total Tests: {test_results['passed'] + test_results['failed']}")
print(f"✅ Passed: {test_results['passed']}")
print(f"❌ Failed: {test_results['failed']}")

if test_results['failed'] > 0:
    print(f"\n{'─'*80}")
    print("FAILED TESTS:")
    print(f"{'─'*80}")
    for i, error in enumerate(test_results['errors'], 1):
        print(f"{i}. {error}")

print(f"\n{'='*80}")
print(f"Test Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print(f"{'='*80}\n")

# Exit with appropriate code
exit(0 if test_results['failed'] == 0 else 1)
