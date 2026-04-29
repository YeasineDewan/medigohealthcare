<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notice;
use App\Models\User;

class NoticeSeeder extends Seeder
{
    public function run(): void
    {
        // Get admin user for created_by
        $adminUser = User::where('role', 'admin')->first();

        $notices = [
            [
                'title' => 'Welcome to Medigo Healthcare',
                'content' => 'We are pleased to welcome you to our comprehensive healthcare platform. Our team of dedicated doctors and staff are committed to providing you with the best medical care and services.',
                'type' => 'general',
                'priority' => 'medium',
                'target_audience' => ['patient', 'doctor', 'admin', 'hospital_admin', 'staff'],
                'is_active' => true,
                'allow_comments' => true,
                'created_by' => $adminUser?->id,
            ],
            [
                'title' => 'System Maintenance Scheduled',
                'content' => 'The system will undergo scheduled maintenance on Sunday from 2:00 AM to 4:00 AM. During this time, some services may be temporarily unavailable. We apologize for any inconvenience.',
                'type' => 'maintenance',
                'priority' => 'high',
                'target_audience' => ['doctor', 'admin', 'hospital_admin', 'staff'],
                'start_date' => now()->addDays(2)->setTime(2, 0),
                'end_date' => now()->addDays(2)->setTime(4, 0),
                'is_active' => true,
                'allow_comments' => false,
                'created_by' => $adminUser?->id,
            ],
            [
                'title' => 'Emergency Contact Update',
                'content' => 'Our emergency hotline has been updated to 24/7 availability. Please call 10666 for immediate medical assistance. Our emergency response team is always ready to help.',
                'type' => 'emergency',
                'priority' => 'critical',
                'target_audience' => ['patient', 'doctor', 'admin', 'hospital_admin', 'staff'],
                'is_active' => true,
                'allow_comments' => false,
                'created_by' => $adminUser?->id,
            ],
            [
                'title' => 'Holiday Notice - Eid Celebration',
                'content' => 'Our hospital will remain closed on Eid-ul-Fitr from 21st to 23rd April. Emergency services will remain available. Regular OPD services will resume from 24th April. Eid Mubarak!',
                'type' => 'holiday',
                'priority' => 'medium',
                'target_audience' => ['patient', 'doctor', 'admin', 'hospital_admin', 'staff'],
                'start_date' => now()->addDays(10)->setTime(0, 0),
                'end_date' => now()->addDays(13)->setTime(23, 59),
                'is_active' => true,
                'allow_comments' => true,
                'created_by' => $adminUser?->id,
            ],
            [
                'title' => 'New Cardiology Department Opening',
                'content' => 'We are excited to announce the opening of our new state-of-the-art Cardiology Department. Led by renowned cardiologists, we now offer comprehensive heart care services including advanced diagnostics and treatments.',
                'type' => 'announcement',
                'priority' => 'high',
                'target_audience' => ['patient', 'doctor', 'admin', 'hospital_admin', 'staff'],
                'is_active' => true,
                'allow_comments' => true,
                'attachment_url' => 'storage/notices/cardiology-department.pdf',
                'created_by' => $adminUser?->id,
            ],
            [
                'title' => 'COVID-19 Safety Guidelines',
                'content' => 'Please follow our updated COVID-19 safety guidelines when visiting our facilities. Masks are mandatory in all patient areas. Hand sanitizing stations are available throughout the hospital.',
                'type' => 'general',
                'priority' => 'high',
                'target_audience' => ['patient', 'doctor', 'hospital_admin', 'staff'],
                'is_active' => true,
                'allow_comments' => false,
                'created_by' => $adminUser?->id,
            ],
            [
                'title' => 'Doctor Portal Training Session',
                'content' => 'A training session for the new doctor portal will be held this Friday at 3:00 PM in Conference Room B. All doctors are requested to attend. Refreshments will be provided.',
                'type' => 'general',
                'priority' => 'medium',
                'target_audience' => ['doctor'],
                'is_active' => true,
                'allow_comments' => true,
                'created_by' => $adminUser?->id,
            ],
            [
                'title' => 'Pharmacy Stock Update',
                'content' => 'Our pharmacy has been restocked with essential medicines. We now have improved inventory management to ensure availability of commonly prescribed medications.',
                'type' => 'announcement',
                'priority' => 'medium',
                'target_audience' => ['patient', 'doctor', 'staff'],
                'is_active' => true,
                'allow_comments' => true,
                'created_by' => $adminUser?->id,
            ],
            [
                'title' => 'Lab Test Results Delivery',
                'content' => 'Lab test results will now be delivered within 24 hours for most tests. Critical results will be communicated immediately to your treating physician.',
                'type' => 'general',
                'priority' => 'medium',
                'target_audience' => ['patient', 'doctor'],
                'is_active' => true,
                'allow_comments' => true,
                'created_by' => $adminUser?->id,
            ],
            [
                'title' => 'Weekend Clinic Hours Extended',
                'content' => 'We are pleased to announce extended clinic hours on weekends. Saturday: 9:00 AM - 6:00 PM, Sunday: 10:00 AM - 4:00 PM. Appointments can be booked online.',
                'type' => 'announcement',
                'priority' => 'low',
                'target_audience' => ['patient', 'doctor'],
                'is_active' => true,
                'allow_comments' => true,
                'created_by' => $adminUser?->id,
            ],
        ];

        foreach ($notices as $notice) {
            Notice::create($notice);
        }

        $this->command->info('Notices seeded successfully!');
    }
}

