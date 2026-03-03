-- ============================================
-- Medigo Healthcare Database Schema
-- ============================================
-- Complete SQL schema for Medigo Healthcare Platform
-- Enhanced with Prescription Management System
-- Generated: 2024
-- Database: MySQL 8.0+
-- ============================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- ============================================
-- Database Creation
-- ============================================
CREATE DATABASE IF NOT EXISTS `medigo_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `medigo_db`;

-- ============================================
-- Table: users
-- ============================================
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','doctor','patient') NOT NULL DEFAULT 'patient',
  `phone` varchar(20) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT 'Bangladesh',
  `avatar` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: services
-- ============================================
CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `icon_svg` text DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `route_url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: emergency_services
-- ============================================
CREATE TABLE `emergency_services` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `icon_svg` text DEFAULT NULL,
  `bg_color_hex` varchar(10) NOT NULL DEFAULT '#FEE2E2',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: doctors
-- ============================================
CREATE TABLE `doctors` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `specialty` varchar(100) NOT NULL,
  `qualifications` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `experience_years` int(11) NOT NULL DEFAULT 0,
  `consultation_fee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `video_consultation_fee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `rating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `total_reviews` int(11) NOT NULL DEFAULT 0,
  `hospital` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `available_days` json DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `accepts_video_consultation` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `doctors_license_number_unique` (`license_number`),
  KEY `doctors_user_id_foreign` (`user_id`),
  CONSTRAINT `doctors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: appointments
