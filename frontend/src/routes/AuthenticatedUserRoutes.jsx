import { Routes, Route, Navigate } from 'react-router-dom'
import UserDashboardLayout from '../layout/userDashboardLayout'
// import pages 
import RoomPage from '../pages/RoomListPage'
import CreateRoom from '../pages/CreateRoom'
import ChatPage from '../pages/ChatPage'

function AuthenticatedUserRoutes() {
    return (
        <Routes>
            <Route path="/dashboard" element={<UserDashboardLayout />}>
                <Route index element={<Navigate to="all-rooms" replace/>}/>
                <Route path="create-room" element={<CreateRoom/>} />
                <Route path="my-rooms" element={<RoomPage />} />
                <Route path="all-rooms" element={<RoomPage />} />
                <Route path="chat-room" element={<ChatPage />} />
            </Route>
        </Routes>
    )
}

export default AuthenticatedUserRoutes