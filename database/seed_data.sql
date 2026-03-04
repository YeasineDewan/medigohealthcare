-- ============================================
-- Medigo Healthcare - Complete Data Upload Script
-- ============================================
-- This script contains all sample data for the Medigo Healthcare platform
-- Run this script after importing the schema.sql file
-- ============================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

USE `medigo_db`;

-- ============================================
-- Users Data
-- ============================================

-- Insert default admin user
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `role`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'admin@medigo.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, 'admin', 1, NOW(), NOW()),
(2, 'Dr. Sarah Johnson', 'sarah.johnson@medigo.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, 'doctor', 1, NOW(), NOW()),
(3, 'Dr. Michael Chen', 'michael.chen@medigo.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, 'doctor', 1, NOW(), NOW()),
(4, 'John Smith', 'john.smith@medigo.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, 'patient', 1, NOW(), NOW()),
(5, 'Emily Davis', 'emily.davis@medigo.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, 'patient', 1, NOW(), NOW()),
(6, 'Pharmacist Alex Wilson', 'alex.wilson@medigo.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, 'pharmacist', 1, NOW(), NOW()),
(7, 'Lab Technician Maria Garcia', 'maria.garcia@medigo.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, 'lab_technician', 1, NOW(), NOW()),
(8, 'Receptionist Lisa Brown', 'lisa.brown@medigo.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, 'receptionist', 1, NOW(), NOW());

-- ============================================
-- Doctors Data
-- ============================================

INSERT INTO `doctors` (`id`, `user_id`, `name`, `email`, `phone`, `specialty`, `qualification`, `experience_years`, `consultation_fee`, `rating`, `is_available`, `bio`, `profile_image`, `created_at`, `updated_at`) VALUES
(1, 2, 'Dr. Sarah Johnson', 'sarah.johnson@medigo.com', '+8801234567890', 'Cardiology', 'MBBS, MD (Cardiology)', 15, 1500.00, 4.8, 1, 'Experienced cardiologist specializing in heart diseases and cardiovascular conditions.', '/doctors/sarah-johnson.jpg', NOW(), NOW()),
(2, 3, 'Dr. Michael Chen', 'michael.chen@medigo.com', '+8801234567891', 'Neurology', 'MBBS, MD (Neurology)', 12, 1200.00, 4.7, 1, 'Specialist in brain and nervous system disorders with extensive surgical experience.', '/doctors/michael-chen.jpg', NOW(), NOW()),
(3, NULL, 'Dr. Amanda Roberts', 'amanda.roberts@medigo.com', '+8801234567892', 'Pediatrics', 'MBBS, MD (Pediatrics)', 8, 800.00, 4.9, 1, 'Dedicated pediatrician focused on child healthcare and development.', '/doctors/amanda-roberts.jpg', NOW(), NOW()),
(4, NULL, 'Dr. James Wilson', 'james.wilson@medigo.com', '+8801234567893', 'Orthopedics', 'MBBS, MS (Orthopedics)', 10, 1000.00, 4.6, 1, 'Expert in bone and joint disorders, sports injuries, and trauma care.', '/doctors/james-wilson.jpg', NOW(), NOW()),
(5, NULL, 'Dr. Emily Taylor', 'emily.taylor@medigo.com', '+8801234567894', 'Dermatology', 'MBBS, MD (Dermatology)', 6, 600.00, 4.8, 1, 'Specialist in skin diseases, cosmetic dermatology, and allergy treatments.', '/doctors/emily-taylor.jpg', NOW(), NOW());

-- ============================================
-- Services Data
-- ============================================

INSERT INTO `services` (`id`, `title`, `description`, `icon`, `price`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'General Consultation', 'Basic health check-up and consultation with general physician', 'stethoscope', 500.00, 1, NOW(), NOW()),
(2, 'Emergency Care', '24/7 emergency medical services and urgent care', 'ambulance', 2000.00, 1, NOW(), NOW()),
(3, 'Lab Tests', 'Comprehensive laboratory testing and diagnostics', 'flask', 300.00, 1, NOW(), NOW()),
(4, 'X-Ray & Imaging', 'Digital X-ray and medical imaging services', 'x-ray', 800.00, 1, NOW(), NOW()),
(5, 'Vaccination', 'Immunization and vaccination services', 'syringe', 200.00, 1, NOW(), NOW()),
(6, 'Health Checkup', 'Complete health screening and preventive checkup', 'heart', 1500.00, 1, NOW(), NOW());

-- ============================================
-- Emergency Services Data
-- ============================================

INSERT INTO `emergency_services` (`id`, `title`, `description`, `phone`, `icon`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Emergency Hotline', '24/7 emergency medical helpline', '+8801234567890', 'phone', 1, NOW(), NOW()),
(2, 'Ambulance Service', 'Quick ambulance dispatch for medical emergencies', '+8801234567891', 'ambulance', 1, NOW(), NOW()),
(3, 'Blood Bank', 'Emergency blood supply and donation services', '+8801234567892', 'droplet', 1, NOW(), NOW()),
(4, 'Trauma Care', 'Emergency trauma and critical care services', '+8801234567893', 'shield', 1, NOW(), NOW());

-- ============================================
-- Products Data
-- ============================================

INSERT INTO `products` (`id`, `name`, `description`, `category`, `price`, `stock_quantity`, `image`, `is_active`, `is_featured`, `prescription_required`, `created_at`, `updated_at`) VALUES
(1, 'Paracetamol 500mg', 'Paracetamol tablets for fever and pain relief', 'Medicines', 5.00, 1000, '/products/paracetamol.jpg', 1, 1, 0, NOW(), NOW()),
(2, 'Amoxicillin 500mg', 'Antibiotic for bacterial infections', 'Medicines', 15.00, 500, '/products/amoxicillin.jpg', 1, 0, 1, NOW(), NOW()),
(3, 'Ibuprofen 400mg', 'Anti-inflammatory for pain and fever', 'Medicines', 6.50, 800, '/products/ibuprofen.jpg', 1, 1, 0, NOW(), NOW()),
(4, 'Digital Thermometer', 'Digital thermometer for accurate temperature measurement', 'Medical Devices', 250.00, 50, '/products/thermometer.jpg', 1, 1, 0, NOW(), NOW()),
(5, 'Blood Pressure Monitor', 'Automatic blood pressure monitoring device', 'Medical Devices', 3500.00, 20, '/products/bp-monitor.jpg', 1, 1, 0, NOW(), NOW()),
(6, 'Face Masks', 'Disposable face masks for protection', 'Medical Supplies', 2.00, 5000, '/products/masks.jpg', 1, 0, 0, NOW(), NOW()),
(7, 'Hand Sanitizer', 'Alcohol-based hand sanitizer', 'Medical Supplies', 50.00, 1000, '/products/sanitizer.jpg', 1, 1, 0, NOW(), NOW()),
(8, 'Vitamin C Tablets', 'Vitamin C supplements for immunity', 'Supplements', 30.00, 2000, '/products/vitamin-c.jpg', 1, 1, 0, NOW(), NOW());

-- ============================================
-- Sample Orders Data
-- ============================================

INSERT INTO `orders` (`id`, `user_id`, `order_number`, `total_amount`, `status`, `payment_status`, `shipping_address`, `created_at`, `updated_at`) VALUES
(1, 4, 'ORD-2024001', 125.50, 'delivered', 'paid', '123 Main St, Dhaka, Bangladesh', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 5 DAY),
(2, 5, 'ORD-2024002', 3500.00, 'processing', 'pending', '456 Park Ave, Dhaka, Bangladesh', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 2 DAY),
(3, 4, 'ORD-2024003', 85.00, 'shipped', 'paid', '789 Oak St, Dhaka, Bangladesh', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY);

-- ============================================
-- Order Items Data
-- ============================================

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `total_price`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 10, 5.00, 50.00, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 1, 3, 5, 6.50, 32.50, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(3, 1, 8, 1, 30.00, 30.00, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(4, 2, 5, 1, 3500.00, 3500.00, NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY),
(5, 3, 2, 5, 15.00, 75.00, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
(6, 3, 6, 5, 2.00, 10.00, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY);

-- ============================================
-- Lab Tests Data
-- ============================================

INSERT INTO `lab_tests` (`id`, `name`, `description`, `category`, `price`, `is_popular`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Complete Blood Count (CBC)', 'Comprehensive blood test for overall health assessment', 'Hematology', 500.00, 1, 1, NOW(), NOW()),
(2, 'Blood Sugar Test', 'Fasting and postprandial blood sugar levels', 'Biochemistry', 200.00, 1, 1, NOW(), NOW()),
(3, 'Lipid Profile', 'Cholesterol and triglycerides level test', 'Biochemistry', 600.00, 0, 1, NOW(), NOW()),
(4, 'Liver Function Test', 'Comprehensive liver health assessment', 'Biochemistry', 800.00, 0, 1, NOW(), NOW()),
(5, 'Kidney Function Test', 'Renal function and electrolyte panel', 'Biochemistry', 700.00, 0, 1, NOW(), NOW()),
(6, 'Thyroid Function Test', 'T3, T4, and TSH hormone levels', 'Endocrinology', 900.00, 0, 1, NOW(), NOW()),
(7, 'Urine Routine Test', 'Complete urine analysis', 'Microbiology', 150.00, 1, 1, NOW(), NOW()),
(8, 'X-Ray Chest', 'Digital chest X-ray for lung and heart examination', 'Radiology', 500.00, 0, 1, NOW(), NOW());

-- ============================================
-- Sample Lab Test Bookings
-- ============================================

INSERT INTO `lab_test_bookings` (`id`, `user_id`, `lab_test_id`, `booking_number`, `preferred_date`, `preferred_time`, `status`, `payment_status`, `total_amount`, `created_at`, `updated_at`) VALUES
(1, 4, 1, 'LAB-2024001', NOW() + INTERVAL 2 DAY, '09:00:00', 'confirmed', 'paid', 500.00, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
(2, 5, 2, 'LAB-2024002', NOW() + INTERVAL 3 DAY, '10:30:00', 'pending', 'pending', 200.00, NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 2 HOUR),
(3, 4, 7, 'LAB-2024003', NOW() + INTERVAL 1 DAY, '08:00:00', 'completed', 'paid', 150.00, NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 2 DAY);

-- ============================================
-- Sample Prescriptions
-- ============================================

INSERT INTO `prescriptions` (`id`, `patient_id`, `doctor_id`, `prescription_date`, `diagnosis`, `notes`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 4, 1, NOW() - INTERVAL 7 DAY, 'Hypertension', 'Patient diagnosed with high blood pressure. Regular monitoring required.', 1, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 5, 2, NOW() - INTERVAL 5 DAY, 'Migraine', 'Patient experiencing frequent migraines. Stress management recommended.', 1, NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(3, 4, 3, NOW() - INTERVAL 3 DAY, 'Common Cold', 'Upper respiratory infection. Symptomatic treatment prescribed.', 1, NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY);

-- ============================================
-- Prescription Items
-- ============================================

INSERT INTO `prescription_items` (`id`, `prescription_id`, `medicine_name`, `dosage`, `frequency`, `duration`, `instructions`, `created_at`, `updated_at`) VALUES
(1, 1, 'Amlodipine', '5mg', 'Once daily', '30 days', 'Take after breakfast', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 1, 'Losartan', '50mg', 'Once daily', '30 days', 'Take with food', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(3, 2, 'Sumatriptan', '50mg', 'As needed', '10 tablets', 'Take at onset of migraine', NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(4, 3, 'Paracetamol', '500mg', 'Three times daily', '5 days', 'Take for fever and pain', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY),
(5, 3, 'Cetirizine', '10mg', 'Once daily', '7 days', 'Take at bedtime', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY);

-- ============================================
-- Sample Medical Records
-- ============================================

INSERT INTO `medical_records` (`id`, `patient_id`, `doctor_id`, `record_type`, `record_date`, `title`, `description`, `attachments`, `is_shared`, `created_at`, `updated_at`) VALUES
(1, 4, 1, 'consultation', NOW() - INTERVAL 7 DAY, 'Cardiology Consultation', 'Regular follow-up for hypertension management. Blood pressure controlled with medication.', '["/records/consultation1.pdf"]', 1, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 5, 2, 'diagnosis', NOW() - INTERVAL 5 DAY, 'Migraine Diagnosis', 'Patient diagnosed with chronic migraine. Recommended lifestyle modifications and preventive medication.', '["/records/mri-scan.jpg"]', 1, NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(3, 4, 3, 'treatment', NOW() - INTERVAL 3 DAY, 'Cold Treatment', 'Treatment for upper respiratory infection. Symptoms improving with medication.', NULL, 1, NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY);

-- ============================================
-- Doctor Schedules
-- ============================================

INSERT INTO `doctor_schedules` (`id`, `doctor_id`, `day_of_week`, `start_time`, `end_time`, `max_patients`, `is_available`, `created_at`, `updated_at`) VALUES
(1, 1, 'Monday', '09:00:00', '17:00:00', 20, 1, NOW(), NOW()),
(2, 1, 'Tuesday', '09:00:00', '17:00:00', 20, 1, NOW(), NOW()),
(3, 1, 'Wednesday', '09:00:00', '17:00:00', 20, 1, NOW(), NOW()),
(4, 1, 'Thursday', '09:00:00', '17:00:00', 20, 1, NOW(), NOW()),
(5, 1, 'Friday', '09:00:00', '17:00:00', 20, 1, NOW(), NOW()),
(6, 2, 'Monday', '10:00:00', '18:00:00', 15, 1, NOW(), NOW()),
(7, 2, 'Tuesday', '10:00:00', '18:00:00', 15, 1, NOW(), NOW()),
(8, 2, 'Wednesday', '10:00:00', '18:00:00', 15, 1, NOW(), NOW()),
(9, 2, 'Thursday', '10:00:00', '18:00:00', 15, 1, NOW(), NOW()),
(10, 2, 'Friday', '10:00:00', '18:00:00', 15, 1, NOW(), NOW());

-- ============================================
-- Sample Appointments
-- ============================================

INSERT INTO `appointments` (`id`, `patient_id`, `doctor_id`, `appointment_date`, `appointment_time`, `type`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(1, 4, 1, NOW() + INTERVAL 2 DAY, '10:00:00', 'consultation', 'confirmed', 'Follow-up for hypertension', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
(2, 5, 2, NOW() + INTERVAL 3 DAY, '14:30:00', 'consultation', 'pending', 'Initial consultation for migraine', NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 2 HOUR),
(3, 4, 3, NOW() - INTERVAL 5 DAY, '11:00:00', 'consultation', 'completed', 'Cold and fever treatment', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 5 DAY);

-- ============================================
-- Blog Posts
-- ============================================

INSERT INTO `blog_posts` (`id`, `author_id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `category`, `is_published`, `published_at`, `views`, `created_at`, `updated_at`) VALUES
(1, 1, '10 Tips for Heart Health', '10-tips-heart-health', 'Essential tips to maintain a healthy heart and prevent cardiovascular diseases.', 'Maintaining heart health is crucial for overall wellbeing. Here are 10 essential tips...', '/blog/heart-health.jpg', 'Health', 1, NOW() - INTERVAL 7 DAY, 1250, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 2, 'Understanding Migraine Triggers', 'understanding-migraine-triggers', 'Learn about common migraine triggers and how to manage them effectively.', 'Migraines can be debilitating, but understanding your triggers is the first step...', '/blog/migraine-triggers.jpg', 'Neurology', 1, NOW() - INTERVAL 5 DAY, 890, NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(3, 3, 'Child Nutrition Guide', 'child-nutrition-guide', 'Complete guide to healthy nutrition for growing children.', 'Proper nutrition is essential for children\'s growth and development...', '/blog/child-nutrition.jpg', 'Pediatrics', 1, NOW() - INTERVAL 3 DAY, 2100, NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY);

-- ============================================
-- Reviews
-- ============================================

INSERT INTO `reviews` (`id`, `user_id`, `reviewable_type`, `reviewable_id`, `rating`, `comment`, `is_approved`, `created_at`, `updated_at`) VALUES
(1, 4, 'doctor', 1, 5, 'Dr. Sarah is an excellent cardiologist. Very thorough and caring.', 1, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 5, 'doctor', 2, 4, 'Dr. Chen helped me with my neurological issues. Great expertise.', 1, NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(3, 4, 'product', 1, 5, 'Effective pain relief. Fast delivery and good quality.', 1, NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY),
(4, 5, 'service', 3, 4, 'Lab test was done professionally. Quick results.', 1, NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY);

-- ============================================
-- Notifications
-- ============================================

INSERT INTO `notifications` (`id`, `notifiable_type`, `notifiable_id`, `title`, `message`, `type`, `read_at`, `created_at`, `updated_at`) VALUES
(1, 'user', 4, 'Appointment Reminder', 'Your appointment with Dr. Sarah Johnson is scheduled for tomorrow at 10:00 AM', 'appointment', NULL, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
(2, 'user', 5, 'Lab Test Results', 'Your lab test results are now available in your account', 'lab_result', NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 2 HOUR),
(3, 'user', 4, 'Order Shipped', 'Your order ORD-2024003 has been shipped and will arrive soon', 'order', NOW() - INTERVAL 1 HOUR, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 HOUR);

-- ============================================
-- Sample Prescription Uploads (Dynamic System)
-- ============================================

INSERT INTO `prescription_uploads` (`id`, `customer_id`, `user_id`, `doctor_name`, `doctor_license`, `notes`, `urgency`, `delivery_method`, `preferred_pharmacy`, `status`, `prescription_image`, `uploaded_at`, `verified_at`, `processed_at`, `pharmacist_id`, `pharmacist_name`, `verification_notes`, `processing_notes`, `order_id`, `rejection_reason`, `priority`, `metadata`, `created_at`, `updated_at`) VALUES
('RX-1000', 'CUST001', 4, 'Dr. Sarah Johnson', 'MD-12345', 'Regular medication refill', 'normal', 'pickup', 'Main Pharmacy', 'completed', '/prescriptions/rx-1000.jpg', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 6 DAY, NOW() - INTERVAL 5 DAY, 6, 'Alex Wilson', 'Prescription verified successfully', 'Processed and ready for pickup', 1, NULL, 'normal', '{"verification_score": 0.95, "processing_time": 24}', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 5 DAY),
('RX-1001', 'CUST002', 5, 'Dr. Michael Chen', 'MD-67890', 'New prescription for migraine', 'urgent', 'delivery', 'City Pharmacy', 'verified', '/prescriptions/rx-1001.jpg', NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 4 DAY, NULL, 6, 'Alex Wilson', 'Prescription verified', 'Awaiting processing', NULL, NULL, 'high', '{"verification_score": 0.92, "processing_time": 12}', NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 4 DAY),
('RX-1002', 'CUST003', 4, 'Dr. Amanda Roberts', 'MD-11111', 'Antibiotic prescription', 'normal', 'courier', 'Home Pharmacy', 'pending_verification', '/prescriptions/rx-1002.jpg', NOW() - INTERVAL 3 DAY, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'normal', '{}', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY);

-- ============================================
-- Prescription Upload Items
-- ============================================

INSERT INTO `prescription_upload_items` (`id`, `prescription_id`, `name`, `dosage`, `quantity`, `unit_price`, `instructions`, `created_at`, `updated_at`) VALUES
(1, 'RX-1000', 'Amlodipine', '5mg', 30, 15.00, 'Take once daily after breakfast', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 'RX-1000', 'Losartan', '50mg', 30, 25.00, 'Take once daily with food', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(3, 'RX-1001', 'Sumatriptan', '50mg', 10, 35.00, 'Take at onset of migraine', NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(4, 'RX-1002', 'Amoxicillin', '500mg', 21, 18.00, 'Take three times daily with meals', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY);

-- ============================================
-- Prescription OCR Data
-- ============================================

INSERT INTO `prescription_ocr_data` (`id`, `prescription_id`, `extracted_text`, `confidence_score`, `processing_time`, `extracted_doctor`, `extracted_medications`, `extracted_dosage`, `extracted_instructions`, `ocr_provider`, `processed_at`, `created_at`, `updated_at`) VALUES
(1, 'RX-1000', 'Dr. Sarah Johnson\nAmlodipine 5mg - 30 tablets\nLosartan 50mg - 30 tablets\nTake once daily', 0.95, 2.5, 'Dr. Sarah Johnson', '["Amlodipine", "Losartan"]', '["5mg", "50mg"]', 'Take once daily', 'Tesseract OCR', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(2, 'RX-1001', 'Dr. Michael Chen\nSumatriptan 50mg - 10 tablets\nFor migraine relief', 0.92, 1.8, 'Dr. Michael Chen', '["Sumatriptan"]', '["50mg"]', 'For migraine relief', 'Google Vision API', NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(3, 'RX-1002', 'Dr. Amanda Roberts\nAmoxicillin 500mg - 21 tablets\nThree times daily', 0.88, 2.1, 'Dr. Amanda Roberts', '["Amoxicillin"]', '["500mg"]', 'Three times daily', 'Tesseract OCR', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY);

-- ============================================
-- User Roles Assignment
-- ============================================

INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `assigned_by`, `assigned_at`, `created_at`) VALUES
(1, 1, 1, 1, NOW(), NOW()), -- Super Admin
(2, 2, 3, 1, NOW(), NOW()), -- Doctor
(3, 3, 3, 1, NOW(), NOW()), -- Doctor
(4, 4, 5, 1, NOW(), NOW()), -- Patient
(5, 5, 5, 1, NOW(), NOW()), -- Patient
(6, 6, 4, 1, NOW(), NOW()), -- Pharmacist
(7, 7, 6, 1, NOW(), NOW()), -- Lab Technician
(8, 8, 7, 1, NOW(), NOW()); -- Receptionist

-- ============================================
-- Sample Payments
-- ============================================

INSERT INTO `payments` (`id`, `payment_id`, `user_id`, `order_id`, `appointment_id`, `lab_test_booking_id`, `prescription_id`, `payment_type`, `amount`, `currency`, `payment_method`, `gateway_transaction_id`, `gateway_response`, `status`, `paid_at`, `failed_at`, `refunded_at`, `refund_amount`, `refund_reason`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'PAY-2024001', 4, 1, NULL, NULL, NULL, 'order', 125.50, 'BDT', 'bkash', 'TXN123456', '{"status": "success", "transaction_id": "TXN123456"}', 'completed', NOW() - INTERVAL 6 DAY, NULL, NULL, NULL, NULL, 'Order payment completed successfully', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 6 DAY),
(2, 'PAY-2024002', 5, 2, NULL, NULL, NULL, 'order', 3500.00, 'BDT', 'nagad', 'TXN789012', '{"status": "success", "transaction_id": "TXN789012"}', 'completed', NOW() - INTERVAL 2 DAY, NULL, NULL, NULL, NULL, 'BP monitor purchase', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 2 DAY),
(3, 'PAY-2024003', 4, NULL, 1, NULL, NULL, 'appointment', 1500.00, 'BDT', 'rocket', 'TXN345678', '{"status": "success", "transaction_id": "TXN345678"}', 'completed', NOW() - INTERVAL 1 DAY, NULL, NULL, NULL, NULL, 'Cardiology consultation fee', NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 1 DAY),
(4, 'PAY-2024004', 5, NULL, NULL, 1, NULL, 'lab_test', 200.00, 'BDT', 'bkash', 'TXN901234', '{"status": "success", "transaction_id": "TXN901234"}', 'completed', NOW() - INTERVAL 1 HOUR, NULL, NULL, NULL, NULL, 'Blood sugar test', NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 1 HOUR);

-- ============================================
-- Activity Logs
-- ============================================

INSERT INTO `activity_logs` (`id`, `user_id`, `action`, `subject_type`, `subject_id`, `description`, `ip_address`, `user_agent`, `properties`, `created_at`) VALUES
(1, 4, 'login', 'user', 4, 'User logged in', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '{"login_time": "2024-03-04 10:00:00"}', NOW() - INTERVAL 1 HOUR),
(2, 4, 'prescription_uploaded', 'prescription_upload', 'RX-1000', 'Prescription uploaded successfully', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '{"file_name": "prescription.jpg", "file_size": "2.5MB"}', NOW() - INTERVAL 7 DAY),
(3, 6, 'prescription_verified', 'prescription_upload', 'RX-1000', 'Prescription verified by pharmacist', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '{"verification_score": 0.95}', NOW() - INTERVAL 6 DAY),
(4, 5, 'appointment_booked', 'appointment', 2, 'Appointment booked with Dr. Michael Chen', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '{"appointment_date": "2024-03-07", "appointment_time": "14:30:00"}', NOW() - INTERVAL 2 HOUR);

-- ============================================
-- Sample Inventory Data
-- ============================================

INSERT INTO `inventory` (`id`, `product_id`, `transaction_type`, `quantity`, `unit_cost`, `reference_type`, `reference_id`, `reason`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'in', 5000, 2.50, 'purchase', NULL, 'Initial stock purchase', 1, NOW() - INTERVAL 30 DAY, NOW() - INTERVAL 30 DAY),
(2, 2, 'in', 1000, 8.00, 'purchase', NULL, 'Initial stock purchase', 1, NOW() - INTERVAL 30 DAY, NOW() - INTERVAL 30 DAY),
(3, 3, 'in', 3000, 3.00, 'purchase', NULL, 'Initial stock purchase', 1, NOW() - INTERVAL 30 DAY, NOW() - INTERVAL 30 DAY),
(4, 1, 'out', 10, 5.00, 'order', 1, 'Order ORD-2024001', 4, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(5, 3, 'out', 5, 6.50, 'order', 1, 'Order ORD-2024001', 4, NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY),
(6, 2, 'out', 5, 15.00, 'order', 3, 'Order ORD-2024003', 4, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY);

-- ============================================
-- Doctor Earnings
-- ============================================

INSERT INTO `doctor_earnings` (`id`, `doctor_id`, `appointment_id`, `earning_type`, `amount`, `commission_rate`, `commission_amount`, `status`, `earning_date`, `paid_date`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'consultation', 1500.00, 0.20, 300.00, 'paid', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY, 'Cardiology consultation fee', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
(2, 2, 2, 'consultation', 1200.00, 0.20, 240.00, 'pending', NOW() + INTERVAL 3 DAY, NULL, 'Neurology consultation fee', NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 2 HOUR),
(3, 3, 3, 'consultation', 800.00, 0.20, 160.00, 'paid', NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 4 DAY, 'Pediatrics consultation fee', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 5 DAY);

COMMIT;
