import { Routes, Route } from 'react-router-dom'
import UserDashboardLayout from '../layout/userDashboardLayout'
// import pages 
import RoomPage from '../pages/RoomPage'
import CreateRoom from '../pages/CreateRoom'

function AuthenticatedUserRoutes() {
    return (
        <Routes>
            <Route path="/dashboard" element={<UserDashboardLayout />}>
                <Route index element={<RoomPage />} />
                <Route path="create-room" element={<CreateRoom/>} />
            </Route>
        </Routes>
    )
}

export default AuthenticatedUserRoutes