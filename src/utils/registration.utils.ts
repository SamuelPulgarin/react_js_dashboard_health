/* import { FormValues } from "../interfaces/registration.interfaces";
import { databases } from "../lib/appwrite/config";

// Función para crear un nuevo paciente
export const createPatient = async (data: FormValues) => {
    try {
      const patient = await databases.createDocument(`66f8843900293602ad8f`, 'patients', 'unique()', {
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
          await databases.createDocument(`66f8843900293602ad8f`, 'children', 'unique()', {
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
  }; */