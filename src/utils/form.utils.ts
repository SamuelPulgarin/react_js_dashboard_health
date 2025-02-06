export const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
};

export const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const [month, day, year] = dateString.split("/");
    return `${year}-${month}-${day}`; // Convertir a formato YYYY-MM-DD
};

export const parseChildren = (childrenData: string) => {
    if (!childrenData) return [];

    try {
        return childrenData.split(" /// ").map((child) => {
            const parts = child.trim().split(/\s+/);

            if (parts.length < 4) {
                console.warn("Formato de hijo incorrecto:", child);
                return null;
            }

            const dateIndex = parts.findIndex((part) => /\d{2}\/\d{2}\/\d{4}/.test(part));

            if (dateIndex === -1 || dateIndex < 1) {
                console.warn("No se encontró la fecha en el formato esperado:", child);
                return null;
            }

            // Extraer los datos correctamente
            const fullName = parts.slice(0, dateIndex).join(" ");
            const dob = formatDate(parts[dateIndex]);
            const sex = parts[dateIndex + 1].toLowerCase();
            const validSex = ["male", "female", "other"].includes(sex) ? sex : "other";
            const socialSecurity = parts.slice(dateIndex + 3).join(" ");

            return {
                full_name: fullName,
                dob: dob,
                sex: validSex,
                social_security: socialSecurity,
                // patients: patientId, // Relación con el paciente padre
            };
        }).filter(child => child !== null); // Filtrar valores nulos si hay errores
    } catch (error) {
        console.error("Error parsing children data:", error);
        return [];
    }
};
