-- =============================================
-- Medigo Healthcare Database Schema
-- Complete MySQL Database Structure
-- =============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS medigo_healthcare 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE medigo_healthcare;

-- =============================================
-- 1. USER MANAGEMENT TABLES
-- =============================================

-- Users Table (Core user management)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    profile_image VARCHAR(255),
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_status (status)
);

-- Roles Table
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    permissions JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Roles (Many-to-Many)
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL
);

-- =============================================
-- 2. PATIENT MANAGEMENT
-- =============================================

-- Patients Table
CREATE TABLE patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    patient_id VARCHAR(20) UNIQUE NOT NULL,
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relation VARCHAR(50),
    medical_history TEXT,
    allergies TEXT,
    chronic_conditions TEXT,
    medications TEXT,
    insurance_provider VARCHAR(100),
    insurance_policy_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_patient_id (patient_id),
    INDEX idx_user_id (user_id)
);

-- Patient Documents
CREATE TABLE patient_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    document_type ENUM('medical_report', 'prescription', 'lab_result', 'scan', 'insurance', 'other'),
    document_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_patient_id (patient_id),
    INDEX idx_document_type (document_type)
);

-- =============================================
-- 3. DOCTOR MANAGEMENT
-- =============================================

-- Doctors Table
CREATE TABLE doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    doctor_id VARCHAR(20) UNIQUE NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    qualification TEXT,
    experience_years INT DEFAULT 0,
    license_number VARCHAR(100),
    consultation_fee DECIMAL(10,2),
    available_days JSON, -- ['Monday', 'Tuesday', ...]
    available_time_start TIME,
    available_time_end TIME,
    consultation_duration INT DEFAULT 30, -- minutes
    bio TEXT,
    education JSON, -- Array of education details
    achievements TEXT,
    languages JSON, -- Array of languages spoken
    consultation_type ENUM('online', 'in_person', 'both') DEFAULT 'both',
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    status ENUM('active', 'inactive', 'on_leave') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_specialization (specialization),
    INDEX idx_status (status)
);

-- Doctor Schedule
CREATE TABLE doctor_schedules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    doctor_id INT NOT NULL,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    max_patients INT DEFAULT 1,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    UNIQUE KEY unique_schedule (doctor_id, day_of_week, start_time)
);

-- =============================================
-- 4. APPOINTMENT MANAGEMENT
-- =============================================

-- Appointments Table
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration INT DEFAULT 30,
    consultation_type ENUM('online', 'in_person') DEFAULT 'in_person',
    status ENUM('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
    reason_for_visit TEXT,
    symptoms TEXT,
    notes TEXT,
    consultation_link VARCHAR(255),
    meeting_id VARCHAR(100),
    fee DECIMAL(10,2),
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_appointment_id (appointment_id),
    INDEX idx_patient_id (patient_id),
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_status (status)
);

-- =============================================
-- 5. MEDICAL RECORDS
-- =============================================

-- Medical History
CREATE TABLE medical_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    visit_date DATE NOT NULL,
    chief_complaint TEXT,
    history_of_present_illness TEXT,
    past_medical_history TEXT,
    family_history TEXT,
    personal_history TEXT,
    examination_findings TEXT,
    diagnosis TEXT,
    treatment_plan TEXT,
    follow_up_instructions TEXT,
    next_visit_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    INDEX idx_patient_id (patient_id),
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_visit_date (visit_date)
);

-- Prescriptions
CREATE TABLE prescriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_id INT,
    issue_date DATE NOT NULL,
    notes TEXT,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
    INDEX idx_prescription_id (prescription_id),
    INDEX idx_patient_id (patient_id),
    INDEX idx_doctor_id (doctor_id)
);

-- Prescription Medicines
CREATE TABLE prescription_medicines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_id INT NOT NULL,
    medicine_name VARCHAR(200) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) ON DELETE CASCADE,
    INDEX idx_prescription_id (prescription_id)
);

-- =============================================
-- 6. LABORATORY MANAGEMENT
-- =============================================

-- Lab Tests
CREATE TABLE lab_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    test_name VARCHAR(200) NOT NULL,
    test_code VARCHAR(50) UNIQUE,
    category VARCHAR(100),
    description TEXT,
    normal_range TEXT,
    price DECIMAL(10,2),
    preparation_instructions TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_test_code (test_code),
    INDEX idx_category (category)
);

