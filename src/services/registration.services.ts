import { FormValues, HealthAmbassador } from "../interfaces/registration.interfaces";
import { databases, ID } from "../lib/appwrite/config";
import { toast } from 'react-hot-toast';

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

        toast.success('Patient created successfully!');
        navigate('/dashboard')
        // console.log('Patient created successfully', patient);
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
      const uploadPromises = patients.map((patient: any) =>
        databases.createDocument("66f8843900293602ad8f", "66f89ac7002b428ca133", ID.unique(), patient)
      );
  
      await Promise.all(uploadPromises);
      return { success: true };
    } catch (error) {
      console.error("Error uploading patients:", error);
      return { success: false, error };
    }
  };