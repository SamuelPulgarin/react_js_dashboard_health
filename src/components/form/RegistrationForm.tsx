import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'
import { useRegistrationForm } from "../../hooks/form/useRegistrationForm"
import { useForm } from "react-hook-form"
import { useValidationForm } from "../../hooks/form/useValidationForm"
import { FormValues } from '../../interfaces/registration.interfaces';
import { createPatient, fetchHealthAmbassadors } from "../../services/registration.services"
import { useEffect, useState } from "react"

export const RegistrationForm = () => {

    const { handleSubmit, formState: { errors }, register } = useForm<FormValues>();
    const { children, addChild, updateChild, removeChild } = useRegistrationForm();
    const { NAME, LAST_NAME, EMAIL, PHONE, AGE, DOB, FULL_ADDRESS, HIV_TEST_DATE, SOCIAL_SECURITY, BEST_CONTACT_HOUR } = useValidationForm();

    const [healthAmbassadors, setHealthAmbassadors] = useState([]);

    useEffect(() => {
        const loadAmbassadors = async () => {
            const ambassadors = await fetchHealthAmbassadors();
            setHealthAmbassadors(ambassadors);
        };
        loadAmbassadors();
    }, []);

    console.log(healthAmbassadors);

    const onSubmit = async (data: FormValues) => {
        await createPatient(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
            {/* <div>
                <Label htmlFor="healthAmbassador">Health Ambassador</Label>
                <Input id="healthAmbassador" placeholder="Enter health ambassador name" />
            </div> */}

            <div>
                <Label htmlFor="linkageDate">Linkage Date</Label>
                <Input id="linkageDate" type="date" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name"
                        placeholder="Enter name"
                        {...register("name", NAME)}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName"
                        placeholder="Enter last name"
                        {...register("lastName", LAST_NAME)}
                    />
                    {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                </div>
            </div>

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
                    <Select onValueChange={(value) => updateChild(0, 'sex', value)}>
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

            <div>
                <Label htmlFor="fullAddress">Full Address</Label>
                <Input
                    id="fullAddress"
                    placeholder="Enter full address"
                    {...register("fullAddress", FULL_ADDRESS)}
                />
                {errors.fullAddress && <p className="text-red-500">{errors.fullAddress.message}</p>}
            </div>

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
                    <Input id="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        {...register("phone", PHONE)}
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>
            </div>

            <div>
                <div className="mr-5">
                    <Label>Children (under 18)</Label>
                </div>
                {children.map((child, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 mt-2 items-end">
                        <Input
                            placeholder="Name"
                            value={child.name}
                            onChange={(e) => updateChild(index, 'name', e.target.value)}
                        />
                        <Input
                            type="date"
                            value={child.dob}
                            onChange={(e) => updateChild(index, 'dob', e.target.value)}
                        />
                        <Select
                            value={child.sex}
                            onValueChange={(value) => updateChild(index, 'sex', value)}
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
                        <Button type="button" variant="destructive" onClick={() => removeChild(index)} >
                            <X size={15} />
                            Eliminar
                        </Button>
                    </div>
                ))}
                <Button type="button" onClick={addChild} className="mt-2">Add Child</Button>
            </div>

            <div>
                <Label htmlFor="hivTestDate">HIV Test Date</Label>
                <Input
                    id="hivTestDate"
                    type="date"
                    {...register("hivTestDate", HIV_TEST_DATE)}
                />
                {errors.hivTestDate && <p className="text-red-500">{errors.hivTestDate.message}</p>}
            </div>

            <div>
                <Label htmlFor="additionalInfo">Additional Info</Label>
                <Textarea id="additionalInfo" placeholder="Enter additional information" />
            </div>

            <div>
                <Label htmlFor="socialSecurity">Social Security</Label>
                <Input
                    id="socialSecurity"
                    placeholder="Enter social security number"
                    {...register("socialSecurity", SOCIAL_SECURITY)}
                />
                {errors.socialSecurity && <p className="text-red-500">{errors.socialSecurity.message}</p>}
            </div>

            <div>
                <Label htmlFor="testResult">Test Result</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select test result" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="NEGATIVE">NEGATIVE</SelectItem>
                        <SelectItem value="POSITIVE">POSITIVE</SelectItem>
                        <SelectItem value="INCONCLUSIVE">INCONCLUSIVE</SelectItem>
                    </SelectContent>
                </Select>
                {errors.testResult && <p className="text-red-500">{errors.testResult.message}</p>}
            </div>

            <div>
                <Label htmlFor="bestContactHour">Best Contact Hour</Label>
                <Input
                    id="bestContactHour"
                    placeholder="Enter best contact hour"
                    {...register("bestContactHour", BEST_CONTACT_HOUR)}
                />
                {errors.bestContactHour && <p className="text-red-500">{errors.bestContactHour.message}</p>}
            </div>

            <Button type="submit" className="w-full">Submit Registration</Button>
        </form>
    )
}
