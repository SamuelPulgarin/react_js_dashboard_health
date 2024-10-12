import toast from "react-hot-toast";
import { deletePatient, fetchPatientsWithRelations } from "../../services/patient.services";
import { useConfirmDialog } from "../common/useConfirmDialog";
import { useFetchPatients } from "../patients/useFetchPatients";

export const useBeneficiarieHandlers = () => {
    const { setPatients } = useFetchPatients();
    const { isModalOpen, openModal, closeModal, handleConfirm } = useConfirmDialog();

    const handleDelete = (id: string) => {
        openModal(async () => {
            try {
                const response = await deletePatient(id);
                if (!response) {
                    toast.error('Error when trying to remove the patient');
                    return;
                }

                toast.success('Successful patient removal');

                const updatedPatients = await fetchPatientsWithRelations();
                setPatients(updatedPatients);
            } catch (error) {
                toast.error('An unexpected error occurred');
            }
        });
    };
    

    return {
        handleDelete,
        isModalOpen,
        closeModal,
        handleConfirm,
    };
}
