import { SidebarMenu } from '../components/common/SidebarMenu';
import { RegistrationForm } from '../components/form/RegistrationForm';

const RegisterPage = () => {
    return (
        <>
            <div className="flex h-screen">
                <SidebarMenu />
                <main className="flex-1 overflow-auto p-4">
                    <RegistrationForm />
                </main>
            </div>
        </>
    )
}

export default RegisterPage
