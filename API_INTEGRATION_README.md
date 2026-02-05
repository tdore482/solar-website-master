# API Integration Guide for Solar Website Frontend

This document provides comprehensive information about **frontend API endpoints only** required for the Solar Website Next.js frontend to integrate with an existing PHP backend and database. 

**Note:** This document does not include admin/dashboard endpoints as those are managed separately. Only public-facing endpoints needed for the frontend are documented here.

## Table of Contents

1. [Base URL and Configuration](#base-url-and-configuration)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)
6. [PHP Implementation Examples](#php-implementation-examples)

---

## Base URL and Configuration

### Base URL
```
https://your-backend-domain.com/api/v1
```

### Content-Type
All requests and responses use `application/json` with UTF-8 encoding.

### CORS Headers
The backend should include the following CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-API-Key
Access-Control-Max-Age: 3600
```

---

## Authentication

### API Key Authentication

For POST endpoints (quotes, contact forms), use API key authentication via header. GET endpoints are public and do not require authentication.

**Header Format:**
```
X-API-Key: your-api-key-here
```

**PHP Implementation:**
```php
<?php
function validateApiKey($apiKey) {
    // Validate against database or environment variable
    $validKey = getenv('API_KEY') ?? 'your-secret-api-key';
    return hash_equals($validKey, $apiKey);
}

$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
if (!validateApiKey($apiKey)) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid API key']);
    exit;
}
?>
```

**Note:** The dashboard for managing content (blog posts, testimonials, etc.) is separate and not part of this API documentation.

---

## API Endpoints

This section documents all endpoints required for frontend integration. These are the only endpoints needed to connect the Next.js frontend to the PHP backend.

### 1. Quote Requests

#### POST /api/v1/quotes
Submit a new quote request.

**Authentication:** API Key (X-API-Key header)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Main Street, City, State ZIP",
  "propertyType": "residential",
  "roofType": "shingle",
  "monthlyBill": "$150",
  "systemType": "on-grid",
  "batteryStorage": "yes",
  "budget": "10k-25k",
  "notes": "Additional information or questions..."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Quote request submitted successfully",
  "data": {
    "id": 123,
    "quoteNumber": "QT-2024-001234",
    "status": "pending",
    "submittedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "email": ["Email is required"],
    "phone": ["Phone number is invalid"]
  }
}
```

**PHP Implementation:**
```php
<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Validate API key
$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
if (!validateApiKey($apiKey)) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid API key']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$errors = [];
$required = ['name', 'email', 'phone', 'address', 'propertyType', 'roofType', 'monthlyBill', 'systemType', 'batteryStorage', 'budget'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        $errors[$field] = ucfirst($field) . ' is required';
    }
}

// Validate email
if (!filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email format';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

// Insert into database
try {
    $pdo = new PDO('mysql:host=localhost;dbname=solar_db', $username, $password);
    $stmt = $pdo->prepare("
        INSERT INTO quotes (
            name, email, phone, address, property_type, roof_type,
            monthly_bill, system_type, battery_storage, budget, notes,
            status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    ");
    
    $stmt->execute([
        $input['name'],
        $input['email'],
        $input['phone'],
        $input['address'],
        $input['propertyType'],
        $input['roofType'],
        $input['monthlyBill'],
        $input['systemType'],
        $input['batteryStorage'],
        $input['budget'],
        $input['notes'] ?? ''
    ]);
    
    $quoteId = $pdo->lastInsertId();
    $quoteNumber = 'QT-' . date('Y') . '-' . str_pad($quoteId, 6, '0', STR_PAD_LEFT);
    
    // Update quote number
    $stmt = $pdo->prepare("UPDATE quotes SET quote_number = ? WHERE id = ?");
    $stmt->execute([$quoteNumber, $quoteId]);
    
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Quote request submitted successfully',
        'data' => [
            'id' => $quoteId,
            'quoteNumber' => $quoteNumber,
            'status' => 'pending',
            'submittedAt' => date('c')
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error occurred'
    ]);
}
?>
```

---

### 2. Contact Messages

#### POST /api/v1/contact
Submit a contact form message.

**Authentication:** API Key (X-API-Key header)

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1 (555) 987-6543",
  "subject": "General Inquiry",
  "message": "I'm interested in learning more about your solar solutions."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Contact message submitted successfully",
  "data": {
    "id": 456,
    "submittedAt": "2024-01-15T11:00:00Z"
  }
}
```

**PHP Implementation:**
```php
<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Validate API key
$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
if (!validateApiKey($apiKey)) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid API key']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$errors = [];
$required = ['name', 'email', 'phone', 'subject', 'message'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        $errors[$field] = ucfirst($field) . ' is required';
    }
}

