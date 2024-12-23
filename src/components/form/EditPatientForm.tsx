import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { useValidationForm } from "../../hooks/form/useValidationForm"
import { FormValues } from '../../interfaces/registration.interfaces';
import { useNavigate } from "react-router-dom"
import { Spinner } from "../common/Spinner"
import { prefillPatientData } from "../../utils/patient.utils"
import { updatePatient } from "../../services/patient.services"
import { useFetchPatient } from "@/hooks/patients/useFetchPatient"

export const EditPatientForm = () => {
  const { patient } = useFetchPatient();
  const { handleSubmit, register, setValue, formState: { errors } } = useForm<FormValues>();
  const { LINKAGE_DATE, NAME, LAST_NAME, EMAIL, PHONE, AGE, DOB, FULL_ADDRESS, HIV_TEST_DATE, SOCIAL_SECURITY, BEST_CONTACT_HOUR } = useValidationForm();

  const navigate = useNavigate();

  console.log(patient)

  if (!patient) return <Spinner />;

  prefillPatientData(patient, setValue);

  const onSubmit = (data: FormValues) => {
    if (!patient) return;
    updatePatient(patient.$id, data, navigate);
  };

  console.log("me renderizé")

  return (
    <>
      <h1 className="text-2xl font-bold text-center py-4">Edit Patient</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">

        {/* Health Ambassador */}
        <div>
          <Label htmlFor="healthAmbassador">Health Ambassador</Label>
          <Input
            id="healthAmbassador"
            value={patient.healthAmbassadors.name}
            readOnly
          />
        </div>

        {/* Linkage Date */}
        <div>
          <Label htmlFor="linkageDate">Linkage Date</Label>
          <Input
            id="linkageDate"
            type="date"
            {...register("linkage_date", LINKAGE_DATE)}
          />
          {errors.linkage_date && <p className="text-red-600">{errors.linkage_date.message}</p>}
        </div>

        {/* Name and Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", NAME)}
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("last_name", LAST_NAME)}
            />
            {errors.last_name && <p className="text-red-600">{errors.last_name.message}</p>}
          </div>
        </div>

        {/* Date of Birth, Age, and Sex */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              {...register("dob", DOB)}
            />
            {errors.dob && <p className="text-red-600">{errors.dob.message}</p>}
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              {...register("age", AGE)}
            />
            {errors.age && <p className="text-red-600">{errors.age.message}</p>}
          </div>
          <div>
            <Label htmlFor="sex">Sex</Label>
            <Input
              id="sex"
              value={patient.sex}
              readOnly
            />
          </div>
        </div>

        {/* Full Address */}
        <div>
          <Label htmlFor="fullAddress">Full Address</Label>
          <Input
            id="fullAddress"
            {...register("full_address", FULL_ADDRESS)}
          />
          {errors.full_address && <p className="text-red-600">{errors.full_address.message}</p>}
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", EMAIL)}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone", PHONE)}
            />
            {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Additional validations for other fields */}
        {/* HIV Test Date */}
        <div>
          <Label htmlFor="hivTestDate">HIV Test Date</Label>
          <Input
            id="hivTestDate"
            type="date"
            {...register("hiv_test", HIV_TEST_DATE)}
          />
          {errors.hiv_test && <p className="text-red-600">{errors.hiv_test.message}</p>}
        </div>

        {/* Additional Info */}
        <div>
          <Label htmlFor="aditionalInfo">Additional Info</Label>
          <Textarea {...register("aditional_info")} />
          {errors.aditional_info && <p className="text-red-600">{errors.aditional_info.message}</p>}
        </div>

        {/* Social Security */}
        <div>
          <Label htmlFor="socialSecurity">Social Security</Label>
          <Input
            id="socialSecurity"
            {...register("social_security", SOCIAL_SECURITY)}
          />
          {errors.social_security && <p className="text-red-600">{errors.social_security.message}</p>}
        </div>

        {/* Best Contact Hour */}
        <div>
          <Label htmlFor="bestContactHour">Best Contact Hour</Label>
          <Input
            id="bestContactHour"
            {...register("best_contact_hour", BEST_CONTACT_HOUR)}
          />
          {errors.best_contact_hour && <p className="text-red-600">{errors.best_contact_hour.message}</p>}
        </div>

        <Button type="submit" className="w-full">Update Patient</Button>
      </form>
    </>
  )
};
