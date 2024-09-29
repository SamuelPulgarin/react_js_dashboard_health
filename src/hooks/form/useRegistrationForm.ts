import { useState } from "react"
import { Child } from '../../interfaces/registration.interfaces';

export const useRegistrationForm = () => {

    const [children, setChildren] = useState<Child[]>([])

    const addChild = () => {
        setChildren([...children, { name: '', dob: '', sex: '' }])
    }
    
    const updateChild = (index: number, field: keyof Child, value: string) => {
        const updatedChildren = children.map((child, i) => {
            if (i === index) {
                return { ...child, [field]: value }
            }
            return child
        })
        setChildren(updatedChildren)
    }
    
    const removeChild = (index: number) => {
        setChildren(children.filter((_, i) => i !== index))
    }

    return {
        children,
        addChild,
        updateChild,
        removeChild
    }
} 