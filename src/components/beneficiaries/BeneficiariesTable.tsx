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

import { Spinner } from "../common/Spinner";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmDialog";
import { useBeneficiarieHandlers } from "../../hooks/beneficiaries/useBeneficiarieHandlers";
import { useBeneficiarieTable } from "../../hooks/beneficiaries/useBeneficiarieTable";

const itemsPerPageOptions = [10, 20, 30, 40, 50];

export const BeneficiariesTable = () => {
  const {
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
  } = useBeneficiarieTable();

  const { handleDelete, isModalOpen, closeModal, handleConfirm } = useBeneficiarieHandlers();

  const exportToExcel = () => {
    // Lógica para exportar a Excel
    console.log("Exportando a Excel...");
  };

  return (
    <div className="container mx-auto p-6 space-y-4">
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Tabla de Beneficiarios</h1>
              <div className="space-x-2">
                <Link to={'/register'}>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
                  </Button>
                </Link>
                <Button onClick={() => console.log("Exportando a Excel...")}>
                  <Download className="mr-2 h-4 w-4" /> Exportar a Excel
                </Button>
              </div>
            </div>

            {/* Filtros */}
            <div className="flex justify-between items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar beneficiarios..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
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

            {/* Tabla */}
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
                {!loading && currentItems.length > 0 ? (
                  currentItems.map((patient) => (
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
                        <Button variant="ghost" size="icon" onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.stopPropagation();
                          console.log('editar')
                        }}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.stopPropagation();
                          handleDelete(patient.$id);
                        }}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      {loading ? "Cargando..." : "No se encontraron beneficiarios"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Paginación */}
            <div className="flex justify-between items-center">
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value: string) => setItemsPerPage(Number(value))}
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

            {/* Modal de confirmación */}
            <ConfirmationModal
              isOpen={isModalOpen}
              onConfirm={handleConfirm}
              onCancel={closeModal}
            />
          </>
        )
      }
    </div >
  );
};
