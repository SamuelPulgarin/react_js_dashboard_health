import React, { useEffect, useState, useCallback } from "react";
import { fetchPatientsWithRelationsAndFilters } from "../../services/patient.services";
import { usePatientStore } from "../../store/patient.store";

interface Props {
  currentPage?: number;
  itemsPerPage?: number;
  hasActiveFilters?: boolean;
  testResult?: string;
  gender?: string;
  ageRange?: { min: number; max: number };
  hasChildren?: boolean;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}

export const useFetchPatients = ({
  currentPage = 1,
  itemsPerPage = 10,
  hasActiveFilters = false,
  testResult = "",
  gender = "",
  ageRange = null,
  hasChildren = null,
  startDate = undefined,
  endDate = undefined,
}: Props = {}) => {
  const { setPatients, patients } = usePatientStore();
  const [loading, setLoading] = useState(false);
  const [totalPatients, setTotalPatients] = useState(0);

  // Memorizamos los filtros para evitar cambios de referencia innecesarios.
  const filters = React.useMemo(
    () => ({
      testResult: testResult ? testResult.toLowerCase() : "",
      gender: gender ? gender.toLowerCase() : "",
      ageRange,
      hasChildren,
      startDate,
      endDate,
    }),
    [testResult, gender, ageRange, hasChildren, startDate, endDate]
  );

  // Función `getPatients` como `useCallback` para mantener la misma referencia.
  const getPatients = useCallback(async () => {
    setLoading(true);
    const offset = (currentPage - 1) * itemsPerPage;
    console.log(offset);
    console.log(itemsPerPage);
    const { patients: fetchedPatients, total } = await fetchPatientsWithRelationsAndFilters(
      itemsPerPage,
      offset,
      hasActiveFilters,
      filters
    );
    console.log(patients);
    console.log(total)
    setPatients(fetchedPatients);
    setTotalPatients(total);
    setLoading(false);
  }, [filters, currentPage, itemsPerPage, hasActiveFilters, setPatients]);

  // Ejecutar `getPatients` solo cuando sea necesario.
  useEffect(() => {
    getPatients();
  }, [getPatients]);

  return {
    patients,
    totalPatients,
    loading,
    getPatients,
  };
};
