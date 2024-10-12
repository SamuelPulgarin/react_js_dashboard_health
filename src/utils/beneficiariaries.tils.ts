import { Patient } from "../interfaces/patient.interfaces";

// Función para filtrar pacientes por términos de búsqueda y roles
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

// Función para manejar la paginación
export const paginateItems = (
  items: Patient[],
  currentPage: number,
  itemsPerPage: number
): Patient[] => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return items.slice(indexOfFirstItem, indexOfLastItem);
};
