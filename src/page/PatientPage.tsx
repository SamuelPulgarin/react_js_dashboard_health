import { SidebarMenu } from "../components/common/SidebarMenu"
import { ViewPatientForm } from "../components/form/ViewPatientForm"

export const PatientPage = () => {
    return (
        <>
            <div className="flex h-screen">
                <SidebarMenu />
                <main className="flex-1 overflow-auto p-4">
                    <ViewPatientForm />
                </main>
            </div>
        </>
    )
}
