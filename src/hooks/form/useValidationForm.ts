export const useValidationForm = () => {
    const NAME = {
        required: {
            value: true,
            message: "Name is required",
        },
        minLength: {
            value: 2,
            message: "Name must be at least 2 characters long",
        },
        maxLength: {
            value: 30,
            message: "Name cannot exceed 30 characters",
        },
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Name can only contain letters",
        },
    };

    const LAST_NAME = {
        required: {
            value: true,
            message: "Last name is required",
        },
        minLength: {
            value: 2,
            message: "Last name must be at least 2 characters long",
        },
        maxLength: {
            value: 30,
            message: "Last name cannot exceed 30 characters",
        },
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Last name can only contain letters",
        },
    };

    const EMAIL = {
        required: {
            value: true,
            message: "Email is required",
        },
        pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Must be a valid email address",
        },
    };

    const PHONE = {
        required: {
            value: true,
            message: "Phone number is required",
        },
        pattern: {
            value: /^[0-9]{10}$/,
            message: "Phone number must be 10 digits",
        },
    };

    const AGE = {
        required: {
            value: true,
            message: "Age is required",
        },
        min: {
            value: 1,
            message: "Minimum age is 1",
        },
        max: {
            value: 120,
            message: "Maximum age is 120",
        },
    };

    const DOB = {
        required: {
            value: true,
            message: "Date of birth is required",
        },
    };

    const SEX = {
        required: {
            value: true,
            message: "Sex is required",
        },
    };

    const FULL_ADDRESS = {
        required: {
            value: true,
            message: "Full address is required",
        },
        minLength: {
            value: 10,
            message: "Address must be at least 10 characters long",
        },
        maxLength: {
            value: 100,
            message: "Address cannot exceed 100 characters",
        },
    };

    const HIV_TEST_DATE = {
        required: {
            value: true,
            message: "HIV test date is required",
        },
    };

    const SOCIAL_SECURITY = {
        required: {
            value: true,
            message: "Social security number is required",
        },
        pattern: {
            value: /^[0-9]{9}$/,
            message: "Social security number must be 9 digits",
        },
    };

    const TEST_RESULT = {
        required: {
            value: true,
            message: "Test result is required",
        },
    };

    const BEST_CONTACT_HOUR = {
        required: {
            value: true,
            message: "Best contact hour is required",
        },
        pattern: {
            value: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
            message: "Must be a valid time (HH:MM)",
        },
    };

    return {
        NAME,
        LAST_NAME,
        EMAIL,
        PHONE,
        AGE,
        DOB,
        SEX,
        FULL_ADDRESS,
        HIV_TEST_DATE,
        SOCIAL_SECURITY,
        TEST_RESULT,
        BEST_CONTACT_HOUR,
    };
};
