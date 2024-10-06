import { CgSpinnerTwoAlt } from "react-icons/cg";

export const Spinner = () => {
    return (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
            <div className="flex justify-center items-center mt-[50vh]">
                <CgSpinnerTwoAlt className="text-primary animate-spin text-6xl" />
            </div>
        </div>
    )
}
