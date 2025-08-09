import {Routes,Route} from 'react-router-dom'
import UserDashboardLayout from '../layout/userDashboardLayout'
function AuthenticatedUserRoutes(){
    return(
        <Routes>
            <Route path="/dashboard" element={<UserDashboardLayout/>} />
        </Routes>
    )
}

export default AuthenticatedUserRoutes