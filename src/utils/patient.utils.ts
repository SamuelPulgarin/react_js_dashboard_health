import * as XLSX from "xlsx";
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../interfaces/registration.interfaces';
import { Patient } from '../interfaces/patient.interfaces';
import { uploadTemplateArray } from "@/data/uploadTemplate";

export const prefillPatientData = (patient: Patient, setValue: UseFormSetValue<FormValues>) => {
  const formatDate = (dateString: string) => new Date(dateString).toISOString().split('T')[0];

  setValue("name", patient.name);
  setValue("last_name", patient.last_name);
  setValue("age", patient.age);
  setValue("dob", formatDate(patient.dob));
  setValue("email", patient.email);
  setValue("phone", patient.phone);
  setValue("full_address", patient.full_address);
  setValue("linkage_date", formatDate(patient.linkage_date));
  setValue("hiv_test", formatDate(patient.hiv_test));
  setValue("social_security", patient.social_security);
  setValue("test_result", patient.test_result);
  setValue("best_contact_hour", patient.best_contact_hour);
  setValue("sex", patient.sex);
  setValue("status", patient.status);
  setValue("member_id", patient.member_id);
  setValue("insurer", patient.insurer);
};

export const downloadPatientsTemplate = () => {
  
  const worksheet = XLSX.utils.json_to_sheet(uploadTemplateArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "PatientsTemplate");

  XLSX.writeFile(workbook, "PatientsTemplate.xlsx");
};