if (!filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email format';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=solar_db', $username, $password);
    $stmt = $pdo->prepare("
        INSERT INTO contact_messages (
            name, email, phone, subject, message, created_at
        ) VALUES (?, ?, ?, ?, ?, NOW())
    ");
    
    $stmt->execute([
        $input['name'],
        $input['email'],
        $input['phone'],
        $input['subject'],
        $input['message']
    ]);
    
    $messageId = $pdo->lastInsertId();
    
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Contact message submitted successfully',
        'data' => [
            'id' => $messageId,
            'submittedAt' => date('c')
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error occurred'
    ]);
}
?>
```

---

### 3. Blog Posts

#### GET /api/v1/blog/posts
Get list of all blog posts with pagination.

**Authentication:** None (Public endpoint)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)
- `category` (optional): Filter by category
- `search` (optional): Search in title and excerpt

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": 1,
        "slug": "benefits-of-solar-energy",
        "title": "Top 10 Benefits of Switching to Solar Energy",
        "excerpt": "Discover the numerous advantages of solar energy...",
        "date": "2024-01-15",
        "readTime": "5 min read",
        "category": "Solar Energy",
        "image": "/images/blog-1.jpg",
        "author": "SolarPower Team"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 48,
      "itemsPerPage": 10
    }
  }
}
```

#### GET /api/v1/blog/posts/{slug}
Get a single blog post by slug.

**Authentication:** None (Public endpoint)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "benefits-of-solar-energy",
    "title": "Top 10 Benefits of Switching to Solar Energy",
    "content": "<p>Solar energy has become one of the most popular...</p>",
    "date": "2024-01-15",
    "readTime": "5 min read",
    "category": "Solar Energy",
    "author": "SolarPower Team",
    "image": "/images/blog-1.jpg",
    "metaDescription": "Discover the numerous advantages...",
    "publishedAt": "2024-01-15T08:00:00Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Blog post not found"
}
```

**PHP Implementation:**
```php
<?php
header('Content-Type: application/json');

