export interface HealthAmbassador {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $updatedAt: string;
    name: string;
}


export interface Child {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $updatedAt: string;
    dob: string;
    full_name: string;
    patients: Patient;
    sex: 'male' | 'female' | 'other';
}


export interface Patient {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $updatedAt: string;
    aditional_info: string | null;
    age: number;
    best_contact_hour: string;
    dob: string;
    email: string;
    full_address: string;
    hiv_test: string;
    last_name: string;
    linkage_date: string;
    name: string;
    phone: string;
    sex: 'male' | 'female' | 'other';
    social_security: string;
    test_result: string;
    zip_code: string | null;
    children: Child[];
    healthAmbassadors: HealthAmbassador;
}

export interface FilterOptions {
    testResult?: string;
    gender?: string;
    ageRange?: { min: number; max: number } | null;
    hasChildren?: boolean | null;
    startDate?: Date | null;
    endDate?: Date | null;
  }