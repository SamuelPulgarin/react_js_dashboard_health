import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Plus,
  Download,
  Edit,
  Trash2,
} from "lucide-react";
import { Patient } from "../../interfaces/patient.interfaces";
import { useNavigate } from "react-router-dom";
import { useFetchPatients } from "../../hooks/patients/useFetchPatients";

const itemsPerPageOptions = [10, 20, 30, 40, 50];

const patients = Array.from({ length: 50 }, (_, i) => ({
    $id: `patient_${i + 1}`,
    name: `Usuario ${i + 1}`,
    last_name: `Apellido ${i + 1}`,
    email: `usuario${i + 1}@example.com`,
    phone: `+1-555-${Math.floor(1000 + Math.random() * 9000)}`,
    test_result: ['Positivo', 'Negativo', 'Pendiente'][Math.floor(Math.random() * 3)],
    age: Math.floor(18 + Math.random() * 63), // Rango de edades entre 18 y 80
    healthAmbassadors: {
      name: ['Ambassador 1', 'Ambassador 2', 'Ambassador 3'][Math.floor(Math.random() * 3)],
    },
  }));
  
  // Imprime los pacientes generados para verificar
  console.log(patients);
  
  export default patients;
  

export const BeneficiariesTable = () => {
/*   const { patients, loading } = useFetchPatients(); */
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All"); // Filtro de roles
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const results = patients.filter((patient) => {
      const matchesSearchTerm =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRoleFilter =
        roleFilter === "All" || patient.role === roleFilter;
      return matchesSearchTerm && matchesRoleFilter;
    });
    setFilteredPatients(results);
    setCurrentPage(1); // Reseteamos la página al filtrar
  }, [searchTerm, roleFilter, patients]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleRowClick = (id: string) => {
    navigate(`/patient/${id}`);
  };

  const exportToExcel = () => {
    // Lógica para exportar a Excel
    console.log("Exportando a Excel...");
  };

  return (
    <div className="container mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tabla de Beneficiarios</h1>
        <div className="space-x-2">
          <Button onClick={() => console.log("Crear nuevo usuario")}>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
          </Button>
          <Button onClick={exportToExcel}>
            <Download className="mr-2 h-4 w-4" /> Exportar a Excel
          </Button>
        </div>
      </div>

      {/* Filtros de búsqueda y rol */}
      <div className="flex justify-between items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar beneficiarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Filtro de roles */}
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Todos los roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla de beneficiarios */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Resultado de prueba</TableHead>
            <TableHead>Edad</TableHead>
            <TableHead>Health Ambassador</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((patient) => (
            <TableRow
              key={patient.$id}
              onClick={() => handleRowClick(patient.$id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TableCell className="font-medium">
                {patient.name} {patient.last_name}
              </TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.test_result}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.healthAmbassadors?.name}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Eliminar</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginación */}
      <div className="flex justify-between items-center">
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filas por página" />
          </SelectTrigger>
          <SelectContent>
            {itemsPerPageOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option} filas
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