// Get blog posts list
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['slug'])) {
    $page = max(1, intval($_GET['page'] ?? 1));
    $limit = min(50, max(1, intval($_GET['limit'] ?? 10)));
    $offset = ($page - 1) * $limit;
    $category = $_GET['category'] ?? null;
    $search = $_GET['search'] ?? null;
    
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=solar_db', $username, $password);
        
        $where = ['published = 1'];
        $params = [];
        
        if ($category) {
            $where[] = 'category = ?';
            $params[] = $category;
        }
        
        if ($search) {
            $where[] = '(title LIKE ? OR excerpt LIKE ?)';
            $searchTerm = "%{$search}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        $whereClause = implode(' AND ', $where);
        
        // Get total count
        $countStmt = $pdo->prepare("SELECT COUNT(*) FROM blog_posts WHERE {$whereClause}");
        $countStmt->execute($params);
        $totalItems = $countStmt->fetchColumn();
        
        // Get posts
        $stmt = $pdo->prepare("
            SELECT id, slug, title, excerpt, date, read_time, category, image, author
            FROM blog_posts
            WHERE {$whereClause}
            ORDER BY date DESC, id DESC
            LIMIT ? OFFSET ?
        ");
        $params[] = $limit;
        $params[] = $offset;
        $stmt->execute($params);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Format dates
        foreach ($posts as &$post) {
            $post['date'] = date('Y-m-d', strtotime($post['date']));
            $post['readTime'] = $post['read_time'];
            unset($post['read_time']);
        }
        
        $totalPages = ceil($totalItems / $limit);
        
        echo json_encode([
            'success' => true,
            'data' => [
                'posts' => $posts,
                'pagination' => [
                    'currentPage' => $page,
                    'totalPages' => $totalPages,
                    'totalItems' => $totalItems,
                    'itemsPerPage' => $limit
                ]
            ]
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
}

// Get single blog post by slug
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['slug'])) {
    $slug = $_GET['slug'];
    
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=solar_db', $username, $password);
        $stmt = $pdo->prepare("
            SELECT id, slug, title, content, date, read_time, category, author, image
            FROM blog_posts
            WHERE slug = ? AND published = 1
        ");
        $stmt->execute([$slug]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$post) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Blog post not found']);
            exit;
        }
        
        $post['date'] = date('Y-m-d', strtotime($post['date']));
        $post['readTime'] = $post['read_time'];
        unset($post['read_time']);
        
        echo json_encode(['success' => true, 'data' => $post]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
}
?>
```

---

### 4. Testimonials

#### GET /api/v1/testimonials
Get all testimonials.

**Authentication:** None (Public endpoint)

**Query Parameters:**
- `limit` (optional): Number of testimonials to return (default: 10, max: 50)
- `featured` (optional): Return only featured testimonials (true/false)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Smith",
      "role": "Homeowner",
      "content": "SolarPower transformed our home with their excellent solar installation. We've cut our electricity bills by 80%!",
      "rating": 5,
      "featured": true,
      "createdAt": "2024-01-10T09:00:00Z"
    }
  ]
}
```

**PHP Implementation:**
```php
<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$limit = min(50, max(1, intval($_GET['limit'] ?? 10)));
$featured = isset($_GET['featured']) ? filter_var($_GET['featured'], FILTER_VALIDATE_BOOLEAN) : null;

try {
    $pdo = new PDO('mysql:host=localhost;dbname=solar_db', $username, $password);
    
    $where = ['approved = 1'];
    $params = [];
    
    if ($featured !== null) {
        $where[] = 'featured = ?';
        $params[] = $featured ? 1 : 0;
    }
    
    $whereClause = implode(' AND ', $where);
    
    $stmt = $pdo->prepare("
        SELECT id, name, role, content, rating, featured, created_at
        FROM testimonials
        WHERE {$whereClause}
        ORDER BY featured DESC, created_at DESC
        LIMIT ?
    ");
    $params[] = $limit;
    $stmt->execute($params);
    $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Format dates
    foreach ($testimonials as &$testimonial) {
        $testimonial['createdAt'] = date('c', strtotime($testimonial['created_at']));
        $testimonial['featured'] = (bool)$testimonial['featured'];
        unset($testimonial['created_at']);
    }
    
    echo json_encode([
        'success' => true,
        'data' => $testimonials
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error']);
}
?>
```

---

### 5. Services

#### GET /api/v1/services
Get all services.

**Authentication:** None (Public endpoint)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Residential Solar",
      "description": "Perfect solar solutions for your home...",
      "features": [
        "Custom system design",
        "Roof or ground mounting",
        "Battery storage options",
        "Smart home integration"
      ],
      "image": "/images/service-1.jpg",
      "icon": "Home",
      "order": 1
    }
  ]
}
```

**PHP Implementation:**
```php
<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=solar_db', $username, $password);
    $stmt = $pdo->query("
        SELECT id, title, description, features, image, icon, display_order
        FROM services
        WHERE active = 1
        ORDER BY display_order ASC, id ASC
    ");
    $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Decode JSON features if stored as JSON
    foreach ($services as &$service) {
        if (is_string($service['features'])) {
            $service['features'] = json_decode($service['features'], true);
        }
        $service['order'] = $service['display_order'];
        unset($service['display_order']);
    }
    
    echo json_encode([
        'success' => true,
        'data' => $services
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error']);
}
?>
```

---

### 6. Business Information

#### GET /api/v1/business/info
Get business contact information and details.

**Authentication:** None (Public endpoint)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "companyName": "SolarPower",
    "phone": "+1 (555) 123-4567",
    "email": "info@solarpower.com",
    "address": "123 Solar Street, Green City, GC 12345",
    "businessHours": {
      "monday": "08:00 am - 05:00 pm",
      "tuesday": "08:00 am - 05:00 pm",
      "wednesday": "08:00 am - 05:00 pm",
      "thursday": "08:00 am - 05:00 pm",
      "friday": "08:00 am - 05:00 pm",
      "saturday": "09:00 am - 12:00 pm",
      "sunday": "Closed"
    },
    "socialMedia": {
      "facebook": "https://facebook.com/solarpower",
      "twitter": "https://twitter.com/solarpower",
      "linkedin": "https://linkedin.com/company/solarpower"
    }
  }
}
```

**PHP Implementation:**
```php
<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=solar_db', $username, $password);
    $stmt = $pdo->query("
        SELECT company_name, phone, email, address, business_hours, social_media
        FROM business_info
        WHERE id = 1
    ");
    $info = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$info) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Business information not found']);
        exit;
    }
    
    // Decode JSON fields
    $info['companyName'] = $info['company_name'];
    unset($info['company_name']);
    
    if (is_string($info['business_hours'])) {
        $info['businessHours'] = json_decode($info['business_hours'], true);
    } else {
        $info['businessHours'] = $info['business_hours'];
    }
    unset($info['business_hours']);
    
    if (is_string($info['social_media'])) {
        $info['socialMedia'] = json_decode($info['social_media'], true);
    } else {
        $info['socialMedia'] = $info['social_media'];
    }
    unset($info['social_media']);
    
    echo json_encode([
        'success' => true,
        'data' => $info
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error']);
}
?>
```

---

### 7. Statistics

#### GET /api/v1/stats
Get company statistics for display.

**Authentication:** None (Public endpoint)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "icon": "Award",
      "value": "15+",
      "label": "Years Experience",
      "order": 1
    },
    {
      "id": 2,
      "icon": "Users",
      "value": "957+",
      "label": "Happy Clients",
      "order": 2
    },
    {
      "id": 3,
      "icon": "Calendar",
      "value": "1839+",
      "label": "Projects Done",
      "order": 3
    },
    {
      "id": 4,
      "icon": "CheckCircle",
      "value": "98%",
      "label": "Satisfaction Rate",
      "order": 4
    }
  ]
}
```

**PHP Implementation:**
```php
<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=solar_db', $username, $password);
    $stmt = $pdo->query("
        SELECT id, icon, value, label, display_order
        FROM statistics
        WHERE active = 1
        ORDER BY display_order ASC, id ASC
    ");
    $stats = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($stats as &$stat) {
        $stat['order'] = $stat['display_order'];
        unset($stat['display_order']);
    }
    
    echo json_encode([
        'success' => true,
        'data' => $stats
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error']);
}
?>
```

---

## Data Models

### Database Schema Recommendations

#### Quotes Table
```sql
CREATE TABLE quotes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quote_number VARCHAR(20) UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    property_type ENUM('residential', 'commercial', 'industrial') NOT NULL,
    roof_type ENUM('shingle', 'tile', 'metal', 'flat', 'other') NOT NULL,
    monthly_bill VARCHAR(50) NOT NULL,
    system_type ENUM('on-grid', 'off-grid', 'hybrid') NOT NULL,
    battery_storage ENUM('yes', 'no', 'maybe') NOT NULL,
    budget ENUM('under-10k', '10k-25k', '25k-50k', '50k-plus') NOT NULL,
    notes TEXT,
    status ENUM('pending', 'reviewed', 'quoted', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

#### Contact Messages Table
```sql
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

#### Blog Posts Table
```sql
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(255) NOT NULL,
    image VARCHAR(500),
    read_time VARCHAR(20),
    meta_description TEXT,
    published BOOLEAN DEFAULT 0,
    date DATE NOT NULL,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_published (published),
    INDEX idx_date (date)
);
```

#### Testimonials Table
```sql
CREATE TABLE testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    featured BOOLEAN DEFAULT 0,
    approved BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_featured (featured),
    INDEX idx_approved (approved),
    INDEX idx_rating (rating)
);
```

#### Services Table
```sql
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    features JSON,
    image VARCHAR(500),
    icon VARCHAR(100),
    active BOOLEAN DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (active),
    INDEX idx_display_order (display_order)
);
```

#### Business Info Table
```sql
CREATE TABLE business_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    business_hours JSON,
    social_media JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Statistics Table
