import { Patient } from '../interfaces/patient.interfaces';
import * as XLSX from "xlsx";
import { formatDate } from "./form.utils";

export const filterPatients = (
  patients: Patient[],
  searchTerm: string,
  roleFilter: string
): Patient[] => {
  return patients.filter((patient) => {
    const matchesSearchTerm =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoleFilter = roleFilter === "All" || patient.role === roleFilter;
    return matchesSearchTerm && matchesRoleFilter;
  });
};

export const paginateItems = (
  items: Patient[],
  currentPage: number,
  itemsPerPage: number
): Patient[] => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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