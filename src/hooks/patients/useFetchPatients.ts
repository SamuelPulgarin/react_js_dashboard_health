import { useEffect, useState } from "react";
import { fetchPatientsWithRelations } from "../../services/patient.services";
import { usePatientStore } from "../../store/patient.store";

export const useFetchPatients = (currentPage: number, itemsPerPage: number) => {
    const { setPatients, patients } = usePatientStore();
    const [loading, setLoading] = useState(false);
    const [totalPatients, setTotalPatients] = useState(0);

    useEffect(() => {
        const getPatients = async () => {
            setLoading(true);
            const offset = (currentPage - 1) * itemsPerPage;
            const { patients: fetchedPatients, total } = await fetchPatientsWithRelations(itemsPerPage, offset);
            setPatients(fetchedPatients);
            setTotalPatients(total);
            setLoading(false);
        };

        getPatients();
    }, [setPatients, currentPage, itemsPerPage]);

    return {
        patients,
        totalPatients,
        loading,
    };
};

