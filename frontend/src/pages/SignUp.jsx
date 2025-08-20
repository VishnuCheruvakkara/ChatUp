import { useState } from 'react';
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import signUpValidationSchema from "../utils/signUpValidationSchemas";
import Button from "../components/Button";
import publicAxios from "../axios/PublicAxios";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { useToast } from '../components/Toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await publicAxios.post('/users/register/', values)
            dispatch(setUser(response.data.user))
            navigate('/user/dashboard')
            showToast('Account created successfully.', "success")
        } catch (error) {
            console.error("Register new user error:", error)
            const nonFieldErrors = error.response?.data?.non_field_errors;
            if (nonFieldErrors && nonFieldErrors.length > 0) {
                showToast(nonFieldErrors[0], "error"); // show the first error message
            } else {
                showToast('Try again. Error happened during sign up.', "error");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <PageLoader />}
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
                <p className="text-sm mt-4 font-semibold text-gray-600">Allready have an account, <span onClick={() => navigate('/sign-in')} className="text-primary cursor-pointer hover:text-accent transition duration-200 ease-in-out"> Sign In ? </span></p>
            </div>
        </>

    )
}

export default SignUp;