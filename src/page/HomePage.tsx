import { Dashboard } from '../components/dashboard/Dashboard';
import { SidebarMenu } from '../components/common/SidebarMenu';
import { PatientsTable } from '../components/dashboard/PatientsTable';

export const HomePage = () => {
  return (
    <>
      <div className="flex h-screen">
        <SidebarMenu />
        <main className="flex-1 overflow-auto p-4">
          <Dashboard />
          <PatientsTable />
        </main>
      </div>
    </>
  )
}
