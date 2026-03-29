# Medigo Healthcare 🏥 - Complete Hospital Management System (2024)

[![React](https://img.shields.io/badge/React-18.2-blue?style=flat&logo=react)](https://reactjs.org/)
[![Laravel](https://img.shields.io/badge/Laravel-11.0-orange?style=flat&logo=laravel)](https://laravel.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-green?style=flat&logo=vite)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat&logo=tailwind)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat&logo=mysql)](https://mysql.com/)

## 🎯 Project Overview

**Medigo Healthcare** is a **production-grade, full-stack Hospital/HIMS (Hospital Information Management System)** for complete healthcare operations. Built with modern **React 18 + Laravel 11**, featuring **dynamic RBAC menus**, **80+ admin modules**, **real-time financials**, **patient EMR**, **pharmacy inventory**, **lab workflows**, and **cPanel deployment**.

**Core Business Value:**
- **80+ Admin Pages** - Complete hospital ops
- **Dynamic Menus** - Role-based (Admin/Doctor/Pharmacist/HR)
- **Financial Suite** - Trial Balance, P&L, Receivables/Payables
- **Patient EMR** - Registration, History, Billing
- **Pharmacy** - Stock, Orders, Expiry tracking
- **Lab** - Test booking, results, QC
- **Reports** - 20+ real-time dashboards

**Live Demo**: `http://localhost:5174/admin` (npm run dev)

## 📊 Features Matrix

| Module | Pages | Status | Key Functions |
|--------|-------|--------|---------------|
| **Accounts** | 25 | ✅ Complete | Trial Balance, Balance Sheet, Income Statement, Day/Cash/Bank Book, Receivables/Payables Aging, GST Reports, Fixed Assets |
| **HR** | 12 | ✅ Complete | Employee Entry, Salary Process/Payment, Attendance (Daily/Monthly), HR Ledger |
| **Medical** | 15 | ✅ Complete | Prescription System, Diagnostic Transaction, Medical+Diagnostic Combined, History |
| **Pharmacy** | 20 | ✅ Complete | Medicines, Medical Devices, First Aid, Supplements, Stock Management Enhanced, Prescription Orders Enhanced, Suppliers, Sales |
| **Laboratory** | 12 | ✅ Complete | Lab Tests, Test Categories, Sample Collection, Test Results, Equipment, Quality Control, Reports |
| **Patients** | 10 | ✅ Complete | Registration, Records, Medical History, Appointments, Billing/Invoices |
| **Emergency** | 5 | ✅ Complete | Emergency Cases, Equipment, Staff |
| **Reports** | 15 | ✅ Complete | Patient/Doctor/Appointment/Financial/Lab/Emergency/Sales |
| **Analysis** | 5 | ✅ Complete | Analysis Specimen, Sample Collection Room |
| **Services** | 5 | ✅ Complete | Service Categories, List, Pricing, Packages |
| **Settings** | 5 | ✅ Complete | User Management, Role Permissions, Backup/Restore |
| **Inventory** | 5 | ✅ Complete | Stock Management |

**Total**: **134 admin pages/modules**

## 📁 Complete File Structure (Full Hierarchy)

```
medigohealthcare-main/ (Root)
│
├── .env* (Main - DB/API config)
├── .env.example (Template)
├── .gitignore
├── README.md* (This)
├── package.json (npm deps)
├── vite.config.js* (API proxy + build)
│
├── server/ (Laravel 11 Backend API)
│   ├── .env.example
│   ├── artisan (CLI)
│   ├── composer.json
│   ├── routes/
│   │   ├── api.php* (All REST endpoints)
│   │   ├── web.php
│   │   └── console.php
│   ├── app/Http/Controllers/Api/
│   │   ├── AdminMenuController.php*
│   │   ├── MenuPermissionController.php* (Dynamic RBAC)
│   │   ├── SettingsController.php (Users/Roles)
│   │   ├── PrescriptionController.php
│   │   ├── DoctorController.php
│   │   └── ... (Patient, Pharmacy, Lab...)
│   ├── app/Models/
│   │   ├── Role.php* (permissions JSONB)
│   │   ├── Permission.php
│   │   ├── User.php (role_id FK)
│   │   ├── Patient.php
│   │   ├── Doctor.php
│   │   ├── PharmacyOrder.php
│   │   ├── LabTest.php
│   │   └── PatientInvoice.php
│   ├── app/Http/Middleware/RoleMiddleware.php
│   ├── database/migrations/ (50+ tables)
│   │   ├── 000023_create_roles_table.php*
│   │   ├── 000024_create_permissions_table.php*
│   │   ├── 000030_add_role_id_to_users_table.php
│   │   ├── 000031_create_patients_table.php
│   │   └── ... (invoices, lab_tests...)
│   ├── database/seed_data.sql
│   └── database/schema.sql
│
├── src/ (React 18 Frontend - Vite SPA)
│   ├── main.jsx (Entry)
│   ├── App.jsx (Router + AdminLayout)
│   ├── pages/admin/ (Admin - 80+ Pages)
│   │   ├── accounts/
│   │   │   ├── CreateGroup.jsx
│   │   │   ├── CreateLedger.jsx
│   │   │   ├── ChartOfAccounts.jsx
│   │   │   ├── TrialBalance.jsx
│   │   │   ├── BalanceSheet.jsx
│   │   │   ├── IncomeStatement.jsx
│   │   │   ├── DayBook.jsx
│   │   │   └── CashBook.jsx
│   │   ├── hr/
│   │   │   ├── SalaryProcess.jsx
│   │   │   ├── SalaryPayment.jsx
│   │   │   ├── EmployeeEntry.jsx
│   │   │   └── attendance/
│   │   │       ├── MonthlyAttendance.jsx
│   │   │       └── AttendanceReport.jsx
│   │   ├── medical/
│   │   │   ├── Prescription.jsx
│   │   │   ├── Diagnostic.jsx
│   │   │   ├── Transaction.jsx
│   │   │   ├── Combined.jsx
│   │   │   └── History.jsx
│   │   ├── pharmacy/
│   │   │   ├── Medicines.jsx
│   │   │   ├── MedicalDevices.jsx
│   │   │   ├── MedicalDevicesEnhanced.jsx
│   │   │   ├── StockManagementEnhanced.jsx
│   │   │   ├── PrescriptionOrders.jsx
│   │   │   └── PrescriptionOrdersEnhanced.jsx
│   │   ├── lab/
│   │   │   ├── LabTests.jsx
│   │   │   ├── TestCategories.jsx
│   │   │   ├── SampleCollection.jsx
│   │   │   └── TestResults.jsx
│   │   ├── patients/
│   │   │   ├── PatientRegistration.jsx
│   │   │   ├── PatientRecords.jsx
│   │   │   └── PatientBilling.jsx
│   │   ├── reports/
│   │   │   └── PatientReports.jsx
│   │   └── settings/
│   │       ├── UserManagement.jsx
│   │       └── RolePermissions.jsx
│   │
│   ├── components/admin/
│   │   ├── AdminSidebar.jsx* (Dynamic)
│   │   └── DynamicMenuItem.jsx
│   ├── services/
│   │   └── adminMenuService.js* (RBAC)
│   ├── hooks/
│   │   └── useAdminMenu.js
│   └── utils/
│       └── exportUtils.js
│
├── public/ (Static assets)
│   ├── favicon.svg
│   ├── index.html
│   └── vite.svg
│
├── scripts/ (Deploy)
│   ├── run-build.bat*
│   ├── setup-database.bat
│   └── upload_database.bat
│
├── mock-server.cjs* (Mock API)
├── TODO_ADMIN_MENU_FIX.md (✅)
└── README.md*