-- Lab Test Orders
CREATE TABLE lab_test_orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT,
    ordered_date DATE NOT NULL,
    status ENUM('ordered', 'sample_collected', 'processing', 'completed', 'cancelled') DEFAULT 'ordered',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL,
    INDEX idx_order_id (order_id),
    INDEX idx_patient_id (patient_id),
    INDEX idx_status (status)
);

-- Lab Test Results
CREATE TABLE lab_test_results (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    test_id INT NOT NULL,
    result_value VARCHAR(200),
    result_text TEXT,
    normal_range TEXT,
    unit VARCHAR(50),
    status ENUM('normal', 'abnormal', 'critical') DEFAULT 'normal',
    technician_notes TEXT,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (order_id) REFERENCES lab_test_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (test_id) REFERENCES lab_tests(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_test_id (test_id)
);

-- =============================================
-- 7. BILLING AND PAYMENTS
-- =============================================

-- Bills Table
CREATE TABLE bills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bill_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    appointment_id INT,
    bill_date DATE NOT NULL,
    due_date DATE,
    status ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0.00,
    balance_amount DECIMAL(10,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    payment_method ENUM('cash', 'card', 'online', 'insurance') DEFAULT NULL,
    notes TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_bill_id (bill_id),
    INDEX idx_patient_id (patient_id),
    INDEX idx_status (status)
);

-- Bill Items
CREATE TABLE bill_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bill_id INT NOT NULL,
    item_type ENUM('consultation', 'lab_test', 'medicine', 'procedure', 'other'),
    item_name VARCHAR(200) NOT NULL,
    description TEXT,
    quantity INT DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE,
    INDEX idx_bill_id (bill_id)
);

-- Payments
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    payment_id VARCHAR(20) UNIQUE NOT NULL,
    bill_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cash', 'card', 'online', 'insurance') NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_id VARCHAR(100),
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    notes TEXT,
    received_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE,
    FOREIGN KEY (received_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_payment_id (payment_id),
    INDEX idx_bill_id (bill_id),
    INDEX idx_status (status)
);

-- =============================================
-- 8. INVENTORY MANAGEMENT
-- =============================================

-- Categories
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    parent_id INT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_parent_id (parent_id)
);

-- Products/Medicines
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    category_id INT,
    description TEXT,
    manufacturer VARCHAR(100),
    unit VARCHAR(50) DEFAULT 'pcs',
    current_stock INT DEFAULT 0,
    minimum_stock INT DEFAULT 0,
    maximum_stock INT DEFAULT 0,
    cost_price DECIMAL(10,2),
    selling_price DECIMAL(10,2),
    expiry_date DATE,
    batch_number VARCHAR(100),
    storage_conditions TEXT,
    status ENUM('active', 'inactive', 'discontinued') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_product_code (product_code),
    INDEX idx_category_id (category_id),
    INDEX idx_status (status)
);

-- Stock Transactions
CREATE TABLE stock_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    transaction_type ENUM('purchase', 'sale', 'adjustment', 'return', 'expiry') NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2),
    reference_id INT, -- Reference to purchase order, sale, etc.
    reference_type VARCHAR(50),
    notes TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product_id (product_id),
    INDEX idx_transaction_type (transaction_type),
    INDEX idx_transaction_date (transaction_date)
);

-- =============================================
-- 9. HR MANAGEMENT
-- =============================================

-- Employees
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    department VARCHAR(100),
    position VARCHAR(100),
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2),
    employment_type ENUM('full_time', 'part_time', 'contract', 'intern') DEFAULT 'full_time',
    work_schedule JSON,
    manager_id INT,
    status ENUM('active', 'inactive', 'terminated') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
    INDEX idx_employee_id (employee_id),
    INDEX idx_department (department),
    INDEX idx_status (status)
);

-- Attendance
CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    break_duration INT DEFAULT 0, -- minutes
    work_hours INT GENERATED ALWAYS AS (
        CASE 
            WHEN check_in IS NOT NULL AND check_out IS NOT NULL 
            THEN TIMESTAMPDIFF(MINUTE, check_in, check_out) - break_duration
            ELSE 0 
        END
    ) STORED,
    status ENUM('present', 'absent', 'late', 'half_day', 'leave') DEFAULT 'present',
    notes TEXT,
    approved_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_attendance (employee_id, attendance_date),
    INDEX idx_attendance_date (attendance_date),
    INDEX idx_status (status)
);