```sql
CREATE TABLE statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    icon VARCHAR(100) NOT NULL,
    value VARCHAR(50) NOT NULL,
    label VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (active),
    INDEX idx_display_order (display_order)
);
```

---

## Error Handling

### Standard Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "errors": {
    "field1": ["Error message 1", "Error message 2"],
    "field2": ["Error message"]
  }
}
```

### HTTP Status Codes

- `200 OK` - Successful GET request
- `201 Created` - Successful POST request (resource created)
- `400 Bad Request` - Validation error or malformed request
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Valid authentication but insufficient permissions
- `404 Not Found` - Resource not found
- `405 Method Not Allowed` - HTTP method not supported
- `500 Internal Server Error` - Server error

### PHP Error Handler Example

```php
<?php
function sendErrorResponse($statusCode, $message, $errors = null) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    
    $response = [
        'success' => false,
        'error' => $message
    ];
    
    if ($errors !== null) {
        $response['errors'] = $errors;
    }
    
    echo json_encode($response);
    exit;
}

// Usage
sendErrorResponse(400, 'Validation failed', ['email' => ['Email is required']]);
?>
```

---

## PHP Implementation Examples

### Complete Router Example

```php
<?php
// api/index.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database connection
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        $host = getenv('DB_HOST') ?: 'localhost';
        $dbname = getenv('DB_NAME') ?: 'solar_db';
        $username = getenv('DB_USER') ?: 'root';
        $password = getenv('DB_PASS') ?: '';
        
        $pdo = new PDO(
            "mysql:host={$host};dbname={$dbname};charset=utf8mb4",
            $username,
            $password,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
    }
    return $pdo;
}

