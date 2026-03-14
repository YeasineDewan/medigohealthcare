<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MenuPermissionController extends Controller
{
    /**
     * Get dynamic admin menu based on user role and permissions
     */
    public function getAdminMenu(): JsonResponse
    {
        try {
            Log::info('Dynamic AdminMenu called', [
                'user_id' => Auth::id(),
                'user_email' => Auth::user()?->email ?? 'guest'
            ]);

            $user = Auth::user();
            $menu = $this->buildDynamicMenu($user);

            return response()->json($menu);
        } catch (\Exception $e) {
            Log::error('Dynamic AdminMenu error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'user_id' => Auth::id()
            ]);

            // Fallback to basic menu for admin users
            if ($user && $user->role_id) {
                $role = Role::find($user->role_id);
                return response()->json($this->getRoleBasedMenu($role));
            }

            return response()->json(['error' => 'Menu unavailable'], 503);
        }
    }

    private function buildDynamicMenu($user = null)
    {
        $baseMenu = [
            [
                'id' => 'dashboard',
                'label' => 'Dashboard',
                'icon' => 'LayoutDashboard',
                'path' => '/admin',
                'order' => 1,
                'roles' => ['admin', 'doctor', 'super-admin'],
                'permissions' => [],
                'visible' => true
            ],
            [
                'id' => 'accounts',
                'label' => 'Accounts',
                'icon' => 'Calculator',
                'order' => 2,
                'roles' => ['admin', 'accountant'],
                'permissions' => ['accounts.view', 'accounts.manage'],
                'children' => $this->getAccountsSubmenu(),
                'visible' => true
            ],
            [
                'id' => 'hr',
                'label' => 'HR',
                'icon' => 'Users',
                'order' => 3,
                'roles' => ['admin', 'hr'],
                'permissions' => ['hr.view', 'hr.manage'],
                'children' => $this->getHrSubmenu(),
                'visible' => true
            ],
            [
                'id' => 'medical',
                'label' => 'Medical',
                'icon' => 'Stethoscope',
                'order' => 4,
                'roles' => ['admin', 'doctor'],
                'permissions' => ['medical.view'],
                'children' => $this->getMedicalSubmenu(),
                'visible' => true
            ],
            [
                'id' => 'pharmacy',
                'label' => 'Pharmacy',
                'icon' => 'Pill',
                'order' => 5,
                'roles' => ['admin', 'pharmacist'],
                'permissions' => ['pharmacy.view', 'pharmacy.manage'],
                'children' => $this->getPharmacySubmenu(),
                'visible' => true
            ],
            [
                'id' => 'laboratory',
                'label' => 'Laboratory',
                'icon' => 'FlaskConical',
                'order' => 6,
                'roles' => ['admin', 'lab'],
                'permissions' => ['lab.view'],
                'children' => $this->getLabSubmenu(),
                'visible' => true
            ],
            [
                'id' => 'patients',
                'label' => 'Patients',
                'icon' => 'Users',
                'order' => 7,
                'roles' => ['admin', 'doctor'],
                'permissions' => ['patients.view'],
                'children' => $this->getPatientsSubmenu(),
                'visible' => true
            ],
            [
                'id' => 'reports',
                'label' => 'Reports',
                'icon' => 'FileText',
                'order' => 8,
                'roles' => ['admin', 'doctor'],
                'permissions' => ['reports.view'],
                'children' => $this->getReportsSubmenu(),
                'visible' => true
            ],
            [
                'id' => 'settings',
                'label' => 'Settings',
                'icon' => 'Settings',
                'order' => 99,
                'roles' => ['super-admin', 'admin'],
                'permissions' => ['settings.manage'],
                'children' => $this->getSettingsSubmenu(),
                'visible' => true
            ]
        ];

        return $this->filterMenuByPermissions($baseMenu, $user);
    }

    private function filterMenuByPermissions(array $menuItems, $user = null): array
    {
        if (!$user) {
            return array_filter($menuItems, fn($item) => !isset($item['roles']) || in_array('guest', $item['roles'] ?? []));
        }

        $role = $user->role ? Role::find($user->role_id) : null;
        $userRole = $role?->name ?? $user->role ?? 'guest';
        $userPermissions = $role?->permissions ?? $user->permissions ?? [];

        return array_map(function ($item) use ($userRole, $userPermissions) {
            // Check item permissions
            if (!$this->hasAccess($item, $userRole, $userPermissions)) {
                return null;
            }

            // Recursively filter children
            if (isset($item['children']) && is_array($item['children'])) {
                $item['children'] = array_filter(
                    array_map(fn($child) => $this->filterMenuByPermissions([$child], $user)[0] ?? null, $item['children'])
                );
            }

            return $item;
        }, $menuItems);
    }

    private function hasAccess($item, $userRole, $userPermissions): bool
    {
        // Always visible if explicitly set
        if (isset($item['visible']) && $item['visible'] === false) {
            return false;
        }

        // Check roles
        if (isset($item['roles']) && is_array($item['roles']) && !empty($item['roles'])) {
            if (!in_array($userRole, $item['roles']) && !in_array('all', $item['roles'])) {
                return false;
            }
        }

        // Check permissions
        if (isset($item['permissions']) && is_array($item['permissions']) && !empty($item['permissions'])) {
            foreach ($item['permissions'] as $permission) {
                if (!in_array($permission, $userPermissions)) {
                    return false;
                }
            }
        }

        return true;
    }

    // Dynamic submenu builders
    private function getAccountsSubmenu(): array
    {
        return [
            ['id' => 'accounts-masters', 'label' => 'Masters', 'order' => 1, 'children' => [
                ['id' => 'create-group', 'label' => 'Create Group', 'path' => '/admin/accounts/create-group'],
                ['id' => 'create-ledger', 'label' => 'Create Ledger', 'path' => '/admin/accounts/create-ledger'],
                ['id' => 'chart-of-accounts', 'label' => 'Chart of Accounts', 'path' => '/admin/accounts/chart-of-accounts'],
            ]],
            ['id' => 'accounts-reports', 'label' => 'Reports', 'order' => 2, 'children' => [
                ['id' => 'trial-balance', 'label' => 'Trial Balance', 'path' => '/admin/accounts/trial-balance'],
                ['id' => 'balance-sheet', 'label' => 'Balance Sheet', 'path' => '/admin/accounts/balance-sheet'],
                ['id' => 'income-statement', 'label' => 'Income Statement', 'path' => '/admin/accounts/income-statement'],
            ]]
        ];
    }

    private function getHrSubmenu(): array
    {
        return [
            ['id' => 'employee-entry', 'label' => 'Employee Entry', 'path' => '/admin/hr/employee-entry'],
            ['id' => 'salary-process', 'label' => 'Salary Process', 'path' => '/admin/hr/salary-process'],
            ['id' => 'attendance', 'label' => 'Attendance', 'path' => '/admin/hr/attendance'],
        ];
    }

    private function getMedicalSubmenu(): array
    {
        return [
            ['id' => 'prescription', 'label' => 'Prescription', 'path' => '/admin/medical/prescription'],
            ['id' => 'diagnostic', 'label' => 'Diagnostic', 'path' => '/admin/medical/diagnostic'],
            ['id' => 'medical-history', 'label' => 'Medical History', 'path' => '/admin/medical/history'],
        ];
    }

    private function getPharmacySubmenu(): array
    {
        return [
            ['id' => 'medicines', 'label' => 'Medicines', 'path' => '/admin/pharmacy/medicines'],
            ['id' => 'stock-management', 'label' => 'Stock Management', 'path' => '/admin/pharmacy/stock'],
            ['id' => 'prescription-orders', 'label' => 'Prescription Orders', 'path' => '/admin/pharmacy/prescription-orders'],
        ];
    }

    private function getLabSubmenu(): array
    {
        return [
            ['id' => 'lab-tests', 'label' => 'Lab Tests', 'path' => '/admin/lab/tests'],
            ['id' => 'test-results', 'label' => 'Test Results', 'path' => '/admin/lab/results'],
            ['id' => 'sample-collection', 'label' => 'Sample Collection', 'path' => '/admin/lab/collection'],
        ];
    }

    private function getPatientsSubmenu(): array
    {
        return [
            ['id' => 'patient-registration', 'label' => 'Registration', 'path' => '/admin/patients/registration'],
            ['id' => 'patient-records', 'label' => 'Records', 'path' => '/admin/patients/records'],
            ['id' => 'patient-billing', 'label' => 'Billing', 'path' => '/admin/patients/billing'],
        ];
    }

    private function getReportsSubmenu(): array
    {
        return [
            ['id' => 'patient-reports', 'label' => 'Patient Reports', 'path' => '/admin/reports/patients'],
            ['id' => 'emergency-reports', 'label' => 'Emergency', 'path' => '/admin/reports/emergency'],
        ];
    }

    private function getSettingsSubmenu(): array
    {
        return [
            ['id' => 'user-management', 'label' => 'Users', 'path' => '/admin/settings/users'],
            ['id' => 'role-permissions', 'label' => 'Roles & Permissions', 'path' => '/admin/settings/permissions'],
            ['id' => 'backup-restore', 'label' => 'Backup', 'path' => '/admin/settings/backup'],
        ];
    }
}

