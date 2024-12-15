import { useEffect, useState } from "react";
import { Patient } from '../../interfaces/patient.interfaces';
import { fetchPatientsWithRelations } from "../../services/patient.services";
import { useParams } from "react-router-dom";

export const useFetchPatient = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPatient = async () => {
            if (id) {
                setLoading(true);
                const response = await fetchPatientsWithRelations(id);
                setPatient(response); // Establecer el paciente obtenido
                setLoading(false);
            }
        };
        getPatient();
    }, [id]); // Solo se ejecutará cuando cambie el id

    return {
        patient,
        loading
    };
};