-- ============================================
-- Medigo Healthcare Database Schema
-- ============================================
-- Complete SQL schema for Medigo Healthcare Platform
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
-- Indexes for Performance
-- ============================================
CREATE INDEX `idx_users_role` ON `users` (`role`);
CREATE INDEX `idx_users_email` ON `users` (`email`);
CREATE INDEX `idx_doctors_specialty` ON `doctors` (`specialty`);
CREATE INDEX `idx_doctors_is_available` ON `doctors` (`is_available`);
CREATE INDEX `idx_appointments_date` ON `appointments` (`appointment_date`);
CREATE INDEX `idx_appointments_status` ON `appointments` (`status`);
CREATE INDEX `idx_products_category` ON `products` (`category`);
CREATE INDEX `idx_products_is_active` ON `products` (`is_active`);
CREATE INDEX `idx_orders_status` ON `orders` (`status`);
CREATE INDEX `idx_lab_tests_category` ON `lab_tests` (`category`);

COMMIT;
