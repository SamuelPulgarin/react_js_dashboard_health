import { useEffect, useState } from 'react';
import { Patient } from '../../interfaces/patient.interfaces';
import { fetchPatientsWithFilters } from '../../services/patient.services';

interface FilterOptions {
  testResult?: string;
  gender?: string;
  ageRange?: { min: number; max: number } | null;
  hasChildren?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const useFilteredPatients = (initialFilters: FilterOptions = {}) => {
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const fetchFilteredPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPatientsWithFilters(filters);
      setFilteredPatients(data);
    } catch (err) {
      setError('Error al cargar los pacientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredPatients();
  }, [filters]);

  return { filteredPatients, loading, error, filters, setFilters };
};