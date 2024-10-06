import { databases, Query } from "../lib/appwrite/config";
import { Patient, Child } from '../interfaces/patient.interfaces';

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