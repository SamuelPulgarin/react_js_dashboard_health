import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Spinner } from "../common/Spinner";
import { useValidationForm } from "../../hooks/form/useValidationForm";
import { FormValues } from '../../interfaces/registration.interfaces';
import { prefillPatientData } from "../../utils/patient.utils";
import { formatDate } from "../../utils/form.utils";
import { useFetchPatient } from "@/hooks/patients/useFetchPatient";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const ViewPatientForm = () => {
  const { patient } = useFetchPatient();
  const { handleSubmit, register, setValue } = useForm<FormValues>();
  const { LINKAGE_DATE, NAME, LAST_NAME, EMAIL, PHONE, AGE, DOB, FULL_ADDRESS, HIV_TEST_DATE, SOCIAL_SECURITY, BEST_CONTACT_HOUR } = useValidationForm();

  const navigate = useNavigate()

  if (!patient) return <Spinner />;

  prefillPatientData(patient, setValue)

  const onSubmit = (data: FormValues) => {
    console.log(data)
  };

  console.log(patient.children)

  return (
    <>
      <h1 className="text-2xl font-bold text-center py-4">View Patient</h1>
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
            disabled
          />
        </div>

        {/* Name and Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", NAME)}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("last_name", LAST_NAME)}
              readOnly
            />
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
              disabled
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              {...register("age", AGE)}
              readOnly
            />
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
            readOnly
          />
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", EMAIL)}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone", PHONE)}
              readOnly
            />
          </div>
        </div>

        {/* Children */}
        <div>
          <Label htmlFor="children">Children (under 18)</Label>
          {patient.children && patient.children.length > 0 ? (
            patient.children.map((child) => (
              <div key={child.$id} className="grid grid-cols-4 gap-4 mt-2">
                <Input value={child.full_name} readOnly />
                <Input value={formatDate(child.dob)} type="date" disabled />
                <Input value={child.sex} readOnly />
                <Input value={child.social_security} readOnly />
              </div>
            ))
          ) : (
            <p>No children listed.</p>
          )}
        </div>

        {/* HIV Test Date, Insurer, Member id */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="hivTestDate">HIV Test Date</Label>
            <Input
              id="hivTestDate"
              type="date"
              {...register("hiv_test", HIV_TEST_DATE)}
              disabled
            />
          </div>
          <div>
            <Label htmlFor="insurer">Insurer</Label>
            <Input
              id="insurer"
              {...register("insurer")}
              disabled
            />
          </div>
          <div>
            <Label htmlFor="member_id">Member id</Label>
            <Input
              id="member_id"
              {...register("member_id")}
              disabled
            />
          </div>

        </div>

        {/* Additional Info */}
        <div>
          <Label htmlFor="aditionalInfo">Additional Info</Label>
          <Textarea value={patient.aditional_info || ''} readOnly />
        </div>

        {/* Social Security */}
        <div>
          <Label htmlFor="socialSecurity">Social Security</Label>
          <Input
            id="socialSecurity"
            {...register("social_security", SOCIAL_SECURITY)}
            readOnly
          />
        </div>

        {/* Test Result, Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="testResult">Test Result</Label>
            <Input value={patient.test_result} readOnly />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Input value={patient.status} readOnly />
          </div>
        </div>

        {/* Best Contact Hour */}
        <div>
          <Label htmlFor="bestContactHour">Best Contact Hour</Label>
          <Input
            id="bestContactHour"
            {...register("best_contact_hour", BEST_CONTACT_HOUR)}
            readOnly
          />
        </div>

        <div className="grid gap-y-3 sm:flex sm:gap-x-4">
          <Button type="button" className="w-full" onClick={() => navigate(-1)}>Back</Button>
          <Button type="submit" className="w-full" onClick={() => navigate(`/update-patient/${patient.$id}`)}>Edit Patient</Button>
        </div>
      </form>
    </>
  );
};
