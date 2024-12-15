import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { paginateItems } from "../../utils/beneficiariaries.tils";
import { useFetchPatients } from "../patients/useFetchPatients";

export const useBeneficiarieTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [testResultFilter, setTestResultFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [ageRange, setAgeRange] = useState<{ min: number; max: number } | null>(null);
  const [hasChildrenFilter, setHasChildrenFilter] = useState<boolean | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const hasActiveFilters = Boolean(
    searchTerm ||
      testResultFilter !== "All" ||
      genderFilter !== "All" ||
      ageRange ||
      hasChildrenFilter !== null ||
      startDate ||
      endDate
  );

  const {
    patients,
    totalPatients,
    loading,
    getPatients,
  } = useFetchPatients({
    currentPage,
    itemsPerPage,
    hasActiveFilters,
    testResult: testResultFilter,
    gender: genderFilter,
    ageRange,
    hasChildren: hasChildrenFilter,
    startDate,
    endDate,
    searchTerm
  });

  const navigate = useNavigate();

  const [filteredPatients, setFilteredPatients] = useState(patients);

  // Filtrar pacientes en base al término de búsqueda.
  useEffect(() => {
      setFilteredPatients(patients);
  }, [patients]);

  // Función para obtener pacientes, memorizada para evitar ciclos.
  // const fetchPatients = useCallback(() => {
  //   getPatients();
  //   // if(hasActiveFilters) setCurrentPage(1);
  // }, [getPatients]);

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  const totalPages = Math.ceil(totalPatients / itemsPerPage);

  console.log(patients)
  console.log(itemsPerPage)

  console.log("Pagina", currentPage)

  const currentItems = useMemo(() => {
    return paginateItems(filteredPatients, currentPage, itemsPerPage);
  }, [filteredPatients, currentPage, itemsPerPage]);
  

  // Manejar la paginación.
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
