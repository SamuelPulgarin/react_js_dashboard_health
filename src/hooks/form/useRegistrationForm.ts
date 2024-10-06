import { useState } from "react"
import { FormValues } from "../../interfaces/registration.interfaces";
import { createPatient } from "../../services/registration.services";


export const useRegistrationForm = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const registerPatient = async(data: FormValues, navigate: Function) => {
        setLoading(true);
        await createPatient(data, navigate);
        setLoading(false);
    }

    return {
        registerPatient,
        loading
    }
} 