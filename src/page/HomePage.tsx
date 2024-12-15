import { Dashboard } from '../components/dashboard/Dashboard';
import { SidebarMenu } from '../components/common/SidebarMenu';
import { useFetchChartData } from '@/hooks/dashboard/useFetchChartData';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { Patient } from '@/interfaces/patient.interfaces';

export const HomePage = () => {

  //const { patients, loading } = useFetchPatients();
  const { data, isLoading } = useFetchChartData()

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen">
          <SidebarMenu />
          <main className="flex-1 overflow-auto p-4">
            <DashboardSkeleton />
          </main>
        </div>
      ) : (
        <div className="flex h-screen">
          <SidebarMenu />
          <main className="flex-1 overflow-auto p-4">
            <Dashboard patients={data ? (data as Patient[]) : []} />
          </main>
        </div>
      )}
    </>
  )
}
