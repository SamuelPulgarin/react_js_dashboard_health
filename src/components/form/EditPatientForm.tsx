import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'
import { useFieldArray, useForm } from "react-hook-form"
import { useValidationForm } from "../../hooks/form/useValidationForm"
import { FormValues } from '../../interfaces/registration.interfaces';
import { useHealthAmbassador } from "../../hooks/form/useHealthAmbassador"
import { useNavigate } from "react-router-dom"
import { useRegistrationForm } from "../../hooks/form/useRegistrationForm"
import { Spinner } from "../common/Spinner"

export const EditPatientForm = () => {

    const { handleSubmit, formState: { errors }, register, control, setValue } = useForm<FormValues>();
    const { fields: children, append: addChild, remove: removeChild } = useFieldArray({ control, name: "children" });
    const { LINKAGE_DATE, NAME, LAST_NAME, EMAIL, PHONE, AGE, DOB, FULL_ADDRESS, HIV_TEST_DATE, SOCIAL_SECURITY, BEST_CONTACT_HOUR } = useValidationForm();
    const { healthAmbassadors } = useHealthAmbassador();
    const { loading, registerPatient } = useRegistrationForm();

    const navigate = useNavigate();

    const onSubmit = (data: FormValues) => {
        //console.log(data)
        registerPatient(data, navigate)
    };
    
  return (
    <>

    </>
  )
}
