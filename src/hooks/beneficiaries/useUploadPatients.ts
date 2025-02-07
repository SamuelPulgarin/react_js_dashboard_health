import { HealthAmbassador } from "@/interfaces/registration.interfaces";
import { fetchHealthAmbassadors, uploadPatientsToDatabase } from "@/services/registration.services";
import { formatTime, parseChildren } from "@/utils/form.utils";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export const useUploadPatients = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [healthAmbassadors, setHealthAmbassadors] = useState<HealthAmbassador[]>([]);

  useEffect(() => {
    const loadHealthAmbassadors = async () => {
      const ambassadors = await fetchHealthAmbassadors();

      const mappedAmbassadors = ambassadors.map((doc) => {
        const patient: HealthAmbassador = {
          $id: doc.$id,
          $collectionId: doc.$collectionId,
          $databaseId: doc.$databaseId,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          $permissions: doc.$permissions,
          name: doc.name || "",
        };
        return patient;
      });
      setHealthAmbassadors(mappedAmbassadors);
    };

    loadHealthAmbassadors();
  }, []);

  const uploadPatients = async (file: any) => {
    setLoading(true);
    setError(null);

    try {
      // Leer el archivo Excel
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const updatedPatients = sheetData.map((patient: any) => {
        // Buscar el ID del health ambassador en el array de embajadores
        const healthAmbassador = healthAmbassadors.find(
          (ambassador) => ambassador.name.trim().toLowerCase() === patient["HEALTH AMBASSADOR"].trim().toLowerCase()
        );

        return {
          name: patient["NAME"] || "",
          last_name: patient["LAST NAME"] || "",
          email: patient["EMAIL"] || "",
          phone: patient["PHONE"] || "",
          age: Number(patient["AGE"]) || 0,
          dob:formatTime(patient["D.O.B"]),
          sex: patient["SEX"] || "",
          linkage_date: formatTime(patient["LINKAGE DATE"]),
          full_address: patient["FULL ADDRESS"] || "",
          hiv_test: patient["DATE OF HIV TEST"] || "",
          social_security: patient["SOCIAL SECURITY"] || "",
          aditional_info: patient["ADDITIONAL INFO"] || "",
          test_result: patient["RESULT OF THE TEST"] || "",
          insurer: patient["INSURER"] || "",
          member_id: patient["MEMBER ID"] || "",
          status: patient["STATUS"] || "",
          // best_contact_hour: patient["BEST CONTACT HOUR"] || "",
          healthAmbassadors: healthAmbassador ? healthAmbassador.$id : null, // Almacenar solo el ID
          children: parseChildren(patient["CHILDREN UNDER 18 NAME D.O.B SEX"]),
        };
      });

      console.log(updatedPatients);

      // Enviar los datos a la base de datos
      const response = await uploadPatientsToDatabase(updatedPatients);
      setLoading(false);

      if (!response.success) {
        throw new Error("Failed to upload patients to the database.");
      }

      return { success: true };
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
      setLoading(false);
      return { success: false };
    }
  };

  return { uploadPatients, loading, error };
};