-- Salary Payments
CREATE TABLE salary_payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    payment_month DATE NOT NULL,
    basic_salary DECIMAL(10,2) NOT NULL,
    allowances DECIMAL(10,2) DEFAULT 0.00,
    deductions DECIMAL(10,2) DEFAULT 0.00,
    overtime DECIMAL(10,2) DEFAULT 0.00,
    gross_salary DECIMAL(10,2) GENERATED ALWAYS AS (basic_salary + allowances + overtime) STORED,
    net_salary DECIMAL(10,2) GENERATED ALWAYS AS (gross_salary - deductions) STORED,
    payment_date DATE,
    status ENUM('pending', 'processed', 'paid') DEFAULT 'pending',
    payment_method ENUM('cash', 'bank_transfer', 'check') DEFAULT 'bank_transfer',
    notes TEXT,
    processed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_salary (employee_id, payment_month),
    INDEX idx_payment_month (payment_month),
    INDEX idx_status (status)
);

-- =============================================
-- 10. MARKETING CONTENT
-- =============================================

-- Video Carousel
CREATE TABLE video_carousel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    video_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    category VARCHAR(100) DEFAULT 'General',
    status ENUM('active', 'inactive') DEFAULT 'active',
    display_order INT DEFAULT 0,
    autoplay BOOLEAN DEFAULT TRUE,
    mute BOOLEAN DEFAULT TRUE,
    loop BOOLEAN DEFAULT TRUE,
    show_controls BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    display_pages JSON, -- ['home', 'doctors', 'about']
    tags JSON,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    shares INT DEFAULT 0,
    duration VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_display_order (display_order),
    INDEX idx_featured (featured)
);

-- Banners
CREATE TABLE banners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    subtitle TEXT,
    image_url VARCHAR(500) NOT NULL,
    link_url VARCHAR(500),
    position ENUM('home_hero', 'home_side', 'doctor_page', 'about_page') DEFAULT 'home_hero',
    status ENUM('active', 'inactive') DEFAULT 'active',
    display_order INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    clicks INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_position (position),
    INDEX idx_status (status),
    INDEX idx_display_order (display_order)
);

-- =============================================
-- 11. SYSTEM CONFIGURATION
-- =============================================

-- System Settings
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_setting_key (setting_key)
);

-- Audit Log
CREATE TABLE audit_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_table_name (table_name),
    INDEX idx_created_at (created_at)
);

-- =============================================
-- 12. INSERT DEFAULT DATA
-- =============================================

-- Default Roles
INSERT INTO roles (name, display_name, description, permissions) VALUES
('super_admin', 'Super Administrator', 'Full system access', JSON_OBJECT('all', true)),
('admin', 'Administrator', 'Administrative access', JSON_OBJECT('admin', true, 'users', true, 'reports', true)),
('doctor', 'Doctor', 'Medical practitioner access', JSON_OBJECT('patients', true, 'appointments', true, 'prescriptions', true)),
('nurse', 'Nurse', 'Nursing staff access', JSON_OBJECT('patients', true, 'appointments', true)),
('receptionist', 'Receptionist', 'Front desk access', JSON_OBJECT('appointments', true, 'patients', true, 'billing', true)),
('lab_technician', 'Lab Technician', 'Laboratory access', JSON_OBJECT('lab', true, 'reports', true)),
('pharmacist', 'Pharmacist', 'Pharmacy access', JSON_OBJECT('pharmacy', true, 'inventory', true)),
('patient', 'Patient', 'Patient portal access', JSON_OBJECT('profile', true, 'appointments', true, 'records', true));

-- Default System Settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('hospital_name', 'Medigo Healthcare', 'string', 'Hospital name', true),
('hospital_phone', '+1-234-567-8900', 'string', 'Hospital contact phone', true),
('hospital_email', 'info@medigohealthcare.com', 'string', 'Hospital contact email', true),
('hospital_address', '123 Healthcare Ave, Medical City, MC 12345', 'string', 'Hospital address', true),
('appointment_duration', '30', 'number', 'Default appointment duration in minutes', false),
('advance_booking_days', '30', 'number', 'Maximum days in advance for booking', false),
('currency', 'USD', 'string', 'Default currency', true),
('timezone', 'UTC', 'string', 'Default timezone', false);

-- Default Categories
INSERT INTO categories (name, parent_id, description) VALUES
('Medicines', NULL, 'Pharmaceutical medicines'),
('Medical Supplies', NULL, 'Medical equipment and supplies'),
('Laboratory', NULL, 'Lab test categories'),
('General Medicine', 3, 'General lab tests'),
('Specialized Tests', 3, 'Specialized diagnostic tests'),
('Cardiac', 4, 'Cardiology related tests'),
('Neurology', 4, 'Neurology related tests'),
('Prescription Drugs', 1, 'Prescription medications'),
('OTC Drugs', 1, 'Over-the-counter medications'),
('Surgical Supplies', 2, 'Surgical equipment'),
('Diagnostic Equipment', 2, 'Diagnostic machines and tools');

