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

export const RegistrationForm = () => {

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
            {
                loading ? (
                    <Spinner />
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-center py-4">Register Patient</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
                            {/* Health Ambassador */}
                            <div>
                                <Label htmlFor="healthAmbassador">Health Ambassador</Label>
                                <Select onValueChange={(value: string) => setValue('healthAmbassador', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a health ambassador" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {healthAmbassadors.map((ambassador) => (
                                            <SelectItem key={ambassador.$id} value={ambassador.$id}>
                                                {ambassador.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.healthAmbassador && <p className="text-red-500">{errors.healthAmbassador.message}</p>}
                            </div>

                            {/* Linkage Date */}
                            <div>
                                <Label htmlFor="linkageDate">Linkage Date</Label>
                                <Input
                                    id="linkageDate"
                                    type="date"
                                    {...register("linkage_date", LINKAGE_DATE)}
                                />
                            </div>

                            {/* Name and Last Name */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter name"
                                        {...register("name", NAME)}
                                    />
                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Enter last name"
                                        {...register("last_name", LAST_NAME)}
                                    />
                                    {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
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
                                    {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        placeholder="Enter age"
                                        {...register("age", AGE)}
                                    />
                                    {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="sex">Sex</Label>
                                    <Select onValueChange={(value: string) => setValue('sex', value.toLowerCase())}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select sex" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MALE">MALE</SelectItem>
                                            <SelectItem value="FEMALE">FEMALE</SelectItem>
                                            <SelectItem value="OTHER">OTHER</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.sex && <p className="text-red-500">{errors.sex.message}</p>}
                                </div>
                            </div>

                            {/* Full Address */}
                            <div>
                                <Label htmlFor="fullAddress">Full Address</Label>
                                <Input
                                    id="fullAddress"
                                    placeholder="Enter full address"
                                    {...register("full_address", FULL_ADDRESS)}
                                />
                                {errors.full_address && <p className="text-red-500">{errors.full_address.message}</p>}
                            </div>

                            {/* Email and Phone */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter email"
                                        {...register("email", EMAIL)}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter phone number"
                                        {...register("phone", PHONE)}
                                    />
                                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                                </div>
                            </div>

                            {/* Children */}
                            <div>
                                <div className="mr-5">
                                    <Label htmlFor="children">Children (under 18)</Label>
                                </div>
                                {children.map((child, index) => (
                                    <div key={child.id} className="grid grid-cols-4 gap-2 mt-2 items-end">
                                        <Input
                                            placeholder="Name"
                                            {...register(`children.${index}.name`)}
                                            defaultValue={child.name}
                                        />
                                        <Input
                                            type="date"
                                            {...register(`children.${index}.dob`)}
                                            defaultValue={child.dob}
                                        />
                                        <Select
                                            onValueChange={(value: string) => setValue(`children.${index}.sex`, value.toLowerCase())}
                                            defaultValue={child.sex}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select sex" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MALE">MALE</SelectItem>
                                                <SelectItem value="FEMALE">FEMALE</SelectItem>
                                                <SelectItem value="OTHER">OTHER</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button type="button" variant="destructive" onClick={() => removeChild(index)}>
                                            <X size={15} /> Eliminar
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" onClick={() => addChild({ name: "", dob: "", sex: "" })} className="mt-2">
                                    Add Child
                                </Button>
                            </div>

                            {/* HIV Test Date */}
                            <div>
                                <Label htmlFor="hivTestDate">HIV Test Date</Label>
                                <Input
                                    id="hivTestDate"
                                    type="date"
                                    {...register("hiv_test", HIV_TEST_DATE)}
                                />
                                {errors.hiv_test && <p className="text-red-500">{errors.hiv_test.message}</p>}
                            </div>

                            {/* Additional Info */}
                            <div>
                                <Label htmlFor="additionalInfo">Additional Info</Label>
                                <Textarea 
                                id="additionalInfo" 
                                placeholder="Enter additional information"
                                {...register("aditional_info")} 
                                />
                            </div>

                            {/* Social Security */}
                            <div>
                                <Label htmlFor="socialSecurity">Social Security</Label>
                                <Input
                                    id="socialSecurity"
                                    placeholder="Enter social security number"
                                    {...register("social_security", SOCIAL_SECURITY)}
                                />
                                {errors.social_security && <p className="text-red-500">{errors.social_security.message}</p>}
                            </div>

                            {/* Test Result */}
                            <div>
                                <Label htmlFor="testResult">Test Result</Label>
                                <Select onValueChange={(value: string) => setValue('test_result', value.toLowerCase())}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select test result" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NEGATIVE">NEGATIVE</SelectItem>
                                        <SelectItem value="POSITIVE">POSITIVE</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.test_result && <p className="text-red-500">{errors.test_result.message}</p>}
                            </div>

                            {/* Best Contact Hour */}
                            <div>
                                <Label htmlFor="bestContactHour">Best Contact Hour</Label>
                                <Input
                                    id="bestContactHour"
                                    placeholder="Enter best contact hour"
                                    {...register("best_contact_hour", BEST_CONTACT_HOUR)}
                                />
                                {errors.best_contact_hour && <p className="text-red-500">{errors.best_contact_hour.message}</p>}
                            </div>

                            <Button type="submit" className="w-full">Submit Registration</Button>
                        </form>
                    </>
                )
            }
        </>
    )
}
