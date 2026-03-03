<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General Settings
            ['key' => 'site_name', 'value' => 'Medigo Healthcare', 'type' => 'string', 'group' => 'general', 'is_public' => true],
            ['key' => 'site_description', 'value' => 'Your trusted healthcare partner', 'type' => 'string', 'group' => 'general', 'is_public' => true],
            ['key' => 'contact_email', 'value' => 'info@medigo.com', 'type' => 'string', 'group' => 'general', 'is_public' => true],
            ['key' => 'contact_phone', 'value' => '+880 1234567890', 'type' => 'string', 'group' => 'general', 'is_public' => true],
            ['key' => 'address', 'value' => 'Dhaka, Bangladesh', 'type' => 'string', 'group' => 'general', 'is_public' => true],
            
            // Business Settings
            ['key' => 'currency', 'value' => 'BDT', 'type' => 'string', 'group' => 'business', 'is_public' => true],
            ['key' => 'currency_symbol', 'value' => '৳', 'type' => 'string', 'group' => 'business', 'is_public' => true],
            ['key' => 'tax_rate', 'value' => '0', 'type' => 'number', 'group' => 'business', 'is_public' => false],
            ['key' => 'min_order_amount', 'value' => '100', 'type' => 'number', 'group' => 'business', 'is_public' => true],
            ['key' => 'delivery_charge', 'value' => '50', 'type' => 'number', 'group' => 'business', 'is_public' => true],
            
            // Appointment Settings
            ['key' => 'appointment_duration', 'value' => '30', 'type' => 'number', 'group' => 'appointments', 'is_public' => false],
            ['key' => 'appointment_buffer', 'value' => '15', 'type' => 'number', 'group' => 'appointments', 'is_public' => false],
            ['key' => 'max_appointments_per_day', 'value' => '20', 'type' => 'number', 'group' => 'appointments', 'is_public' => false],
            
            // Notification Settings
            ['key' => 'email_notifications', 'value' => 'true', 'type' => 'boolean', 'group' => 'notifications', 'is_public' => false],
            ['key' => 'sms_notifications', 'value' => 'false', 'type' => 'boolean', 'group' => 'notifications', 'is_public' => false],
            
            // System Settings
            ['key' => 'maintenance_mode', 'value' => 'false', 'type' => 'boolean', 'group' => 'system', 'is_public' => false],
            ['key' => 'backup_schedule', 'value' => 'daily', 'type' => 'string', 'group' => 'system', 'is_public' => false],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
