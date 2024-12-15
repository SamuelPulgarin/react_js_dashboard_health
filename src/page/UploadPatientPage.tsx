import { UploadPatients } from '@/components/beneficiaries/UploadPatients'
import { SidebarMenu } from '@/components/common/SidebarMenu'

export const UploadPatientPage = () => {
    return (
        <div className="flex h-screen">
            <SidebarMenu />
            <main className="flex-1 overflow-auto p-4">
                <UploadPatients />
            </main>
        </div>
    )
}
