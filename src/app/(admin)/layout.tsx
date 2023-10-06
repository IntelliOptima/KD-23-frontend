import './admin-dashboard.css';
import type { Metadata } from 'next'
import AdminPanel from '@/components/AdminDashboard/AdminPanel'


export const metadata: Metadata = {
  title: 'KinoXP',
  description: 'KinoXP - The best cinema in the world, with only the best movies.',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminPanel>
        {children}
    </AdminPanel>
  )
}
