import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { filterPatients, paginateItems } from "../../utils/beneficiariaries.tils";
import { usePatientStore } from "../../store/patient.store";
import { useFetchPatients } from "../patients/useFetchPatients";

export const useBeneficiarieTable = () => {
    const { loading } =  useFetchPatients();
    const { patients } = usePatientStore()
    const [filteredPatients, setFilteredPatients] = useState(patients);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const results = filterPatients(patients, searchTerm, roleFilter);
        setFilteredPatients(results);
        setCurrentPage(1);
    }, [searchTerm, roleFilter, patients]);

    const currentItems = paginateItems(filteredPatients, currentPage, itemsPerPage);

    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleRowClick = (id: string) => {
        navigate(`/patient/${id}`);
    };

    return {
        filteredPatients,
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        currentPage,
        itemsPerPage,
        setItemsPerPage,
        currentItems,
        totalPages,
        paginate,
        handleRowClick,
        loading,
    };
}
