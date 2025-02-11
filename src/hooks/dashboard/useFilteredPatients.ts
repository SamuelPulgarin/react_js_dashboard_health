// hooks/useFilteredPatients.ts
import { useState } from "react";
import { Patient } from '../../interfaces/patient.interfaces';


export const useFilteredPatients = (patients: Patient[]) => {
  // const [date, setDate] = useState<DateRange>({
  //   from: new Date(),
  //   to: addDays(new Date(), 7),
  // });
  const initialState = {
    minAge: "18",
    maxAge: "65",
    sex: "all",
    selectedYear: "all",
    status: "all",
  };

  const [minAge, setMinAge] = useState<string>(initialState.minAge);
  const [maxAge, setMaxAge] = useState<string>(initialState.maxAge);
  const [sex, setSex] = useState<string>(initialState.sex);
  const [selectedYear, setSelectedYear] = useState<string | undefined>(initialState.selectedYear);
  const [status, setStatus] = useState<string | undefined>(initialState.status);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients);

  const applyFilters = () => {
    const filtered = patients.filter((patient) => {
      const patientAge = patient.age;
      const patientYear = new Date(patient.linkage_date).getFullYear();
      const patientStatus = patient.status;
      const patientSex = patient.sex;

      return (
        patientAge >= Number(minAge) &&
        patientAge <= Number(maxAge) &&
        (selectedYear === "all" || patientYear.toString() === selectedYear) &&
        (status === "all" || patientStatus === status) &&
        (sex === "all" || patientSex === sex)
      );
    });
    setFilteredPatients(filtered);
  };

  const resetFilters = () => {
    setMinAge(initialState.minAge);
    setMaxAge(initialState.maxAge);
    setSex(initialState.sex);
    setSelectedYear(initialState.selectedYear);
    setStatus(initialState.status);
    setFilteredPatients(patients);
  };

  return {
    minAge,
    setMinAge,
    maxAge,
    setMaxAge,
    sex,
    setSex,
    selectedYear,
    setSelectedYear,
    status,
    setStatus,
    filteredPatients,
    applyFilters,
    resetFilters,
  };
};
