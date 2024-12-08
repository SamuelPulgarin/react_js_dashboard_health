import { useState } from 'react'

interface Props {
    testResult: string;
    gender: string;
    ageRange: { min: number; max: number };
    hasChildren: boolean;
    startDate: Date | undefined;
    endDate: Date | undefined;
}

export const useFiltersDropdown = ({ testResult, gender, ageRange, hasChildren, startDate, endDate }: Props) => {
    const [localTestResult, setLocalTestResult] = useState(testResult);
    const [localGender, setLocalGender] = useState(gender);
    const [localAgeRange, setLocalAgeRange] = useState(ageRange);
    const [localHasChildren, setLocalHasChildren] = useState(hasChildren);
    const [localStartDate, setLocalStartDate] = useState(startDate);
    const [localEndDate, setLocalEndDate] = useState(endDate);

    return {
        localTestResult,
        setLocalTestResult,
        localGender, 
        setLocalGender,
        localAgeRange, 
        setLocalAgeRange,
        localHasChildren,
        setLocalHasChildren,
        localStartDate,
        setLocalStartDate,
        localEndDate,
        setLocalEndDate
    }
}
