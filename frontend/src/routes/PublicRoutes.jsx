import {Routes,Route} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
// import Login from ""
// import SignUp from ""


function PublicRoutes(){
    return(
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            {/* <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} /> */}
        </Routes>
    )
}

export default PublicRoutes