-- Sample Video Carousel Data
INSERT INTO video_carousel (title, description, video_url, thumbnail_url, category, display_order, featured, display_pages, tags) VALUES
('Welcome to Medigo Healthcare', 'Experience world-class healthcare with our expert medical team', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'https://picsum.photos/seed/medigo1/800/450', 'General', 1, true, JSON_ARRAY('home', 'doctors', 'about'), JSON_ARRAY('healthcare', 'welcome', 'intro')),
('Our Expert Doctors', 'Meet our team of experienced medical professionals', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'https://picsum.photos/seed/medigo2/800/450', 'Doctors', 2, false, JSON_ARRAY('home', 'doctors'), JSON_ARRAY('doctors', 'medical', 'team')),
('Advanced Medical Technology', 'State-of-the-art equipment and facilities', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'https://picsum.photos/seed/medigo3/800/450', 'Technology', 3, false, JSON_ARRAY('home', 'about'), JSON_ARRAY('technology', 'equipment', 'facilities'));

-- Sample Banners
INSERT INTO banners (title, subtitle, image_url, link_url, position, display_order) VALUES
('Quality Healthcare', 'Providing exceptional medical care with compassion', 'https://picsum.photos/seed/banner1/1200/400', '/about', 'home_hero', 1),
('Expert Doctors', 'Our team of specialized medical professionals', 'https://picsum.photos/seed/banner2/1200/400', '/doctors', 'home_hero', 2),
('Advanced Technology', 'Latest medical equipment and diagnostic tools', 'https://picsum.photos/seed/banner3/1200/400', '/services', 'home_hero', 3);

-- =============================================
-- 13. CREATE VIEWS FOR COMMON QUERIES
-- =============================================

-- Patient Summary View
CREATE VIEW patient_summary AS
SELECT 
    p.id,
    p.patient_id,
    CONCAT(u.first_name, ' ', u.last_name) as full_name,
    u.email,
    u.phone,
    p.blood_group,
    COUNT(DISTINCT a.id) as total_appointments,
    COUNT(DISTINCT pr.id) as total_prescriptions,
    MAX(a.appointment_date) as last_visit_date
FROM patients p
JOIN users u ON p.user_id = u.id
LEFT JOIN appointments a ON p.id = a.patient_id
LEFT JOIN prescriptions pr ON p.id = pr.patient_id
GROUP BY p.id, p.patient_id, u.first_name, u.last_name, u.email, u.phone, p.blood_group;

-- Doctor Summary View
CREATE VIEW doctor_summary AS
SELECT 
    d.id,
    d.doctor_id,
    CONCAT(u.first_name, ' ', u.last_name) as full_name,
    d.specialization,
    d.qualification,
    d.consultation_fee,
    d.rating,
    d.total_reviews,
    COUNT(DISTINCT a.id) as total_appointments,
    COUNT(DISTINCT a.id) FILTER (WHERE a.status = 'completed') as completed_appointments,
    SUM(CASE WHEN a.status = 'completed' THEN a.fee ELSE 0 END) as total_earnings
FROM doctors d
JOIN users u ON d.user_id = u.id
LEFT JOIN appointments a ON d.id = a.doctor_id
GROUP BY d.id, d.doctor_id, u.first_name, u.last_name, d.specialization, d.qualification, d.consultation_fee, d.rating, d.total_reviews;

-- Daily Revenue View
CREATE VIEW daily_revenue AS
SELECT 
    DATE(p.payment_date) as revenue_date,
    SUM(p.amount) as total_revenue,
    COUNT(DISTINCT p.id) as transaction_count,
    COUNT(DISTINCT b.patient_id) as unique_patients
FROM payments p
JOIN bills b ON p.bill_id = b.id
WHERE p.status = 'completed'
GROUP BY DATE(p.payment_date)
ORDER BY revenue_date DESC;

-- =============================================
-- 14. STORED PROCEDURES
-- =============================================

DELIMITER //

-- Procedure for generating patient ID
CREATE PROCEDURE generate_patient_id()
BEGIN
    DECLARE new_id VARCHAR(20);
    DECLARE prefix VARCHAR(5) DEFAULT 'PT';
    DECLARE year_part VARCHAR(4);
    DECLARE sequence_number INT;
    
    SET year_part = YEAR(CURDATE());
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(patient_id, 8) AS UNSIGNED)), 0) + 1
    INTO sequence_number
    FROM patients
    WHERE patient_id LIKE CONCAT(prefix, year_part, '%');
    
    SET new_id = CONCAT(prefix, year_part, LPAD(sequence_number, 6, '0'));
    SELECT new_id;
