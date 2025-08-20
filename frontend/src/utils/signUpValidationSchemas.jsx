import * as Yup from "yup";

const signUpValidationSchema = Yup.object({
    username: Yup.string().matches(/^(?=.*[A-Za-z])[A-Za-z0-9_]+$/, 'Username must include letters, numbers, and can contain underscore').required('Name is required'),
    email: Yup.string().email("Invalid email").required('Email is required'),
    password: Yup.string().min(6,'Password must be at least 6 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,'Password must include uppercase, lowercase, number, and special character').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')],'Passwords must match').required('Please confirm your password'),
});

export default signUpValidationSchema