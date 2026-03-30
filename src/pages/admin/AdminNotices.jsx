import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import NoticeManager from '../../components/admin/NoticeManager';

export default function AdminNotices() {
  return (
    <AdminLayout>
      <NoticeManager />
    </AdminLayout>
  );
}
