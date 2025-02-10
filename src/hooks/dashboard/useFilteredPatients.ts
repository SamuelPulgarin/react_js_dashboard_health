// hooks/useFilteredPatients.ts
import { useState } from "react";
import { Patient } from '../../interfaces/patient.interfaces';
import { DateRange } from '../../interfaces/dashboard.interfaces';
import { addDays } from '../../utils/dashboard.utils'

export const useFilteredPatients = (patients: Patient[]) => {
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [minAge, setMinAge] = useState<string>("18");
  const [maxAge, setMaxAge] = useState<string>("65");
  const [sex, setSex] = useState<string>("all");

  const [appliedFilters, setAppliedFilters] = useState({
    date,
    minAge,
    maxAge,
    sex,
  });

  const applyFilters = () => {
    setAppliedFilters({ date, minAge, maxAge, sex });
  };

  const filteredPatients = () => {
    if (!patients || !Array.isArray(patients)) return [];
    return patients.filter((patient) => {
      const linkageDate = new Date(patient.linkage_date);
      const isWithinDateRange =
      linkageDate >= (appliedFilters?.date ?? {}).from &&
  linkageDate <= (appliedFilters?.date ?? {}).to;

      const isWithinAgeRange =
        patient.age >= parseInt(appliedFilters.minAge, 10) &&
        patient.age <= parseInt(appliedFilters.maxAge, 10);

      const isSexMatch =
        appliedFilters.sex === "all" || patient.sex === appliedFilters.sex;

      return isWithinDateRange && isWithinAgeRange && isSexMatch;
    });
  };

  return {
    filteredPatients,
    date,
    setDate,
    minAge,
    setMinAge,
    maxAge,
    setMaxAge,
    sex,
    setSex,
    applyFilters,
  };
};
