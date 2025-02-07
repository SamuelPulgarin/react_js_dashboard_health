import { FormValues, HealthAmbassador } from "../interfaces/registration.interfaces";
import { databases, ID } from "../lib/appwrite/config";
import { toast } from 'react-hot-toast';

const formatDate = (dateString: string): string | null => {
    if (!dateString) return null; // Evita errores con valores vacíos
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null; // Si la fecha no es válida, retorna null
    return date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
};


export const createPatient = async (data: FormValues, navigate: Function) => {

    //const navigate = useNavigate();

    try {
        const patient = await databases.createDocument(`66f8843900293602ad8f`, '66f89ac7002b428ca133', ID.unique(), {
            name: data.name,
            last_name: data.last_name,
            dob: data.dob,
            age: Number(data.age),
            sex: data.sex,
            full_address: data.full_address,
            email: data.email,
            phone: data.phone,
            linkage_date: data.linkage_date,
            aditional_info: data.aditional_info,
            hiv_test: data.hiv_test,
            social_security: data.social_security,
            test_result: data.test_result,
            best_contact_hour: data.best_contact_hour,
            insurer: data.insurer,
            member_id: data.member_id,
            status: data.status,
            healthAmbassadors: data.healthAmbassador // relationship
        });

        // documents for "children"
        if (data.children.length > 0) {
            for (const child of data.children) {
                await databases.createDocument(`66f8843900293602ad8f`, '66f8a834000b171526c3', ID.unique(), {
                    full_name: child.name,
                    dob: child.dob,
                    sex: child.sex,
                    social_security: child.social_security,
                    patients: patient.$id // relationship
                });
            }
        }

        toast.success('Patient created successfully!');
        navigate('/dashboard')
        //navigate('/dashboard')
    } catch (error) {
        toast.error('Error creating patient. Please try again.');
        console.error('Error creating patient:', error);
        navigate('/dashboard')
    }
};

export const fetchHealthAmbassadors = async (): Promise<HealthAmbassador[]> => {
    try {
        const response = await databases.listDocuments(`66f8843900293602ad8f`, '66f8a8bb000455f4fe18');
        const documents = response.documents;
        return documents.map((doc: any) => {
            // Asegúrate de mapear las propiedades correctas del documento
            const healthAmbassador: HealthAmbassador = {
                $id: doc.$id,
                $collectionId: doc.$collectionId,
                $databaseId: doc.$databaseId,
                $createdAt: doc.$createdAt,
                $updatedAt: doc.$updatedAt,
                name: doc.name || "",
                $permissions: doc.$permissions
            };
            return healthAmbassador;
        });
    } catch (error) {
        console.error('Error fetching health ambassadors:', error);
        return [];
    }
};

export const uploadPatientsToDatabase = async (patients: any) => {

    try {
        const patientPromises = patients.map(async (patient: any) => {
            const newPatient = await databases.createDocument(
                "66f8843900293602ad8f",
                "66f89ac7002b428ca133",
                ID.unique(),
                {
                    name: patient.name,
                    last_name: patient.last_name,
                    dob: formatDate(patient.dob),
                    age: Number(patient.age),
                    sex: patient.sex?.toLowerCase(),
                    full_address: patient.full_address,
                    email: patient.email,
                    phone: String(patient.phone),
                    linkage_date: patient.linkage_date,
                    aditional_info: patient.aditional_info,
                    hiv_test: patient.hiv_test,
                    social_security: patient.social_security,
                    test_result: patient.test_result?.toLowerCase(),
                    insurer: patient.insurer?.toLowerCase(),
                    member_id: patient.member_id,
                    status: patient.status,
                    healthAmbassadors: patient.healthAmbassadors
                }
            );

            // Si el paciente tiene hijos, guardarlos en la colección correspondiente
            if (patient.children && patient.children.length > 0) {
                const uniqueChildren = patient.children.filter((child: any, index: number, self: any[]) =>
                    index === self.findIndex((t: any) => (
                        t.full_name === child.full_name &&
                        t.dob === child.dob &&
                        t.social_security === child.social_security
                    ))
                );

                const childrenPromises = uniqueChildren.map((child: any) =>
                    databases.createDocument(
                        "66f8843900293602ad8f",
                        "66f8a834000b171526c3",
                        ID.unique(),
                        {
                            full_name: child.full_name,
                            dob: formatDate(child.dob),
                            sex: child.sex?.toLowerCase(),
                            social_security: child.social_security,
                            patients: newPatient.$id
                        }
                    )
                );

                await Promise.all(childrenPromises);
            }
        });

        await Promise.all(patientPromises);
        return { success: true };
    } catch (error) {
        console.error("Error uploading patients:", error);
        return { success: false, error };
    }
};