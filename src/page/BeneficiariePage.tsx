import { BeneficiariesTable } from '../components/beneficiaries/BeneficiariesTable'
import { SidebarMenu } from '../components/common/SidebarMenu'

export const BeneficiariePage = () => {
  return (
    <>
      <div className="flex h-screen">
        <SidebarMenu />
        <main className="flex-1 overflow-auto p-4">
          <BeneficiariesTable />
        </main>
      </div>
    </>
  )
}
