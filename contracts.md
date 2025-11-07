# API Contracts - Portfolio Website

## Overview
This document outlines the API contracts for the portfolio website's backend integration, specifically for the contact form functionality.

## Mock Data Removal
Currently using mock data in `/app/frontend/src/mock.js` for:
- Personal information (static - will remain as is)
- Skills (static - will remain as is)
- Experience (static - will remain as is)
- Projects (static - will remain as is)
- Education (static - will remain as is)
- Philosophy (static - will remain as is)
- Testimonials (static - will remain as is)

**To Remove/Integrate:**
- Contact form submission (currently mocked) - will connect to backend API

## Backend Implementation

### 1. Database Models

#### ContactMessage Model
```python
{
    "id": "uuid",
    "name": "string",
    "email": "string",
    "subject": "string", 
    "message": "string",
    "created_at": "datetime",
    "status": "string (new/read/archived)",
    "ip_address": "string (optional)"
}
```

### 2. API Endpoints

#### POST /api/contact
**Purpose:** Submit a contact form message

**Request Body:**
```json
{
    "name": "string (required, min 2 chars)",
    "email": "string (required, valid email)",
    "subject": "string (required, min 3 chars)",
    "message": "string (required, min 10 chars)"
}
```

**Response (Success - 201):**
```json
{
    "success": true,
    "message": "Message sent successfully!",
    "data": {
        "id": "message-uuid",
        "created_at": "timestamp"
    }
}
```

**Response (Error - 400):**
```json
{
    "success": false,
    "message": "Validation error message",
    "errors": {
        "field": "error description"
    }
}
```

#### GET /api/contact/messages
**Purpose:** Retrieve all contact messages (for admin use)

**Response (Success - 200):**
```json
{
    "success": true,
    "count": 10,
    "messages": [
        {
            "id": "uuid",
            "name": "string",
            "email": "string",
            "subject": "string",
            "message": "string",
            "created_at": "timestamp",
            "status": "string"
        }
    ]
}
```

#### GET /api/contact/messages/{id}
**Purpose:** Retrieve a specific message by ID

**Response (Success - 200):**
```json
{
    "success": true,
    "message": {
        "id": "uuid",
        "name": "string",
        "email": "string",
        "subject": "string",
        "message": "string",
        "created_at": "timestamp",
        "status": "string"
    }
}
```

## Frontend Integration

### Files to Modify
1. `/app/frontend/src/components/Contact.jsx`
   - Update `handleSubmit` function to call backend API
   - Add loading state during submission
   - Add error handling
   - Update success/error toast messages

### Integration Steps

1. **Contact Form Submission:**
   - Import axios for API calls
   - Add loading state: `const [isSubmitting, setIsSubmitting] = useState(false)`
   - Add error state: `const [error, setError] = useState(null)`
   - Update handleSubmit to make POST request to `/api/contact`
   - Handle success and error responses
   - Show appropriate toast notifications

2. **Error Handling:**
   - Network errors
   - Validation errors from backend
   - Display user-friendly error messages

3. **Loading States:**
   - Disable form inputs during submission
   - Show loading indicator on submit button
   - Prevent multiple submissions

## Validation Rules

### Frontend Validation
- Name: min 2 characters, max 100 characters
- Email: valid email format
- Subject: min 3 characters, max 200 characters
- Message: min 10 characters, max 2000 characters

### Backend Validation
- Same as frontend plus:
- Email format validation using email-validator
- XSS prevention
- Rate limiting (optional for future)

## Security Considerations
1. Input sanitization on backend
2. CORS already configured
3. Email validation
4. Optional: Rate limiting to prevent spam
5. Optional: CAPTCHA integration for future enhancement

## Testing Checklist
- [ ] Test successful form submission
- [ ] Test validation errors (empty fields)
- [ ] Test invalid email format
- [ ] Test very long messages
- [ ] Test network error handling
- [ ] Test loading states
- [ ] Verify data is stored in MongoDB
- [ ] Test toast notifications display correctly
