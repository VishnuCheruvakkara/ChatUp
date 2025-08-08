import {useState} from 'react';
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import signInValidationSchema from '../utils/signInValidationSchema';
import Button from "../components/Button";
import publicAxios from "../axios/publicAxios";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { useToast } from '../components/Toast';

function SignIn() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const {showToast} = useToast();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await publicAxios.post('/users/login/', values)
            showToast("Login successful!", "success");
            navigate('/user/dashboard')
        } catch (error) {
            console.error("Sign in user account error:", error)
            showToast("Login failed. Email or password is incorrect.", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <PageLoader/>}
            <div className=" mt-10 ">
                <h2 className="text-xl font-bold text-primary mb-4 ">Sign In</h2>
                <Formik initialValues={initialValues} validationSchema={signInValidationSchema} onSubmit={handleSubmit}>
                    <Form>
                        <InputField name="email" label="Email" type="email" />
                        <InputField name="password" label="Password" type="password" />
                        <Button className="w-full xl:w-[400px] py-3 rounded-lg " type="submit">Sign In</Button>
                    </Form>
                </Formik>
            </div>
        </>

    )
}

export default SignIn;