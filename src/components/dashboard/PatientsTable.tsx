import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useFetchPatients } from "../../hooks/patients/useFetchPatients";
import { Spinner } from '../common/Spinner';

export const PatientsTable = () => {

    const { patients, loading } = useFetchPatients();

    const handleEdit = (id: string) => {
        console.log(`Editando paciente con id ${id}`);
    };

    const handleDelete = (id: string) => {
        //setPatients(patients.filter((patient) => patient.$id !== id));
        console.log(`Paciente con id ${id} eliminado`);
    };

    const handleRowClick = (id: string) => {
        console.log(`Paciente con id ${id} eliminado`);
    }

    console.log(patients)

    return (
        <div className="container mx-auto py-10">
            {
                loading ? (
                    <Spinner />
                ) : (
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
                            {patients.map((patient) => (
                                <TableRow
                                    key={patient.$id}
                                    onClick={() => handleRowClick(patient.$id)}
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    <TableCell className="font-medium">{patient.name} {patient.last_name}</TableCell>
                                    <TableCell>{patient.email}</TableCell>
                                    <TableCell>{patient.phone}</TableCell>
                                    <TableCell>{patient.test_result}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.healthAmbassadors?.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
            }
        </div>
    );
};
