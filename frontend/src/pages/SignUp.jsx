import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import signUpValidationSchema from "../utils/signUpValidationSchemas";
import Button from "../components/Button";
import publicAxios from "../axios/publicAxios";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate()

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values) =>{
        try{
            const response = await publicAxios.post('/users/register/',values)
            navigate('/user/dashboard')
        }catch(error){
            console.error("Register new user error:",error)
        }
    }

    return (
        <div className=" mt-10 ">
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