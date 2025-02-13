import * as XLSX from "xlsx";
import { Patient } from '../interfaces/patient.interfaces';
import { formatDate } from "./form.utils";

export const filterPatients = (
  patients: Patient[],
  searchTerm: string,
  testResultFilter: string,
  genderFilter: string,
  ageRange: { min: number; max: number } | null,
  hasChildrenFilter: boolean | null,
  startDate: Date | null,
  endDate: Date | null
): Patient[] => {
  return patients.filter((patient) => {
    const matchesSearchTerm =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.test_result.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTestResultFilter =
      testResultFilter.toLowerCase() === "all" || patient.test_result === testResultFilter.toLowerCase();

    const matchesGenderFilter = genderFilter.toLowerCase() === "all" || patient.sex === genderFilter.toLowerCase();

    const matchesAgeFilter =
      !ageRange || (patient.age >= ageRange.min && patient.age <= ageRange.max);

    const matchesHasChildrenFilter =
      hasChildrenFilter === null || (hasChildrenFilter ? patient.children.length > 0 : patient.children.length === 0);

      const patientDate = new Date(patient.linkage_date);
      const matchesDate =
        (!startDate || patientDate >= startDate) && (!endDate || patientDate <= endDate);

    return (
      matchesSearchTerm &&
      matchesTestResultFilter &&
      matchesGenderFilter &&
      matchesAgeFilter &&
      matchesHasChildrenFilter &&
      matchesDate
    );
  });
};

export const paginateItems = (
  items: Patient[],
  currentPage: number,
  itemsPerPage: number
): Patient[] => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage > totalPages) {
    return [];
  }

  return items.slice(indexOfFirstItem, indexOfLastItem);
};



export const exportToExcel = (filteredPatients: Patient[]) => {

  const data: any[] = [];

  filteredPatients.forEach((patient) => {

    const patientData: any = {
      "First Name": patient.name,
      "Last Name": patient.last_name,
      "Age": patient.age,
      "Sex": patient.sex,
      "Date of Birth": formatDate(patient.dob),
      "Email": patient.email,
      "Full Address": patient.full_address,
      "Zip Code": patient.zip_code || "N/A",
      "HIV Test": formatDate(patient.hiv_test) || "N/A",
      "Linkage Date": formatDate(patient.linkage_date) || "N/A",
      "Phone": patient.phone,
      "Social Security": patient.social_security || "N/A",
      "Test Result": patient.test_result,
      "Additional Info": patient.aditional_info || "N/A",
      "Best Contact Time": patient.best_contact_hour || "N/A",

      "Health Ambassador Name": patient.healthAmbassadors?.name || "N/A",
    };

    patient.children.forEach((child, index) => {
      patientData[`Full Name (Child ${index + 1})`] = child.full_name;
      patientData[`Date of Birth (Child ${index + 1})`] = formatDate(child.dob);
      patientData[`Sex (Child ${index + 1})`] = child.sex;
    });

    data.push(patientData);
  });

  // Create a worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Create a workbook and add the sheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Beneficiaries");

  // Export to Excel file
  XLSX.writeFile(wb, "beneficiaries.xlsx");
};


interface ClearFiltersProps {
  setSearchTerm: (value: string) => void;
  setTestResultFilter: (value: string) => void;
  setGenderFilter: (value: string) => void;
  setAgeRange: (range: { min: number, max: number }) => void;
  setHasChildrenFilter: (value: boolean | null) => void;
  setStartDate: (value: Date | null) => void;
  setEndDate: (value: Date | null) => void;
}
export const clearFilters = ({
  setSearchTerm,
  setTestResultFilter,
  setGenderFilter,
  setAgeRange,
  setHasChildrenFilter,
  setStartDate,
  setEndDate,
}: ClearFiltersProps) => {
  setSearchTerm("");
  setTestResultFilter("All");
  setGenderFilter("All");
  setAgeRange({ min: 0, max: 90 });
  setHasChildrenFilter(null);
  setStartDate(null);
  setEndDate(null);
};


interface SetFiltersProps {
  testResult: string;
  setTestResult: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  ageRange: { min: number; max: number };
  setAgeRange: (range: { min: number; max: number }) => void;
  hasChildren: boolean;
  setHasChildren: (value: boolean) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

export const setFilters = ({
  testResult,
  setTestResult,
  gender,
  setGender,
  ageRange,
  setAgeRange,
  hasChildren,
  setHasChildren,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: SetFiltersProps) => {
  setTestResult(testResult);
  setGender(gender);
  setAgeRange(ageRange);
  setHasChildren(hasChildren);
  setStartDate(startDate);
  setEndDate(endDate);
};

