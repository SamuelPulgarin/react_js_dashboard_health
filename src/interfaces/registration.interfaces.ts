export type Child = {
    name: string;
    dob: string;
    sex: string;
}

export interface FormValues {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    dob: string;
    sex: string;
    fullAddress: string;
    hivTestDate: string;
    socialSecurity: string;
    testResult: string;
    bestContactHour: string;
    healthAmbassador: string;
    children: {
        name: string;
        dob: string;
        sex: string;
    }[];
}
