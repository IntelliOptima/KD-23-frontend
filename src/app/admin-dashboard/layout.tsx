import type { Metadata } from 'next'
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard'


export const metadata: Metadata = {
  title: 'KinoXP',
  description: 'KinoXP - The best cinema in the world, with only the best movies.',
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminDashboard>
        {children}
    </AdminDashboard>
  )
}