// API Key validation
function validateApiKey($apiKey) {
    $validKey = getenv('API_KEY') ?: 'your-secret-api-key';
    return hash_equals($validKey, $apiKey);
}

// Get request path
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Remove 'api' and 'v1' from path
if (isset($pathParts[0]) && $pathParts[0] === 'api') {
    array_shift($pathParts);
}
if (isset($pathParts[0]) && $pathParts[0] === 'v1') {
    array_shift($pathParts);
}

$resource = $pathParts[0] ?? '';
$id = $pathParts[1] ?? null;
$method = $_SERVER['REQUEST_METHOD'];

// Route handling - Only frontend endpoints
switch ($resource) {
    case 'quotes':
        if ($method === 'POST') {
            require 'endpoints/quotes/create.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
        
    case 'contact':
        if ($method === 'POST') {
            require 'endpoints/contact/create.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
        
    case 'blog':
        if (isset($pathParts[1]) && $pathParts[1] === 'posts') {
            $slug = $pathParts[2] ?? null;
            if ($method === 'GET' && $slug === null) {
                require 'endpoints/blog/list.php';
            } elseif ($method === 'GET' && $slug !== null) {
                $_GET['slug'] = $slug;
                require 'endpoints/blog/get.php';
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
        }
        break;
        
    case 'testimonials':
        if ($method === 'GET') {
            require 'endpoints/testimonials/list.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
        
    case 'services':
        if ($method === 'GET') {
            require 'endpoints/services/list.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
        
    case 'business':
        if (isset($pathParts[1]) && $pathParts[1] === 'info' && $method === 'GET') {
            require 'endpoints/business/info.php';
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
        }
        break;
        
    case 'stats':
        if ($method === 'GET') {
            require 'endpoints/stats/list.php';
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}
?>
```

---

## Security Best Practices

1. **Input Validation**: Always validate and sanitize all user inputs
2. **SQL Injection Prevention**: Use prepared statements (PDO) for all database queries
3. **XSS Prevention**: Escape output when displaying user-generated content
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **HTTPS**: Always use HTTPS in production
6. **API Key Rotation**: Regularly rotate API keys
7. **Error Messages**: Don't expose sensitive information in error messages
8. **CORS**: Configure CORS properly for production

### Rate Limiting Example

```php
<?php
function checkRateLimit($identifier, $maxRequests = 100, $window = 3600) {
    $cacheFile = sys_get_temp_dir() . '/rate_limit_' . md5($identifier) . '.json';
    
    $data = [];
    if (file_exists($cacheFile)) {
        $data = json_decode(file_get_contents($cacheFile), true);
    }
    
    $now = time();
    $windowStart = $now - $window;
    
    // Remove old entries
    $data = array_filter($data, function($timestamp) use ($windowStart) {
        return $timestamp > $windowStart;
    });
    
    if (count($data) >= $maxRequests) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'error' => 'Rate limit exceeded. Please try again later.'
        ]);
        exit;
    }
    
    $data[] = $now;
    file_put_contents($cacheFile, json_encode($data));
}
?>
```

---

## Testing

### Example cURL Commands

#### Submit Quote
```bash
curl -X POST https://your-backend-domain.com/api/v1/quotes \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Main St",
    "propertyType": "residential",
    "roofType": "shingle",
    "monthlyBill": "$150",
    "systemType": "on-grid",
    "batteryStorage": "yes",
    "budget": "10k-25k",
    "notes": "Test quote"
  }'
```

#### Get Blog Posts
```bash
curl -X GET "https://your-backend-domain.com/api/v1/blog/posts?page=1&limit=10"
```

#### Get Testimonials
```bash
curl -X GET "https://your-backend-domain.com/api/v1/testimonials?limit=5&featured=true"
```

---

## Frontend Integration

### Example Frontend API Client

```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-domain.com/api/v1';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export async function submitQuote(data: QuoteFormData) {
  const response = await fetch(`${API_BASE_URL}/quotes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit quote');
  }
  
  return response.json();
}

export async function getBlogPosts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.category) queryParams.append('category', params.category);
  if (params?.search) queryParams.append('search', params.search);
  
  const response = await fetch(`${API_BASE_URL}/blog/posts?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  
  return response.json();
}
```

---

## Summary of Frontend Endpoints

The following endpoints are required for frontend integration:

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| POST | `/api/v1/quotes` | API Key | Submit quote request |
| POST | `/api/v1/contact` | API Key | Submit contact message |
| GET | `/api/v1/blog/posts` | None | Get list of blog posts |
| GET | `/api/v1/blog/posts/{slug}` | None | Get single blog post |
| GET | `/api/v1/testimonials` | None | Get testimonials |
| GET | `/api/v1/services` | None | Get services |
| GET | `/api/v1/business/info` | None | Get business information |
| GET | `/api/v1/stats` | None | Get company statistics |

**Note:** All GET endpoints are public and do not require authentication. Only POST endpoints (quotes and contact) require the `X-API-Key` header.

---

## Support

For questions or issues regarding API integration, please contact the backend development team.

**Last Updated:** January 2024
