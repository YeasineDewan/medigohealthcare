# Pharmacy Menu Fix - TODO

## Task
Fix "Medical Devices" and "Prescription Orders" menu items in admin sidebar pharmacy section.

## Issues Identified
1. Path mismatch in Backend API (AdminMenuController.php)
2. Path mismatch in Fallback Menu (adminMenuService.js)
3. Path mismatch in Mock Server (start-mock-server.js)

## Files Fixed
- [x] 1. app/Http/Controllers/Api/AdminMenuController.php - Fixed pharmacy menu paths
- [x] 2. src/services/adminMenuService.js - Fixed fallback menu paths
- [x] 3. start-mock-server.js - Fixed mock server paths

## Changes Made

### Backend (AdminMenuController.php)
- Medical Devices: `/admin/pharmacy/devices` → `/admin/pharmacy/medical-devices`
- Prescription Orders: `/admin/pharmacy/prescriptions` → `/admin/pharmacy/prescription-orders`

### Frontend Service (adminMenuService.js)
- Medical Devices: `/admin/pharmacy/devices` → `/admin/pharmacy/medical-devices`
- Prescription Orders: `/admin/pharmacy/prescriptions` → `/admin/pharmacy/prescription-orders`

### Mock Server (start-mock-server.js)
- Medical Devices: `/admin/pharmacy/devices` → `/admin/pharmacy/medical-devices`
- Prescription Orders: `/admin/pharmacy/prescriptions` → `/admin/pharmacy/prescription-orders`

## Status
- [x] Completed

