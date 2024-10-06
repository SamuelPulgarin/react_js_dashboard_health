import { useEffect, useState } from "react";
import { Patient } from '../../interfaces/patient.interfaces';
import { fetchPatientsWithRelations } from "../../services/patient.services";

export const useFetchPatients = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPatients = async () => {
            setLoading(true);
            const response = await fetchPatientsWithRelations();
            setPatients(response);
            setLoading(false);
        };

        getPatients();
    }, []);

    return {
        patients,
        loading
    }
}
