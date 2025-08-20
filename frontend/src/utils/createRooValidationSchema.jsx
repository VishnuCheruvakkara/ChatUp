import * as Yup from "yup";

const createRoomValidationSchema = Yup.object({
    name: Yup.string().min(3, "Name must be at least 3 characters").max(25, "Name cannot exceed 25 characters").matches(/^(?=.*[A-Za-z])[A-Za-z0-9_ ]+$/, 'Room Name must contain letters and can only include letters, numbers, underscores, and spaces.').required("Name is required"),
    description: Yup.string().min(10, "Description must be at least 10 characters").max(250, "Description cannot exceed 250 characters").matches(/^(?=.*[A-Za-z])[A-Za-z0-9_ ]+$/, "Description must contain letters and can only include letters, numbers, underscores, and spaces").required("Description is required"),
})

export default createRoomValidationSchema;