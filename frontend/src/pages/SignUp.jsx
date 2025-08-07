import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import signUpValidationSchema from "../utils/signUpValidationSchemas";
import Button from "../components/Button";

function SignUp() {
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = (values) =>{
        alert("Value submitted!")
    }

    return (
        <div classname=" mt-10 ">
            <h2 className="text-xl font-bold text-primary mb-4 ">Sign Up</h2>
            <Formik initialValues={initialValues} validationSchema={signUpValidationSchema} onSubmit={handleSubmit}>
                <Form>
                    <InputField name="username" label="User Name" type="text" />
                    <InputField name="email" label="Email" type="email" />
                    <InputField name="password" label="Password" type="password" />
                    <InputField name="confirmPassword" label="Confirm Password" type="password" />
                    <Button className="w-full xl:w-[400px] py-3 rounded-lg " type="submit">Sign Up</Button>
                </Form> 
            </Formik>
        </div>

    )
}

export default SignUp;