// hooks/useFilteredPatients.ts
import { useMemo, useState } from "react";
import { Patient } from '../../interfaces/patient.interfaces';
import { DateRange } from '../../interfaces/dashboard.interfaces';
import { addDays } from '../../utils/dashboard.utils'

export const useFilteredPatients = (patients: Patient[]) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [minAge, setMinAge] = useState<string>("18");
  const [maxAge, setMaxAge] = useState<string>("65");
  const [sex, setSex] = useState<string>("all");

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      if (!date?.from || !date?.to) return false;

      const linkageDate = new Date(patient.linkage_date);
      const isWithinDateRange =
        linkageDate >= date.from && linkageDate <= date.to;

      const isWithinAgeRange =
        patient.age >= parseInt(minAge, 10) &&
        patient.age <= parseInt(maxAge, 10);

      const isSexMatch = sex === "all" || patient.sex === sex;

      return isWithinDateRange && isWithinAgeRange && isSexMatch;
    });
  }, [patients, date, minAge, maxAge, sex]);

  return { filteredPatients, date, setDate, minAge, setMinAge, maxAge, setMaxAge, sex, setSex };
};
