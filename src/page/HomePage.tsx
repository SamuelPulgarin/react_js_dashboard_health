import { Dashboard } from '../components/dashboard/Dashboard';
import { SidebarMenu } from '../components/common/SidebarMenu';
import { PatientsTable } from '../components/dashboard/PatientsTable';
import { useFetchPatients } from '../hooks/patients/useFetchPatients';
import { Spinner } from '../components/common/Spinner';
import { useFetchChartData } from '@/hooks/dashboard/useFetchChartData';

export const HomePage = () => {

  //const { patients, loading } = useFetchPatients();
  const { data, isLoading } = useFetchChartData()

  return (
    <>
      {
        isLoading ? (
          <Spinner />
        ) : (
          <div className="flex h-screen">
            <SidebarMenu />
            <main className="flex-1 overflow-auto p-4">
              <Dashboard patients={data} />
              {/* <PatientsTable patients={data} /> */}
            </main>
          </div>
        )
      }
    </>
  )
}
