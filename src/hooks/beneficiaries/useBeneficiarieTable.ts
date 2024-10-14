import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { filterPatients, paginateItems } from "../../utils/beneficiariaries.tils";
import { usePatientStore } from "../../store/patient.store";
import { useFetchPatients } from "../patients/useFetchPatients";

export const useBeneficiarieTable = () => {
  const { loading } = useFetchPatients();
  const { patients } = usePatientStore();
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [searchTerm, setSearchTerm] = useState("");
  const [testResultFilter, setTestResultFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [ageRange, setAgeRange] = useState<{ min: number; max: number } | null>(null);
  const [hasChildrenFilter, setHasChildrenFilter] = useState<boolean | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

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
    setCurrentPage(1); // Reset page after filtering
  }, [
    searchTerm,
    testResultFilter,
    genderFilter,
    ageRange,
    hasChildrenFilter,
    patients,
    startDate,
    endDate
  ]);

  const currentItems = paginateItems(filteredPatients, currentPage, itemsPerPage);
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
    currentItems,
    totalPages,
    paginate,
    handleRowClick,
    handleEditClick,
    loading,
  };
};