-- ============================================
CREATE TABLE `appointments` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('in-person','video') NOT NULL DEFAULT 'in-person',
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `status` enum('pending','confirmed','completed','cancelled','no-show') NOT NULL DEFAULT 'pending',
  `symptoms` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `fee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `payment_status` varchar(20) NOT NULL DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT NULL,
  `cancellation_reason` text DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `appointments_patient_id_foreign` (`patient_id`),
  KEY `appointments_doctor_id_foreign` (`doctor_id`),
  CONSTRAINT `appointments_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `appointments_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: products
-- ============================================
CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) NOT NULL DEFAULT 0,
  `category` varchar(100) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `images` json DEFAULT NULL,
  `prescription_required` varchar(20) NOT NULL DEFAULT 'no',
  `ingredients` text DEFAULT NULL,
  `usage_instructions` text DEFAULT NULL,
  `side_effects` text DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT 0,
  `total_reviews` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  UNIQUE KEY `products_sku_unique` (`sku`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: orders
-- ============================================
CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_number` varchar(50) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `shipping` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','processing','shipped','delivered','cancelled','refunded') NOT NULL DEFAULT 'pending',
  `payment_status` enum('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT NULL,
  `shipping_name` varchar(255) DEFAULT NULL,
  `shipping_phone` varchar(20) DEFAULT NULL,
  `shipping_address` text DEFAULT NULL,
  `shipping_city` varchar(100) DEFAULT NULL,
  `shipping_state` varchar(100) DEFAULT NULL,
  `shipping_zip` varchar(20) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `shipped_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_order_number_unique` (`order_number`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: order_items
-- ============================================
CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: lab_tests
-- ============================================
CREATE TABLE `lab_tests` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `sample_type` varchar(100) DEFAULT NULL,
  `preparation` varchar(255) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `fasting_required` varchar(50) DEFAULT NULL,
  `home_collection` tinyint(1) NOT NULL DEFAULT 1,
  `report_time` varchar(100) DEFAULT NULL,
  `parameters` json DEFAULT NULL,
  `includes` text DEFAULT NULL,
  `why_test` text DEFAULT NULL,
  `is_popular` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lab_tests_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: lab_test_bookings
-- ============================================
CREATE TABLE `lab_test_bookings` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `booking_number` varchar(50) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `lab_test_id` bigint(20) UNSIGNED NOT NULL,
  `preferred_date` date NOT NULL,
  `preferred_time` time DEFAULT NULL,
  `collection_type` enum('home','center') NOT NULL DEFAULT 'home',
  `patient_name` varchar(255) NOT NULL,
  `patient_phone` varchar(20) NOT NULL,
  `patient_email` varchar(255) DEFAULT NULL,
  `patient_dob` date DEFAULT NULL,
  `patient_gender` enum('male','female','other') DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','sample_collected','processing','completed','cancelled') NOT NULL DEFAULT 'pending',
  `payment_status` enum('pending','paid','refunded') NOT NULL DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT NULL,
  `report_url` text DEFAULT NULL,
  `sample_collected_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lab_test_bookings_booking_number_unique` (`booking_number`),
  KEY `lab_test_bookings_user_id_foreign` (`user_id`),
  KEY `lab_test_bookings_lab_test_id_foreign` (`lab_test_id`),
  CONSTRAINT `lab_test_bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lab_test_bookings_lab_test_id_foreign` FOREIGN KEY (`lab_test_id`) REFERENCES `lab_tests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: prescriptions
-- ============================================
CREATE TABLE `prescriptions` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `appointment_id` bigint(20) UNSIGNED NOT NULL,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `diagnosis` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `prescription_date` date NOT NULL,
  `next_visit_date` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prescriptions_appointment_id_foreign` (`appointment_id`),
  KEY `prescriptions_doctor_id_foreign` (`doctor_id`),
  KEY `prescriptions_patient_id_foreign` (`patient_id`),
  CONSTRAINT `prescriptions_appointment_id_foreign` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `prescriptions_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `prescriptions_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: prescription_items
-- ============================================
CREATE TABLE `prescription_items` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `prescription_id` bigint(20) UNSIGNED NOT NULL,
  `medicine_name` varchar(255) NOT NULL,
  `dosage` varchar(100) DEFAULT NULL,
  `frequency` varchar(100) DEFAULT NULL,
  `duration` varchar(100) DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prescription_items_prescription_id_foreign` (`prescription_id`),
  CONSTRAINT `prescription_items_prescription_id_foreign` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: medical_records
-- ============================================
CREATE TABLE `medical_records` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `doctor_id` bigint(20) UNSIGNED DEFAULT NULL,
  `appointment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `record_type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `record_date` date NOT NULL,
  `attachments` json DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `is_shared` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medical_records_patient_id_foreign` (`patient_id`),
  KEY `medical_records_doctor_id_foreign` (`doctor_id`),
  KEY `medical_records_appointment_id_foreign` (`appointment_id`),
  CONSTRAINT `medical_records_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `medical_records_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE SET NULL,
  CONSTRAINT `medical_records_appointment_id_foreign` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: doctor_schedules
-- ============================================
CREATE TABLE `doctor_schedules` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `day_of_week` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `slot_duration` int(11) NOT NULL DEFAULT 30,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_schedules_doctor_id_foreign` (`doctor_id`),
  CONSTRAINT `doctor_schedules_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: doctor_earnings
-- ============================================
CREATE TABLE `doctor_earnings` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `doctor_id` bigint(20) UNSIGNED NOT NULL,
  `appointment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `earning_type` varchar(50) NOT NULL DEFAULT 'consultation',
  `amount` decimal(10,2) NOT NULL,
  `commission_percentage` decimal(5,2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','paid','cancelled') NOT NULL DEFAULT 'pending',
  `earning_date` date NOT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_earnings_doctor_id_foreign` (`doctor_id`),
  KEY `doctor_earnings_appointment_id_foreign` (`appointment_id`),
  CONSTRAINT `doctor_earnings_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `doctor_earnings_appointment_id_foreign` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: blog_posts
-- ============================================
CREATE TABLE `blog_posts` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext NOT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `author_id` bigint(20) UNSIGNED DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `likes` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_posts_slug_unique` (`slug`),
  KEY `blog_posts_author_id_foreign` (`author_id`),
  CONSTRAINT `blog_posts_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: reviews
-- ============================================
CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `reviewable_type` varchar(255) NOT NULL,
  `reviewable_id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_user_id_foreign` (`user_id`),
  KEY `reviews_reviewable_type_reviewable_id_index` (`reviewable_type`,`reviewable_id`),
  CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: notifications
-- ============================================
CREATE TABLE `notifications` (
  `id` char(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `notifiable_type` varchar(255) NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: inventory
-- ============================================
CREATE TABLE `inventory` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity_in` int(11) NOT NULL DEFAULT 0,
  `quantity_out` int(11) NOT NULL DEFAULT 0,
  `current_stock` int(11) NOT NULL DEFAULT 0,
  `transaction_type` varchar(50) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inventory_product_id_foreign` (`product_id`),
  KEY `inventory_created_by_foreign` (`created_by`),
  CONSTRAINT `inventory_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: personal_access_tokens
-- ============================================
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Enhanced Prescription Management System Tables
-- ============================================

-- Table: prescription_uploads (Dynamic prescription uploads)
CREATE TABLE `prescription_uploads` (
  `id` varchar(50) NOT NULL, -- RX-1000 format
  `customer_id` varchar(50) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `doctor_license` varchar(100) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `urgency` enum('normal','urgent','emergency') NOT NULL DEFAULT 'normal',
  `delivery_method` enum('pickup','delivery','courier') NOT NULL DEFAULT 'pickup',
  `preferred_pharmacy` varchar(255) DEFAULT NULL,
  `status` enum('pending_verification','verified','processing','ready','completed','rejected') NOT NULL DEFAULT 'pending_verification',
  `prescription_image` varchar(500) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `verified_at` timestamp NULL DEFAULT NULL,
  `processed_at` timestamp NULL DEFAULT NULL,
  `pharmacist_id` bigint(20) UNSIGNED DEFAULT NULL,
  `pharmacist_name` varchar(255) DEFAULT NULL,
  `verification_notes` text DEFAULT NULL,
  `processing_notes` text DEFAULT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `priority` enum('low','normal','high','critical') NOT NULL DEFAULT 'normal',
  `metadata` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prescription_uploads_customer_id_index` (`customer_id`),
  KEY `prescription_uploads_user_id_foreign` (`user_id`),
  KEY `prescription_uploads_pharmacist_id_foreign` (`pharmacist_id`),
  KEY `prescription_uploads_order_id_foreign` (`order_id`),
  KEY `prescription_uploads_status_index` (`status`),
  KEY `prescription_uploads_urgency_index` (`urgency`),
  CONSTRAINT `prescription_uploads_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `prescription_uploads_pharmacist_id_foreign` FOREIGN KEY (`pharmacist_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `prescription_uploads_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: prescription_upload_items (Items in uploaded prescriptions)
CREATE TABLE `prescription_upload_items` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `prescription_id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dosage` varchar(100) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `instructions` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prescription_upload_items_prescription_id_foreign` (`prescription_id`),
  CONSTRAINT `prescription_upload_items_prescription_id_foreign` FOREIGN KEY (`prescription_id`) REFERENCES `prescription_uploads` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: prescription_ocr_data (OCR extraction results)
CREATE TABLE `prescription_ocr_data` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `prescription_id` varchar(50) NOT NULL,
  `extracted_text` longtext DEFAULT NULL,
  `confidence_score` decimal(5,4) DEFAULT NULL,
  `processing_time` int(11) DEFAULT NULL,
  `extracted_doctor` varchar(255) DEFAULT NULL,
  `extracted_medications` json DEFAULT NULL,
  `extracted_dosage` json DEFAULT NULL,
  `extracted_instructions` text DEFAULT NULL,
  `ocr_provider` varchar(50) DEFAULT NULL,
  `processed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prescription_ocr_data_prescription_id_unique` (`prescription_id`),
  CONSTRAINT `prescription_ocr_data_prescription_id_foreign` FOREIGN KEY (`prescription_id`) REFERENCES `prescription_uploads` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Role and Permission System Tables
-- ============================================

-- Table: roles
CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: permissions
CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `module` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: role_permissions (Many-to-many relationship)
CREATE TABLE `role_permissions` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_permissions_role_id_permission_id_unique` (`role_id`,`permission_id`),
  KEY `role_permissions_role_id_foreign` (`role_id`),
  KEY `role_permissions_permission_id_foreign` (`permission_id`),
  CONSTRAINT `role_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: user_roles (Many-to-many relationship)
CREATE TABLE `user_roles` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `assigned_by` bigint(20) UNSIGNED DEFAULT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_roles_user_id_role_id_unique` (`user_id`,`role_id`),
  KEY `user_roles_user_id_foreign` (`user_id`),
  KEY `user_roles_role_id_foreign` (`role_id`),
  KEY `user_roles_assigned_by_foreign` (`assigned_by`),
  CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_roles_assigned_by_foreign` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- API Key Management Tables
-- ============================================

-- Table: api_keys
CREATE TABLE `api_keys` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `key_name` varchar(100) NOT NULL,
  `api_key` varchar(64) NOT NULL,
  `key_hash` varchar(255) NOT NULL,
  `permissions` json DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `usage_count` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_keys_api_key_unique` (`api_key`),
  UNIQUE KEY `api_keys_key_hash_unique` (`key_hash`),
  KEY `api_keys_user_id_foreign` (`user_id`),
  CONSTRAINT `api_keys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Payment System Tables
-- ============================================

-- Table: payments
CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `payment_id` varchar(50) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `appointment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `lab_test_booking_id` bigint(20) UNSIGNED DEFAULT NULL,
  `prescription_id` varchar(50) DEFAULT NULL,
  `payment_type` enum('order','appointment','lab_test','prescription','consultation') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'BDT',
  `payment_method` enum('bkash','nagad','rocket','stripe','cash','bank_transfer') NOT NULL,
  `gateway_transaction_id` varchar(255) DEFAULT NULL,
  `gateway_response` json DEFAULT NULL,
  `status` enum('pending','processing','completed','failed','cancelled','refunded') NOT NULL DEFAULT 'pending',
  `paid_at` timestamp NULL DEFAULT NULL,
  `failed_at` timestamp NULL DEFAULT NULL,
  `refunded_at` timestamp NULL DEFAULT NULL,
  `refund_amount` decimal(10,2) DEFAULT NULL,
  `refund_reason` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payments_payment_id_unique` (`payment_id`),
  KEY `payments_user_id_foreign` (`user_id`),
  KEY `payments_order_id_foreign` (`order_id`),
  KEY `payments_appointment_id_foreign` (`appointment_id`),
  KEY `payments_lab_test_booking_id_foreign` (`lab_test_booking_id`),
  KEY `payments_prescription_id_foreign` (`prescription_id`),
  KEY `payments_status_index` (`status`),
  CONSTRAINT `payments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payments_appointment_id_foreign` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payments_lab_test_booking_id_foreign` FOREIGN KEY (`lab_test_booking_id`) REFERENCES `lab_test_bookings` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payments_prescription_id_foreign` FOREIGN KEY (`prescription_id`) REFERENCES `prescription_uploads` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Activity Logging Tables
-- ============================================

-- Table: activity_logs
CREATE TABLE `activity_logs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `subject_type` varchar(255) DEFAULT NULL,
  `subject_id` bigint(20) UNSIGNED DEFAULT NULL,
  `description` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `properties` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_logs_user_id_foreign` (`user_id`),
  KEY `activity_logs_subject_type_subject_id_index` (`subject_type`,`subject_id`),
  KEY `activity_logs_action_index` (`action`),
  KEY `activity_logs_created_at_index` (`created_at`),
  CONSTRAINT `activity_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Backup System Tables
-- ============================================

-- Table: backups
CREATE TABLE `backups` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `backup_name` varchar(255) NOT NULL,
  `backup_path` varchar(500) NOT NULL,
  `backup_type` enum('full','incremental','database','files') NOT NULL DEFAULT 'full',
  `backup_size` bigint(20) DEFAULT NULL,
  `compression_method` varchar(20) DEFAULT NULL,
  `encryption_method` varchar(20) DEFAULT NULL,
  `status` enum('pending','running','completed','failed','deleted') NOT NULL DEFAULT 'pending',
  `started_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `error_message` text DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `backups_created_by_foreign` (`created_by`),
  KEY `backups_status_index` (`status`),
  KEY `backups_backup_type_index` (`backup_type`),
  CONSTRAINT `backups_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- System Settings Tables
-- ============================================

-- Table: settings
CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` varchar(100) NOT NULL,
  `value` text DEFAULT NULL,
  `type` enum('string','number','boolean','json','array') NOT NULL DEFAULT 'string',
  `group` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`),
  KEY `settings_group_index` (`group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Enhanced Medical Devices Management
-- ============================================

-- Table: medical_devices
CREATE TABLE `medical_devices` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `device_name` varchar(255) NOT NULL,
  `device_code` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `serial_number` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `specifications` json DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_price` decimal(10,2) DEFAULT NULL,
  `warranty_expiry` date DEFAULT NULL,
  `maintenance_interval` int(11) DEFAULT NULL,
  `last_maintenance` date DEFAULT NULL,
  `next_maintenance` date DEFAULT NULL,
  `status` enum('active','maintenance','repair','retired') NOT NULL DEFAULT 'active',
  `location` varchar(255) DEFAULT NULL,
  `assigned_to` bigint(20) UNSIGNED DEFAULT NULL,
  `images` json DEFAULT NULL,
  `documents` json DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `medical_devices_device_code_unique` (`device_code`),
  KEY `medical_devices_category_index` (`category`),
  KEY `medical_devices_status_index` (`status`),
  KEY `medical_devices_assigned_to_foreign` (`assigned_to`),
  KEY `medical_devices_created_by_foreign` (`created_by`),
  CONSTRAINT `medical_devices_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `medical_devices_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: medical_device_maintenance
CREATE TABLE `medical_device_maintenance` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `device_id` bigint(20) UNSIGNED NOT NULL,
  `maintenance_type` enum('routine','repair','calibration','inspection') NOT NULL,
  `description` text DEFAULT NULL,
  `performed_by` varchar(255) DEFAULT NULL,
  `performed_at` date NOT NULL,
  `next_due` date DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `documents` json DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medical_device_maintenance_device_id_foreign` (`device_id`),
  KEY `medical_device_maintenance_performed_at_index` (`performed_at`),
  CONSTRAINT `medical_device_maintenance_device_id_foreign` FOREIGN KEY (`device_id`) REFERENCES `medical_devices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Enhanced Stock Management
-- ============================================

-- Table: stock_categories
CREATE TABLE `stock_categories` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stock_categories_code_unique` (`code`),
  KEY `stock_categories_parent_id_foreign` (`parent_id`),
  CONSTRAINT `stock_categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `stock_categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: stock_items
CREATE TABLE `stock_items` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `item_code` varchar(50) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `unit` varchar(50) NOT NULL,
  `reorder_level` int(11) NOT NULL DEFAULT 10,
  `reorder_quantity` int(11) NOT NULL DEFAULT 50,
  `current_stock` int(11) NOT NULL DEFAULT 0,
  `unit_cost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `selling_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `supplier` varchar(255) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `batch_number` varchar(100) DEFAULT NULL,
  `storage_location` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stock_items_item_code_unique` (`item_code`),
  KEY `stock_items_category_id_foreign` (`category_id`),
  KEY `stock_items_current_stock_index` (`current_stock`),
  CONSTRAINT `stock_items_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `stock_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: stock_transactions
CREATE TABLE `stock_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `stock_item_id` bigint(20) UNSIGNED NOT NULL,
  `transaction_type` enum('in','out','adjustment','transfer') NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_cost` decimal(10,2) DEFAULT NULL,
  `reference_type` varchar(50) DEFAULT NULL,
  `reference_id` bigint(20) UNSIGNED DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `performed_by` bigint(20) UNSIGNED DEFAULT NULL,
  `transaction_date` date NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stock_transactions_stock_item_id_foreign` (`stock_item_id`),
  KEY `stock_transactions_performed_by_foreign` (`performed_by`),
  KEY `stock_transactions_transaction_date_index` (`transaction_date`),
  CONSTRAINT `stock_transactions_stock_item_id_foreign` FOREIGN KEY (`stock_item_id`) REFERENCES `stock_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stock_transactions_performed_by_foreign` FOREIGN KEY (`performed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Enhanced Indexes for Performance
-- ============================================

-- Users table indexes
CREATE INDEX `idx_users_role` ON `users` (`role`);
CREATE INDEX `idx_users_email` ON `users` (`email`);
CREATE INDEX `idx_users_is_active` ON `users` (`is_active`);
CREATE INDEX `idx_users_created_at` ON `users` (`created_at`);

-- Doctors table indexes
CREATE INDEX `idx_doctors_specialty` ON `doctors` (`specialty`);
CREATE INDEX `idx_doctors_is_available` ON `doctors` (`is_available`);
CREATE INDEX `idx_doctors_rating` ON `doctors` (`rating`);
CREATE INDEX `idx_doctors_experience_years` ON `doctors` (`experience_years`);

-- Appointments table indexes
CREATE INDEX `idx_appointments_date` ON `appointments` (`appointment_date`);
CREATE INDEX `idx_appointments_status` ON `appointments` (`status`);
CREATE INDEX `idx_appointments_patient_id` ON `appointments` (`patient_id`);
CREATE INDEX `idx_appointments_doctor_id` ON `appointments` (`doctor_id`);
CREATE INDEX `idx_appointments_type` ON `appointments` (`type`);

-- Products table indexes
CREATE INDEX `idx_products_category` ON `products` (`category`);
CREATE INDEX `idx_products_is_active` ON `products` (`is_active`);
CREATE INDEX `idx_products_is_featured` ON `products` (`is_featured`);
CREATE INDEX `idx_products_prescription_required` ON `products` (`prescription_required`);
CREATE INDEX `idx_products_price` ON `products` (`price`);

-- Orders table indexes
CREATE INDEX `idx_orders_status` ON `orders` (`status`);
CREATE INDEX `idx_orders_payment_status` ON `orders` (`payment_status`);
CREATE INDEX `idx_orders_user_id` ON `orders` (`user_id`);
CREATE INDEX `idx_orders_created_at` ON `orders` (`created_at`);

-- Lab tests table indexes
CREATE INDEX `idx_lab_tests_category` ON `lab_tests` (`category`);
CREATE INDEX `idx_lab_tests_is_popular` ON `lab_tests` (`is_popular`);
CREATE INDEX `idx_lab_tests_is_active` ON `lab_tests` (`is_active`);
CREATE INDEX `idx_lab_tests_price` ON `lab_tests` (`price`);

-- Lab test bookings table indexes
CREATE INDEX `idx_lab_test_bookings_status` ON `lab_test_bookings` (`status`);
CREATE INDEX `idx_lab_test_bookings_user_id` ON `lab_test_bookings` (`user_id`);
CREATE INDEX `idx_lab_test_bookings_preferred_date` ON `lab_test_bookings` (`preferred_date`);
CREATE INDEX `idx_lab_test_bookings_payment_status` ON `lab_test_bookings` (`payment_status`);

-- Prescriptions table indexes
CREATE INDEX `idx_prescriptions_patient_id` ON `prescriptions` (`patient_id`);
CREATE INDEX `idx_prescriptions_doctor_id` ON `prescriptions` (`doctor_id`);
CREATE INDEX `idx_prescriptions_prescription_date` ON `prescriptions` (`prescription_date`);
CREATE INDEX `idx_prescriptions_is_active` ON `prescriptions` (`is_active`);

-- Prescription uploads table indexes (NEW)
CREATE INDEX `idx_prescription_uploads_customer_id` ON `prescription_uploads` (`customer_id`);
CREATE INDEX `idx_prescription_uploads_status` ON `prescription_uploads` (`status`);
CREATE INDEX `idx_prescription_uploads_urgency` ON `prescription_uploads` (`urgency`);
CREATE INDEX `idx_prescription_uploads_uploaded_at` ON `prescription_uploads` (`uploaded_at`);
CREATE INDEX `idx_prescription_uploads_priority` ON `prescription_uploads` (`priority`);
CREATE INDEX `idx_prescription_uploads_delivery_method` ON `prescription_uploads` (`delivery_method`);

-- Prescription OCR data table indexes (NEW)
CREATE INDEX `idx_prescription_ocr_data_confidence_score` ON `prescription_ocr_data` (`confidence_score`);
CREATE INDEX `idx_prescription_ocr_data_processed_at` ON `prescription_ocr_data` (`processed_at`);
CREATE INDEX `idx_prescription_ocr_data_ocr_provider` ON `prescription_ocr_data` (`ocr_provider`);

-- Roles and permissions indexes (NEW)
CREATE INDEX `idx_roles_is_active` ON `roles` (`is_active`);
CREATE INDEX `idx_permissions_module` ON `permissions` (`module`);
CREATE INDEX `idx_permissions_is_active` ON `permissions` (`is_active`);
CREATE INDEX `idx_user_roles_user_id` ON `user_roles` (`user_id`);
CREATE INDEX `idx_user_roles_role_id` ON `user_roles` (`role_id`);

-- API keys table indexes (NEW)
CREATE INDEX `idx_api_keys_user_id` ON `api_keys` (`user_id`);
CREATE INDEX `idx_api_keys_is_active` ON `api_keys` (`is_active`);
CREATE INDEX `idx_api_keys_expires_at` ON `api_keys` (`expires_at`);
CREATE INDEX `idx_api_keys_last_used_at` ON `api_keys` (`last_used_at`);

-- Payments table indexes (NEW)
CREATE INDEX `idx_payments_user_id` ON `payments` (`user_id`);
CREATE INDEX `idx_payments_status` ON `payments` (`status`);
CREATE INDEX `idx_payments_payment_type` ON `payments` (`payment_type`);
CREATE INDEX `idx_payments_payment_method` ON `payments` (`payment_method`);
CREATE INDEX `idx_payments_created_at` ON `payments` (`created_at`);
CREATE INDEX `idx_payments_paid_at` ON `payments` (`paid_at`);

-- Activity logs table indexes (NEW)
CREATE INDEX `idx_activity_logs_user_id` ON `activity_logs` (`user_id`);
CREATE INDEX `idx_activity_logs_action` ON `activity_logs` (`action`);
CREATE INDEX `idx_activity_logs_created_at` ON `activity_logs` (`created_at`);
CREATE INDEX `idx_activity_logs_ip_address` ON `activity_logs` (`ip_address`);

-- Backups table indexes (NEW)
CREATE INDEX `idx_backups_status` ON `backups` (`status`);
CREATE INDEX `idx_backups_backup_type` ON `backups` (`backup_type`);
CREATE INDEX `idx_backups_created_by` ON `backups` (`created_by`);
CREATE INDEX `idx_backups_started_at` ON `backups` (`started_at`);
CREATE INDEX `idx_backups_completed_at` ON `backups` (`completed_at`);

-- Settings table indexes (NEW)
CREATE INDEX `idx_settings_group` ON `settings` (`group`);
CREATE INDEX `idx_settings_is_public` ON `settings` (`is_public`);
CREATE INDEX `idx_settings_type` ON `settings` (`type`);

-- Medical devices table indexes (NEW)
CREATE INDEX `idx_medical_devices_category` ON `medical_devices` (`category`);
CREATE INDEX `idx_medical_devices_status` ON `medical_devices` (`status`);
CREATE INDEX `idx_medical_devices_assigned_to` ON `medical_devices` (`assigned_to`);
CREATE INDEX `idx_medical_devices_purchase_date` ON `medical_devices` (`purchase_date`);
CREATE INDEX `idx_medical_devices_warranty_expiry` ON `medical_devices` (`warranty_expiry`);
CREATE INDEX `idx_medical_devices_next_maintenance` ON `medical_devices` (`next_maintenance`);

-- Medical device maintenance table indexes (NEW)
CREATE INDEX `idx_medical_device_maintenance_device_id` ON `medical_device_maintenance` (`device_id`);
CREATE INDEX `idx_medical_device_maintenance_maintenance_type` ON `medical_device_maintenance` (`maintenance_type`);
CREATE INDEX `idx_medical_device_maintenance_performed_at` ON `medical_device_maintenance` (`performed_at`);
CREATE INDEX `idx_medical_device_maintenance_next_due` ON `medical_device_maintenance` (`next_due`);

-- Stock management table indexes (NEW)
CREATE INDEX `idx_stock_categories_parent_id` ON `stock_categories` (`parent_id`);
CREATE INDEX `idx_stock_categories_is_active` ON `stock_categories` (`is_active`);
CREATE INDEX `idx_stock_items_category_id` ON `stock_items` (`category_id`);
CREATE INDEX `idx_stock_items_current_stock` ON `stock_items` (`current_stock`);
CREATE INDEX `idx_stock_items_is_active` ON `stock_items` (`is_active`);
CREATE INDEX `idx_stock_items_expiry_date` ON `stock_items` (`expiry_date`);
CREATE INDEX `idx_stock_transactions_stock_item_id` ON `stock_transactions` (`stock_item_id`);
CREATE INDEX `idx_stock_transactions_transaction_type` ON `stock_transactions` (`transaction_type`);
CREATE INDEX `idx_stock_transactions_transaction_date` ON `stock_transactions` (`transaction_date`);
CREATE INDEX `idx_stock_transactions_performed_by` ON `stock_transactions` (`performed_by`);

-- Reviews table indexes
CREATE INDEX `idx_reviews_user_id` ON `reviews` (`user_id`);
CREATE INDEX `idx_reviews_rating` ON `reviews` (`rating`);
CREATE INDEX `idx_reviews_is_approved` ON `reviews` (`is_approved`);
CREATE INDEX `idx_reviews_created_at` ON `reviews` (`created_at`);

-- Notifications table indexes
CREATE INDEX `idx_notifications_notifiable_type_notifiable_id` ON `notifications` (`notifiable_type`,`notifiable_id`);
CREATE INDEX `idx_notifications_read_at` ON `notifications` (`read_at`);
CREATE INDEX `idx_notifications_created_at` ON `notifications` (`created_at`);

-- Inventory table indexes
CREATE INDEX `idx_inventory_product_id` ON `inventory` (`product_id`);
CREATE INDEX `idx_inventory_transaction_type` ON `inventory` (`transaction_type`);
CREATE INDEX `idx_inventory_created_by` ON `inventory` (`created_by`);
CREATE INDEX `idx_inventory_created_at` ON `inventory` (`created_at`);

-- Blog posts table indexes
CREATE INDEX `idx_blog_posts_author_id` ON `blog_posts` (`author_id`);
CREATE INDEX `idx_blog_posts_is_published` ON `blog_posts` (`is_published`);
CREATE INDEX `idx_blog_posts_published_at` ON `blog_posts` (`published_at`);
CREATE INDEX `idx_blog_posts_category` ON `blog_posts` (`category`);
CREATE INDEX `idx_blog_posts_views` ON `blog_posts` (`views`);

-- Medical records table indexes
CREATE INDEX `idx_medical_records_patient_id` ON `medical_records` (`patient_id`);
CREATE INDEX `idx_medical_records_doctor_id` ON `medical_records` (`doctor_id`);
CREATE INDEX `idx_medical_records_record_type` ON `medical_records` (`record_type`);
CREATE INDEX `idx_medical_records_record_date` ON `medical_records` (`record_date`);
CREATE INDEX `idx_medical_records_is_shared` ON `medical_records` (`is_shared`);

-- Doctor schedules table indexes
CREATE INDEX `idx_doctor_schedules_doctor_id` ON `doctor_schedules` (`doctor_id`);
CREATE INDEX `idx_doctor_schedules_day_of_week` ON `doctor_schedules` (`day_of_week`);
CREATE INDEX `idx_doctor_schedules_is_available` ON `doctor_schedules` (`is_available`);

-- Doctor earnings table indexes
CREATE INDEX `idx_doctor_earnings_doctor_id` ON `doctor_earnings` (`doctor_id`);
CREATE INDEX `idx_doctor_earnings_earning_type` ON `doctor_earnings` (`earning_type`);
CREATE INDEX `idx_doctor_earnings_status` ON `doctor_earnings` (`status`);
CREATE INDEX `idx_doctor_earnings_earning_date` ON `doctor_earnings` (`earning_date`);

-- ============================================
-- Composite Indexes for Complex Queries
-- ============================================

-- Prescription management composite indexes
CREATE INDEX `idx_prescription_uploads_status_urgency` ON `prescription_uploads` (`status`, `urgency`);
CREATE INDEX `idx_prescription_uploads_customer_status` ON `prescription_uploads` (`customer_id`, `status`);
CREATE INDEX `idx_prescription_uploads_uploaded_status` ON `prescription_uploads` (`uploaded_at`, `status`);

-- Order management composite indexes
CREATE INDEX `idx_orders_user_status` ON `orders` (`user_id`, `status`);
CREATE INDEX `idx_orders_status_created` ON `orders` (`status`, `created_at`);

-- Appointment management composite indexes
CREATE INDEX `idx_appointments_doctor_date_status` ON `appointments` (`doctor_id`, `appointment_date`, `status`);
CREATE INDEX `idx_appointments_patient_date_status` ON `appointments` (`patient_id`, `appointment_date`, `status`);

-- Payment composite indexes
CREATE INDEX `idx_payments_user_status_type` ON `payments` (`user_id`, `status`, `payment_type`);
CREATE INDEX `idx_payments_status_created` ON `payments` (`status`, `created_at`);

-- Activity logging composite indexes
CREATE INDEX `idx_activity_logs_user_action_created` ON `activity_logs` (`user_id`, `action`, `created_at`);
CREATE INDEX `idx_activity_logs_action_subject_created` ON `activity_logs` (`action`, `subject_type`, `subject_id`, `created_at`);

-- ============================================
-- Initial Seed Data
-- ============================================

-- Insert default roles
INSERT INTO `roles` (`name`, `display_name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
('super_admin', 'Super Admin', 'Full system access with all permissions', 1, NOW(), NOW()),
('admin', 'Administrator', 'Administrative access to system modules', 1, NOW(), NOW()),
('doctor', 'Doctor', 'Medical practitioner with patient access', 1, NOW(), NOW()),
('pharmacist', 'Pharmacist', 'Prescription verification and dispensing', 1, NOW(), NOW()),
('patient', 'Patient', 'Regular patient with basic access', 1, NOW(), NOW()),
('lab_technician', 'Lab Technician', 'Lab test processing and management', 1, NOW(), NOW()),
('receptionist', 'Receptionist', 'Front desk and appointment management', 1, NOW(), NOW());

-- Insert default permissions
INSERT INTO `permissions` (`name`, `display_name`, `description`, `module`, `is_active`, `created_at`, `updated_at`) VALUES
-- User Management
('users.view', 'View Users', 'Can view user list and details', 'users', 1, NOW(), NOW()),
('users.create', 'Create Users', 'Can create new users', 'users', 1, NOW(), NOW()),
('users.edit', 'Edit Users', 'Can edit user information', 'users', 1, NOW(), NOW()),
('users.delete', 'Delete Users', 'Can delete users', 'users', 1, NOW(), NOW()),
-- Prescription Management
('prescriptions.view', 'View Prescriptions', 'Can view prescription list and details', 'prescriptions', 1, NOW(), NOW()),
('prescriptions.upload', 'Upload Prescriptions', 'Can upload new prescriptions', 'prescriptions', 1, NOW(), NOW()),
('prescriptions.verify', 'Verify Prescriptions', 'Can verify prescription authenticity', 'prescriptions', 1, NOW(), NOW()),
('prescriptions.process', 'Process Prescriptions', 'Can process prescriptions into orders', 'prescriptions', 1, NOW(), NOW()),
('prescriptions.delete', 'Delete Prescriptions', 'Can delete prescriptions', 'prescriptions', 1, NOW(), NOW()),
-- Medical Devices
('devices.view', 'View Medical Devices', 'Can view medical device inventory', 'devices', 1, NOW(), NOW()),
('devices.create', 'Create Medical Devices', 'Can add new medical devices', 'devices', 1, NOW(), NOW()),
('devices.edit', 'Edit Medical Devices', 'Can edit medical device information', 'devices', 1, NOW(), NOW()),
('devices.delete', 'Delete Medical Devices', 'Can delete medical devices', 'devices', 1, NOW(), NOW()),
('devices.maintenance', 'Manage Maintenance', 'Can manage device maintenance', 'devices', 1, NOW(), NOW()),
-- Stock Management
('stock.view', 'View Stock', 'Can view stock inventory', 'stock', 1, NOW(), NOW()),
('stock.manage', 'Manage Stock', 'Can manage stock levels and transactions', 'stock', 1, NOW(), NOW()),
('stock.reports', 'Stock Reports', 'Can view stock reports and analytics', 'stock', 1, NOW(), NOW()),
-- Reports
('reports.view', 'View Reports', 'Can view system reports', 'reports', 1, NOW(), NOW()),
('reports.export', 'Export Reports', 'Can export reports in various formats', 'reports', 1, NOW(), NOW()),
-- Settings
('settings.view', 'View Settings', 'Can view system settings', 'settings', 1, NOW(), NOW()),
('settings.edit', 'Edit Settings', 'Can edit system settings', 'settings', 1, NOW(), NOW());

-- Insert default system settings
INSERT INTO `settings` (`key`, `value`, `type`, `group`, `description`, `is_public`, `created_at`, `updated_at`) VALUES
-- Application Settings
('app_name', 'Medigo Healthcare', 'string', 'application', 'Application name', 1, NOW(), NOW()),
('app_version', '1.0.0', 'string', 'application', 'Current application version', 1, NOW(), NOW()),
('app_timezone', 'Asia/Dhaka', 'string', 'application', 'Default timezone', 1, NOW(), NOW()),
-- Prescription Settings
('prescription_max_file_size', '10485760', 'number', 'prescriptions', 'Maximum prescription file size in bytes', 0, NOW(), NOW()),
('prescription_allowed_types', '["jpg","jpeg","png","webp"]', 'json', 'prescriptions', 'Allowed prescription file types', 0, NOW(), NOW()),
('prescription_enable_ocr', 'true', 'boolean', 'prescriptions', 'Enable OCR processing', 0, NOW(), NOW()),
('prescription_auto_verify', 'false', 'boolean', 'prescriptions', 'Auto-verify prescriptions', 0, NOW(), NOW()),
-- Payment Settings
('payment_default_currency', 'BDT', 'string', 'payments', 'Default currency', 1, NOW(), NOW()),
('payment_default_gateway', 'bkash', 'string', 'payments', 'Default payment gateway', 0, NOW(), NOW()),
-- Notification Settings
('notification_email_enabled', 'false', 'boolean', 'notifications', 'Enable email notifications', 0, NOW(), NOW()),
('notification_sms_enabled', 'false', 'boolean', 'notifications', 'Enable SMS notifications', 0, NOW(), NOW()),
-- Backup Settings
('backup_enabled', 'true', 'boolean', 'backup', 'Enable automatic backups', 0, NOW(), NOW()),
('backup_schedule', 'daily', 'string', 'backup', 'Backup schedule', 0, NOW(), NOW()),
('backup_retention_days', '30', 'number', 'backup', 'Backup retention period in days', 0, NOW(), NOW());

-- Insert sample stock categories
INSERT INTO `stock_categories` (`name`, `code`, `description`, `parent_id`, `is_active`, `created_at`, `updated_at`) VALUES
('Medicines', 'MED', 'All types of medicines and drugs', NULL, 1, NOW(), NOW()),
('Medical Supplies', 'SUP', 'Medical supplies and consumables', NULL, 1, NOW(), NOW()),
('Equipment', 'EQP', 'Medical equipment and devices', NULL, 1, NOW(), NOW()),
('Prescription Drugs', 'PRES', 'Prescription-only medications', 1, 1, NOW(), NOW()),
('OTC Drugs', 'OTC', 'Over-the-counter medications', 1, 1, NOW(), NOW()),
('Surgical Supplies', 'SURG', 'Surgical instruments and supplies', 2, 1, NOW(), NOW()),
('Diagnostic Equipment', 'DIAG', 'Diagnostic and testing equipment', 3, 1, NOW(), NOW());

-- Insert sample stock items
INSERT INTO `stock_items` (`category_id`, `item_code`, `item_name`, `description`, `unit`, `reorder_level`, `reorder_quantity`, `current_stock`, `unit_cost`, `selling_price`, `supplier`, `is_active`, `created_at`, `updated_at`) VALUES
(4, 'PARA500', 'Paracetamol 500mg', 'Paracetamol tablets 500mg', 'tablet', 100, 500, 250, 2.50, 5.00, 'Pharma Corp', 1, NOW(), NOW()),
(4, 'AMOX250', 'Amoxicillin 250mg', 'Amoxicillin capsules 250mg', 'capsule', 50, 200, 150, 8.00, 15.00, 'MediSupply Ltd', 1, NOW(), NOW()),
(5, 'IBU400', 'Ibuprofen 400mg', 'Ibuprofen tablets 400mg', 'tablet', 80, 300, 200, 3.00, 6.50, 'Pharma Corp', 1, NOW(), NOW()),
(4, 'CIPRO500', 'Ciprofloxacin 500mg', 'Ciprofloxacin tablets 500mg', 'tablet', 30, 150, 80, 12.00, 25.00, 'MediSupply Ltd', 1, NOW(), NOW()),
(5, 'OMEP20', 'Omeprazole 20mg', 'Omeprazole capsules 20mg', 'capsule', 60, 250, 120, 5.50, 12.00, 'Pharma Corp', 1, NOW(), NOW());

-- Insert sample medical devices
INSERT INTO `medical_devices` (`device_name`, `device_code`, `category`, `brand`, `model`, `serial_number`, `description`, `specifications`, `purchase_date`, `purchase_price`, `warranty_expiry`, `maintenance_interval`, `last_maintenance`, `next_maintenance`, `status`, `location`, `created_by`, `created_at`, `updated_at`) VALUES
('Blood Pressure Monitor', 'BPM001', 'Diagnostic', 'Omron', 'BP786', 'SN001234', 'Automatic blood pressure monitor', '{"accuracy": "+/-3mmHg", "display": "Digital", "power": "Battery/AC"}', '2024-01-15', 8500.00, '2026-01-15', 90, '2024-10-15', '2025-01-15', 'active', 'Main Clinic', 1, NOW(), NOW()),
('ECG Machine', 'ECG001', 'Diagnostic', 'Philips', 'PageWriter TC50', 'SN005678', '12-lead ECG machine with printer', '{"leads": 12, "display": "8-inch LCD", "paper_width": "110mm"}', '2024-02-20', 250000.00, '2027-02-20', 180, '2024-10-20', '2025-04-20', 'active', 'Cardiology Unit', 1, NOW(), NOW()),
('Pulse Oximeter', 'POX001', 'Diagnostic', 'Contec', 'CMS50D', 'SN009012', 'Fingertip pulse oximeter', '{"accuracy": "+/-2%", "display": "OLED", "battery": "Rechargeable"}', '2024-03-10', 3500.00, '2026-03-10', 30, '2024-10-10', '2024-11-10', 'active', 'Emergency Room', 1, NOW(), NOW());

COMMIT;
