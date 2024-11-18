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
import { clearFilters, exportToExcel } from "../../utils/beneficiariaries.tils";
import { FiltersDropdown } from './FiltersDropdown';

const itemsPerPageOptions = [10, 20, 30, 40, 50];

export const BeneficiariesTable = () => {
  const {
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
  } = useBeneficiarieTable();

  const { handleDelete, isModalOpen, closeModal, handleConfirm } = useBeneficiarieHandlers();

  // console.log(filteredPatients)
  // console.log(currentItems)

  return (
    <div className="container mx-auto p-6 space-y-4">
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Beneficiaries Table</h1>
              <div className="space-x-2">
                <Link to={'/register'}>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> New User
                  </Button>
                </Link>
                <Button onClick={() => exportToExcel(filteredPatients)}>
                  <Download className="mr-2 h-4 w-4" /> Export to Excel
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex justify-between items-center space-x-4">
              <FiltersDropdown
                testResult={testResultFilter}
                setTestResult={setTestResultFilter}
                gender={genderFilter}
                setGender={setGenderFilter}
                ageRange={ageRange}
                setAgeRange={setAgeRange}
                hasChildren={hasChildrenFilter}
                setHasChildren={setHasChildrenFilter}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                clearFilters={() => clearFilters({
                  setSearchTerm,
                  setTestResultFilter,
                  setGenderFilter,
                  setAgeRange,
                  setHasChildrenFilter,
                  setStartDate,
                  setEndDate,
                })}
              />

              {/* Search Terms */}
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search beneficiaries..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Test Result</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Health Ambassador</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && Array.isArray(filteredPatients) && filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
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
                          handleEditClick(patient.$id)
                        }}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.stopPropagation();
                          handleDelete(patient.$id);
                        }}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      {loading ? "Loading..." : "No beneficiaries found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-between items-center">
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value: string) => setItemsPerPage(Number(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Rows per page" />
                </SelectTrigger>
                <SelectContent>
                  {itemsPerPageOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option} rows
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => paginate(1)} disabled={currentPage === 1}>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button variant="outline" size="icon" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>


            {/* Confirmation Modal */}
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
