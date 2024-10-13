import { create } from "zustand";
import { Patient } from '../interfaces/patient.interfaces';


interface PatientStore {
    patients: Patient[];
    setPatients: (patients: Patient[]) => void;
    deletePatientById: (id: string) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
    patients: [],
    setPatients: (patients) => set({ patients }),
    deletePatientById: (id) =>
        set((state) => ({
            patients: state.patients.filter((patient) => patient.$id !== id),
        })),
}));
