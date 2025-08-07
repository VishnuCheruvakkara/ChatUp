import {Routes,Route} from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AuthenticatedUserRoutes from './AuthenticatedUserRoutes';

function RouteConfig(){
    return (
        <Routes>
            <Route path="/*" element={<PublicRoutes/>} />
            <Route path="/user/*" element={<AuthenticatedUserRoutes/>} />
        </Routes>
    
    )
}

export default RouteConfig 