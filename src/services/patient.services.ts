import { databases, Query } from "../lib/appwrite/config";
import { Patient, Child, FilterOptions } from '../interfaces/patient.interfaces';
import { FormValues } from '../interfaces/registration.interfaces';
import toast from "react-hot-toast";

export const fetchPatientsWithRelations = async (id: string) => {
    try {
        // Obtener un paciente por su ID
        const patientResponse = await databases.getDocument(
            '66f8843900293602ad8f',
            '66f89ac7002b428ca133',
            id
        );

        const patient: Patient = {
            $id: patientResponse.$id,
            $collectionId: patientResponse.$collectionId,
            $databaseId: patientResponse.$databaseId,
            $createdAt: patientResponse.$createdAt,
            $updatedAt: patientResponse.$updatedAt,
            aditional_info: patientResponse.additional_info || null,
            age: patientResponse.age || 0,
            best_contact_hour: patientResponse.best_contact_hour || '',
            dob: patientResponse.dob || '',
            email: patientResponse.email || '',
            full_address: patientResponse.full_address || '',
            hiv_test: patientResponse.hiv_test || '',
            last_name: patientResponse.last_name || '',
            linkage_date: patientResponse.linkage_date || '',
            name: patientResponse.name || '',
            phone: patientResponse.phone || '',
            sex: patientResponse.sex || 'other',
            social_security: patientResponse.social_security || '',
            test_result: patientResponse.test_result || '',
            zip_code: patientResponse.zip_code || null,
            children: [],
            healthAmbassadors: patientResponse.healthAmbassadors || null,
        };

        // Obtener los hijos relacionados al paciente
        const childrenResponse = await databases.listDocuments(
            '66f8843900293602ad8f',
            '66f8a834000b171526c3',
            [Query.equal('patients', patient.$id)]
        );
        const children: Child[] = childrenResponse.documents.map((childDoc) => ({
            $id: childDoc.$id,
            $collectionId: childDoc.$collectionId,
            $databaseId: childDoc.$databaseId,
            $createdAt: childDoc.$createdAt,
            $updatedAt: childDoc.$updatedAt,
            dob: childDoc.dob || '',
            full_name: childDoc.full_name || '',
            patients: childDoc.patients || '',
            sex: childDoc.sex || 'other',
        }));

        return { ...patient, children };
    } catch (error) {
        console.error('Error fetching patient by ID with relations:', error);
        return null; // Retornar null si ocurre un error
    }
};

