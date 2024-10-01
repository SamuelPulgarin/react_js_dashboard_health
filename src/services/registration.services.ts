import { FormValues } from "../interfaces/registration.interfaces";
import { databases, ID } from "../lib/appwrite/config";

// Función para crear un nuevo paciente
export const createPatient = async (data: FormValues) => {
    try {
        const patient = await databases.createDocument(`66f8843900293602ad8f`, '66f89ac7002b428ca133', ID.unique(), {
            name: data.name,
            lastName: data.lastName,
            dob: data.dob,
            age: data.age,
            sex: data.sex,
            fullAddress: data.fullAddress,
            email: data.email,
            phone: data.phone,
            hivTestDate: data.hivTestDate,
            socialSecurity: data.socialSecurity,
            testResult: data.testResult,
            bestContactHour: data.bestContactHour,
            healthAmbassadors: data.healthAmbassador // relationship
        });

        // documents for "children"
        if (data.children.length > 0) {
            for (const child of data.children) {
                await databases.createDocument(`66f8843900293602ad8f`, '66f8a834000b171526c3', ID.unique(), {
                    full_name: child.name,
                    dob: child.dob,
                    sex: child.sex,
                    patients: patient.$id // relationship
                });
            }
        }

        console.log('Patient created successfully', patient);
    } catch (error) {
        console.error('Error creating patient:', error);
    }
};

export const fetchHealthAmbassadors = async () => {
    try {
        const response = await databases.listDocuments(`66f8843900293602ad8f`, '66f8a8bb000455f4fe18');
        return response.documents;
    } catch (error) {
        console.error('Error fetching health ambassadors:', error);
        return [];
    }
};