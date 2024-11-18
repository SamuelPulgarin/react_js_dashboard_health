import { databases, Query } from "../lib/appwrite/config";
import { Patient, Child, FilterOptions } from '../interfaces/patient.interfaces';
import { FormValues } from '../interfaces/registration.interfaces';
import toast from "react-hot-toast";

export const fetchPatientsWithRelations = async (limit = 50, offset = 0) => {
    try {
        // Obtener pacientes con el límite y offset especificado
        const patientsResponse = await databases.listDocuments(
            '66f8843900293602ad8f',
            '66f89ac7002b428ca133',
            [
                Query.limit(limit),
                Query.offset(offset),
                Query.orderDesc("$createdAt")
            ]
        );

        const patients: Patient[] = patientsResponse.documents;

        // Procesar relaciones para cada paciente
        const patientsWithRelations = await Promise.all(
            patients.map(async (patient) => {
                const childrenResponse = await databases.listDocuments(
                    '66f8843900293602ad8f',
                    '66f8a834000b171526c3',
                    [Query.equal('patients', patient.$id)]
                );
                const children: Child[] = childrenResponse.documents;

                return { ...patient, children };
            })
        );

        return { patients: patientsWithRelations, total: patientsResponse.total };
    } catch (error) {
        console.error('Error fetching patients with relations:', error);
        return { patients: [], total: 0 };
    }
};

export const fetchPatientsWithRelationsAndFilters = async (limit = 50, offset = 0, hasActiveFilters: boolean, filters: FilterOptions = {}) => {
    try {

        let queries = [];

        if (hasActiveFilters) {
            // Filtro por resultado de prueba
            // if (filters.testResult) {
            //     queries.push(Query.equal("test_result", filters.testResult));
            // }

            // Filtro por género
            if (filters.gender) {
                queries.push(Query.equal("sex", filters.gender));
            }

            // Filtro por rango de edad
            // if (filters.ageRange) {
            //     if (filters.ageRange.min !== undefined && filters.ageRange.max !== undefined) {
            //         queries.push(Query.between("age", filters.ageRange.min, filters.ageRange.max));
            //     } else if (filters.ageRange.min !== undefined) {
            //         queries.push(Query.greaterThanEqual("age", filters.ageRange.min));
            //     } else if (filters.ageRange.max !== undefined) {
            //         queries.push(Query.lessThanEqual("age", filters.ageRange.max));
            //     }
            // }

            // Filtro por hijos
            // if (filters.hasChildren !== undefined) {
            //     queries.push(Query.equal("has_children", filters.hasChildren));
            // }

            // Filtro por fecha de inicio
            // if (filters.startDate) {
            //     queries.push(Query.greaterThanEqual("createdAt", filters.startDate.toISOString()));
            // }

            // Filtro por fecha de fin
            // if (filters.endDate) {
            //     queries.push(Query.lessThanEqual("createdAt", filters.endDate.toISOString()));
            // }

            queries.push(Query.limit(limit), Query.offset(offset), Query.orderDesc("$createdAt"));

            // Realizar consulta con filtros
            const response = await databases.listDocuments(
                "66f8843900293602ad8f",
                "66f89ac7002b428ca133",
                queries
            );

            return { patients: response.documents as Patient[], total: response.total };

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

            const patients: Patient[] = patientsResponse.documents;

            // Procesar relaciones para cada paciente
            const patientsWithRelations = await Promise.all(
                patients.map(async (patient) => {
                    const childrenResponse = await databases.listDocuments(
                        "66f8843900293602ad8f",
                        "66f8a834000b171526c3",
                        [Query.equal("patients", patient.$id)]
                    );
                    const children: Child[] = childrenResponse.documents;

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