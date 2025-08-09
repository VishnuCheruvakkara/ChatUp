import { Routes, Route } from 'react-router-dom'
import LandingLayout from '../layout/LandingLayout'
import LandingPage from '../pages/LandingPage'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

function PublicRoutes() {
    return (
        <Routes>
            <Route element={<LandingLayout/>}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Route>
        </Routes>
    )
}

export default PublicRoutes