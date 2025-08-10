import { useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import createRooValidationSchema from "../utils/createRooValidationSchema";
import Button from "../components/Button";
import userAxios from "../axios/userAuthenticationInterceptor";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import { useDispatch } from "react-redux";
import SingleLoader from "../components/SingleLoader";

function CreateRoom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const initialValues = {
        name: '',
        description: '',
    }

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await userAxios.post("/chat/create-chat-room/", values);
            showToast("Chat room created.", "success")
            navigate('/user/dashboard/my-rooms')
        } catch (error) {
            console.error("Create chat room error.", error)
            showToast("Error while creating chat room", "error")
        } finally {
            setLoading(true);
        }
    }

    return (
        <>
            {loading ? (
                <SingleLoader />
            ) : (
                <div className=" mt-5 sm:w-[400px] w-full">
                    <h2 className="text-xl font-bold text-primary mb-4 text-center">Create Chat Room</h2>
                    <Formik initialValues={initialValues} validationSchema={createRooValidationSchema} onSubmit={handleSubmit}>
                        <Form>
                            <InputField name="name" label="Room Name" type="text" />
                            <InputField name="description" label="Description" as="textarea" rows="4" />
                            <Button className="w-full xl:w-[400px] py-3 rounded-lg " type="submit">Create Room</Button>
                        </Form>
                    </Formik>
                </div>
            )}
        </>
    )
}

export default CreateRoom;