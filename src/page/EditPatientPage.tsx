import { SidebarMenu } from '../components/common/SidebarMenu'
import { EditPatientForm } from '../components/form/EditPatientForm'

export const EditPatientPage = () => {
    return (
        <>
            <div className="flex h-screen">
                <SidebarMenu />
                <main className="flex-1 overflow-auto p-4">
                    <EditPatientForm />
                </main>
            </div>
        </>
    )
}