END //

-- Procedure for generating appointment ID
CREATE PROCEDURE generate_appointment_id()
BEGIN
    DECLARE new_id VARCHAR(20);
    DECLARE prefix VARCHAR(5) DEFAULT 'AP';
    DECLARE year_part VARCHAR(4);
    DECLARE sequence_number INT;
    
    SET year_part = YEAR(CURDATE());
    
    SELECT COALESZ(MAX(CAST(SUBSTRING(appointment_id, 8) AS UNSIGNED)), 0) + 1
    INTO sequence_number
    FROM appointments
    WHERE appointment_id LIKE CONCAT(prefix, year_part, '%');
    
    SET new_id = CONCAT(prefix, year_part, LPAD(sequence_number, 6, '0'));
    SELECT new_id;
END //

-- Procedure for generating bill ID
CREATE PROCEDURE generate_bill_id()
BEGIN
    DECLARE new_id VARCHAR(20);
    DECLARE prefix VARCHAR(5) DEFAULT 'BL';
    DECLARE year_part VARCHAR(4);
    DECLARE sequence_number INT;
    
    SET year_part = YEAR(CURDATE());
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(bill_id, 8) AS UNSIGNED)), 0) + 1
    INTO sequence_number
    FROM bills
    WHERE bill_id LIKE CONCAT(prefix, year_part, '%');
    
    SET new_id = CONCAT(prefix, year_part, LPAD(sequence_number, 6, '0'));
    SELECT new_id;
END //

DELIMITER ;

-- =============================================
-- 15. TRIGGERS FOR AUDIT AND AUTOMATION
-- =============================================

DELIMITER //

-- Audit trigger for users table
CREATE TRIGGER users_audit_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (user_id, action, table_name, record_id, new_values)
    VALUES (NEW.id, 'INSERT', 'users', NEW.id, JSON_OBJECT(
        'username', NEW.username,
        'email', NEW.email,
        'first_name', NEW.first_name,
        'last_name', NEW.last_name,
        'status', NEW.status
    ));
END //

CREATE TRIGGER users_audit_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (user_id, action, table_name, record_id, old_values, new_values)
    VALUES (NEW.id, 'UPDATE', 'users', NEW.id, 
        JSON_OBJECT(
            'username', OLD.username,
            'email', OLD.email,
            'status', OLD.status
        ),
        JSON_OBJECT(
            'username', NEW.username,
            'email', NEW.email,
            'status', NEW.status
        )
    );
END //

-- Update stock when products are sold
CREATE TRIGGER update_stock_on_sale
AFTER INSERT ON stock_transactions
FOR EACH ROW
BEGIN
    IF NEW.transaction_type = 'sale' THEN
        UPDATE products 
        SET current_stock = current_stock - NEW.quantity
        WHERE id = NEW.product_id;
    ELSEIF NEW.transaction_type = 'purchase' THEN
        UPDATE products 
        SET current_stock = current_stock + NEW.quantity
        WHERE id = NEW.product_id;
    END IF;
END //

DELIMITER ;

-- =============================================
-- 16. INDEXES FOR PERFORMANCE
-- =============================================

-- Additional indexes for better performance
CREATE INDEX idx_users_full_name ON users((CONCAT(first_name, ' ', last_name)));
CREATE INDEX idx_appointments_datetime ON appointments(appointment_date, appointment_time);
CREATE INDEX idx_medical_history_patient_date ON medical_history(patient_id, visit_date DESC);
CREATE INDEX idx_prescriptions_patient_date ON prescriptions(patient_id, issue_date DESC);
CREATE INDEX idx_lab_tests_category_status ON lab_tests(category, status);
CREATE INDEX idx_products_stock_status ON products(current_stock, status);
CREATE INDEX idx_attendance_employee_date ON attendance(employee_id, attendance_date DESC);
CREATE INDEX idx_bills_patient_date ON bills(patient_id, bill_date DESC);
CREATE INDEX idx_payments_date_status ON payments(payment_date, status);

-- =============================================
-- COMPLETION
-- =============================================

-- Database successfully created!
-- Total tables: 25+
-- Views: 3
-- Stored Procedures: 3
-- Triggers: 3
-- Sample data included

SELECT 'Medigo Healthcare Database created successfully!' as status;
