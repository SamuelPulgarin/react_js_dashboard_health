export interface Document {
    $id: string;
    $collectionId: string;
    $databaseId: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
}

export interface HealthAmbassador extends Document {
    name: string;
}

export type Child = {
    name: string;
    dob: string;
    sex: string;
}

export interface FormValues {
    name: string;
    last_name: string;
    email: string;
    phone: string;
    age: number;
    dob: string;
    sex: string;
    linkage_date: string;
    full_address: string;
    hiv_test: string;
    social_security: string;
    test_result: string;
    best_contact_hour: string;
    healthAmbassador: string;
    children: {
        name: string;
        dob: string;
        sex: string;
    }[];
}