export const fetchPatientsWithRelationsAndFilters = async (limit = 50, offset = 0, hasActiveFilters: boolean, filters: FilterOptions = {}, searchTerm: string = "") => {
    try {

        let queries = [];

        if (searchTerm.trim() !== "") {
            queries.push(Query.search("name", searchTerm));
            // queries.push(Query.search("last_name", searchTerm));
            // queries.push(Query.search("email", searchTerm));
            //queries.push(Query.search("test_result", searchTerm));
        }

        if (hasActiveFilters) {
            // Filtro por resultado de prueba
            if (filters.testResult && filters.testResult != "all") {
                queries.push(Query.equal("test_result", filters.testResult));
            }

            // Filtro por género
            if (filters.gender && filters.gender != "all") {
                queries.push(Query.equal("sex", filters.gender));
            }

            // Filtro por rango de edad
            if (filters.ageRange) {
                if (filters.ageRange.min !== undefined && filters.ageRange.min !== 0 && filters.ageRange.max !== undefined && filters.ageRange.max !== 90) {
                    queries.push(Query.between("age", filters.ageRange.min, filters.ageRange.max));
                } else if (filters.ageRange.min !== undefined && filters.ageRange.min !== 0) {
                    queries.push(Query.greaterThanEqual("age", filters.ageRange.min));
                } else if (filters.ageRange.max !== undefined && filters.ageRange.max !== 90) {
                    queries.push(Query.lessThanEqual("age", filters.ageRange.max));
                }
            }

            // Filtro por fecha de inicio
            if (filters.startDate) {
                queries.push(Query.greaterThanEqual("$createdAt", filters.startDate.toISOString()));
            }

            // Filtro por fecha de fin
            if (filters.endDate) {
                queries.push(Query.lessThanEqual("$createdAt", filters.endDate.toISOString()));
            }

            queries.push(Query.limit(limit), Query.offset(offset), Query.orderDesc("$createdAt"));
            // Realizar consulta con filtros
            const response = await databases.listDocuments(
                "66f8843900293602ad8f",
                "66f89ac7002b428ca133",
                queries
            );

            const patients: Patient[] = response.documents.map((doc) => ({
                $id: doc.$id,
                $collectionId: doc.$collectionId,
                $databaseId: doc.$databaseId,
                $createdAt: doc.$createdAt,
                $updatedAt: doc.$updatedAt,
                aditional_info: doc.additional_info || null,
                age: doc.age || 0,
                best_contact_hour: doc.best_contact_hour || '',
                dob: doc.dob || '',
                email: doc.email || '',
                full_address: doc.full_address || '',
                hiv_test: doc.hiv_test || '',
                last_name: doc.last_name || '',
                linkage_date: doc.linkage_date || '',
                name: doc.name || '',
                phone: doc.phone || '',
                sex: doc.sex || 'other',
                social_security: doc.social_security || '',
                test_result: doc.test_result || '',
                zip_code: doc.zip_code || null,
                children: [], // Inicialmente vacío hasta obtener los hijos
                healthAmbassadors: doc.healthAmbassadors || null,
            }));

            return { patients, total: response.total };
        } else {
            const patientsResponse = await databases.listDocuments(
                "66f8843900293602ad8f",
                "66f89ac7002b428ca133",
                [
                    Query.limit(limit),
                    Query.offset(offset),
                    Query.orderDesc("$createdAt"),
                ]
            );

            const patients: Patient[] = patientsResponse.documents.map((doc) => ({
                $id: doc.$id,
                $collectionId: doc.$collectionId,
                $databaseId: doc.$databaseId,
                $createdAt: doc.$createdAt,
                $updatedAt: doc.$updatedAt,
                aditional_info: doc.additional_info || null,
                age: doc.age || 0,
                best_contact_hour: doc.best_contact_hour || '',
                dob: doc.dob || '',
                email: doc.email || '',
                full_address: doc.full_address || '',
                hiv_test: doc.hiv_test || '',
                last_name: doc.last_name || '',
                linkage_date: doc.linkage_date || '',
                name: doc.name || '',
                phone: doc.phone || '',
                sex: doc.sex || 'other',
                social_security: doc.social_security || '',
                test_result: doc.test_result || '',
                zip_code: doc.zip_code || null,
                children: [],
                healthAmbassadors: doc.healthAmbassadors || null,
            }));

            // Procesar relaciones para cada paciente
            const patientsWithRelations = await Promise.all(
                patients.map(async (patient) => {
                    const childrenResponse = await databases.listDocuments(
                        "66f8843900293602ad8f",
                        "66f8a834000b171526c3",
                        [Query.equal("patients", patient.$id)]
                    );
                    const children: Child[] = childrenResponse.documents.map((childDoc) => ({
                        $id: childDoc.$id,
                        $collectionId: childDoc.$collectionId,
                        $databaseId: childDoc.$databaseId,
                        $createdAt: childDoc.$createdAt,
                        $updatedAt: childDoc.$updatedAt,
                        dob: childDoc.dob || '',
                        full_name: childDoc.full_name || '',
                        patients: childDoc.patients || '',
                        sex: childDoc.sex || 'other',
                    }));

                    return { ...patient, children };
                })
            );

            return { patients: patientsWithRelations, total: patientsResponse.total };
        }
    } catch (error) {
        console.error('Error fetching patients with relations:', error);
        return { patients: [], total: 0 };
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


export const fetchDataForChart = async () => {
    try {
        const response = await databases.listDocuments(
            "66f8843900293602ad8f",
            "66f89ac7002b428ca133",
            [
                Query.limit(1000),
            ]
        );

        return response.documents.map((doc: any) => ({
            $id: doc.$id,
            $collectionId: doc.$collectionId,
            $databaseId: doc.$databaseId,
            $createdAt: doc.$createdAt,
            $updatedAt: doc.$updatedAt,
            aditional_info: doc.additional_info || null,
            age: doc.age || 0,
            best_contact_hour: doc.best_contact_hour || "",
            dob: doc.dob || "",
            email: doc.email || "",
            full_address: doc.full_address || "",
            hiv_test: doc.hiv_test || "",
            last_name: doc.last_name || "",
            linkage_date: doc.linkage_date || "",
            name: doc.name || "",
            phone: doc.phone || "",
            sex: doc.sex || "other",
            social_security: doc.social_security || "",
            test_result: doc.test_result || "",
            zip_code: doc.zip_code || null,
            children: doc.children || [],
            healthAmbassadors: doc.healthAmbassadors || null,
        }));
    } catch (error) {
        console.error("Error fetching chart data:", error);
        throw error;
    }
};
