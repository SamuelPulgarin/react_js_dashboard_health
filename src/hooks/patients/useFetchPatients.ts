import { useEffect, useState } from "react";
import { fetchPatientsWithRelations } from "../../services/patient.services";
import { usePatientStore } from "../../store/patient.store";

export const useFetchPatients = () => {
    const { setPatients, patients } = usePatientStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPatients = async () => {
            setLoading(true);
            const response = await fetchPatientsWithRelations();
            setPatients(response);
            setLoading(false);
        };

        getPatients();
    }, [setPatients]);

    return {
        patients,
        loading
    };
}
