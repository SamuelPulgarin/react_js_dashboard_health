import toast from "react-hot-toast";
import { deletePatient } from "../../services/patient.services";
import { useConfirmDialog } from "../common/useConfirmDialog";
import { usePatientStore } from "../../store/patient.store";

export const useBeneficiarieHandlers = () => {
    const { deletePatientById } = usePatientStore();
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

                deletePatientById(id);
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
};
