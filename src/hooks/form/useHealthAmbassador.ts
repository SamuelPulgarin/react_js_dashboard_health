import { useEffect, useState } from "react";
import { HealthAmbassador } from '../../interfaces/registration.interfaces';
import { fetchHealthAmbassadors } from "../../services/registration.services";

export const useHealthAmbassador = () => {

    const [healthAmbassadors, setHealthAmbassadors] = useState<HealthAmbassador[]>([]);

    useEffect(() => {
        const loadAmbassadors = async () => {
            const ambassadors: HealthAmbassador[] = await fetchHealthAmbassadors();
            setHealthAmbassadors(ambassadors);
        };
        loadAmbassadors();
    }, []);

    return {
        healthAmbassadors
    }
}
