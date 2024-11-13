import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { filterPatients, paginateItems } from "../../utils/beneficiariaries.tils";
import { usePatientStore } from "../../store/patient.store";
import { useFetchPatients } from "../patients/useFetchPatients";

export const useBeneficiarieTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { patients, totalPatients, loading } = useFetchPatients(currentPage, itemsPerPage);
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [searchTerm, setSearchTerm] = useState("");
  const [testResultFilter, setTestResultFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [ageRange, setAgeRange] = useState<{ min: number; max: number } | null>(null);
  const [hasChildrenFilter, setHasChildrenFilter] = useState<boolean | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const hasActiveFilters = Boolean(
    searchTerm || testResultFilter !== "All" || genderFilter !== "All" || ageRange || hasChildrenFilter !== null || startDate || endDate
  );

  const filters = { searchTerm, testResultFilter, genderFilter, ageRange, hasChildrenFilter, startDate, endDate };
  const prevFilters = useRef(filters);
  
  useEffect(() => {
    const results = filterPatients(
      patients,
      searchTerm,
      testResultFilter,
      genderFilter,
      ageRange,
      hasChildrenFilter,
      startDate,
      endDate
    );
    setFilteredPatients(results);
  
    // Verificar que los filtros hayan cambiado
    if (JSON.stringify(prevFilters.current) !== JSON.stringify(filters)) {
      setCurrentPage(1);
      prevFilters.current = filters;
    }
  }, [
    searchTerm,
    testResultFilter,
    genderFilter,
    ageRange,
    hasChildrenFilter,
    patients,
    startDate,
    endDate,
  ]);

// Calcular el total de páginas en base al número de pacientes filtrados si hay filtros activos
const totalPages = useMemo(() => {
  const totalItems = hasActiveFilters ? filteredPatients.length : totalPatients;
  return Math.ceil(totalItems / itemsPerPage);
}, [filteredPatients.length, totalPatients, itemsPerPage, hasActiveFilters]);

// Paginación de los pacientes en función de si hay filtros activos o no
const currentItems = useMemo(() => {
  const items = hasActiveFilters ? filteredPatients : patients;
  return paginateItems(items, currentPage, itemsPerPage);
}, [filteredPatients, patients, currentPage, itemsPerPage, hasActiveFilters]);

  // filteredPatients.length 

  // console.log(`Total patients: ${totalPatients}`)
  // console.log(`items por page: ${itemsPerPage}`)
  // console.log(`total Pages: ${totalPages}`);
  // console.log(`patients: `, patients)
  // console.log(`filtered patients length: ${filteredPatients.length}`);
  // console.log(`Active filter?: ${hasActiveFilters}`)

  //const totalPages = Math.ceil(totalPatients / itemsPerPage);

  //const currentItems = paginateItems(hasActiveFilters ? patients : filteredPatients, currentPage, itemsPerPage);

  // Paginación de `filteredPatients` o `patients`
  //const currentItems = paginateItems(filteredPatients, currentPage, itemsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleRowClick = (id: string) => {
    navigate(`/patient/${id}`);
  };

  const handleEditClick = (id: string) => {
    navigate(`/update-patient/${id}`);
  };

  return {
    filteredPatients,
    searchTerm,
    setSearchTerm,
    testResultFilter,
    setTestResultFilter,
    genderFilter,
    setGenderFilter,
    ageRange,
    setAgeRange,
    hasChildrenFilter,
    setHasChildrenFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    paginate,
    handleRowClick,
    handleEditClick,
    currentItems,
    loading,
  };
};
