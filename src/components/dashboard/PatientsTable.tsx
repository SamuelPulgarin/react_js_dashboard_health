import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Patient } from "../../interfaces/patient.interfaces";
import { useNavigate } from "react-router-dom";

interface Props {
    patients: Patient[];
}

export const PatientsTable = ({ patients }: Props) => {

    const navigate = useNavigate();

    const handleRowClick = (id: string) => {
        navigate(`/patient/${id}`)
    }

    return (
        <div className="container mx-auto py-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Test Result</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Health Ambassador</TableHead>
 {/*                        <TableHead className="text-right">Actions</TableHead> */}
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
