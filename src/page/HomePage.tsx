import { Dashboard } from '../components/dashboard/Dashboard';
import { SidebarMenu } from '../components/common/SidebarMenu';

export const HomePage = () => {
  return (
    <>
      <div className="flex h-screen">
        <SidebarMenu />
        <main className="flex-1 overflow-auto p-4">
          <Dashboard />
        </main>
      </div>
    </>
  )
}
