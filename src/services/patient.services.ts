import { databases, Query } from "../lib/appwrite/config";
import { Patient, Child } from '../interfaces/patient.interfaces';
import { FormValues } from '../interfaces/registration.interfaces';
import toast from "react-hot-toast";

export const fetchPatientsWithRelations = async () => {
    try {
        //patients
        const patientsResponse = await databases.listDocuments('66f8843900293602ad8f', '66f89ac7002b428ca133');
        const patients: Patient[] = patientsResponse.documents;

        const patientsWithRelations = [];

        for (const patient of patients) {

            // children
            const childrenResponse = await databases.listDocuments('66f8843900293602ad8f', '66f8a834000b171526c3', [
                Query.equal('patients', patient.$id)
            ]);
            const children: Child[] = childrenResponse.documents;

            const patientData = {
                ...patient,
                children
            };

            patientsWithRelations.push(patientData);
        }

        return patientsWithRelations;
    } catch (error) {
        console.error('Error fetching patients with relations:', error);
        return [];
    }
};


export const updatePatient = async (patientId: string, data: FormValues, navigate: Function) => {
    try {
        await databases.updateDocument(`66f8843900293602ad8f`, `66f89ac7002b428ca133`, patientId, {
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
            healthAmbassadors: data.healthAmbassador // relationship
        });

        toast.success('Patient updated successfully!');
        navigate("/beneficiary");
    } catch (error) {
        toast.error('Error creating patient. Please try again.');
        console.error("Error updating patient:", error);
        navigate("/beneficiary");
    }
};


export const deletePatient = async (patientId: string) => {
    try {
        const patientResponse = await databases.deleteDocument(`66f8843900293602ad8f`, `66f89ac7002b428ca133`, patientId);
        return patientResponse;
    } catch (error) {
        console.error("Error al eliminar paciente:", error);
        return [];
    }
};