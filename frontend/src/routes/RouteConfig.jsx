import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AuthenticatedUserRoutes from './AuthenticatedUserRoutes';
import ProtectPublicPath from './pathProtection/protectPublicPath';
import ProtectAuthetictedPath from './pathProtection/protectAuthenticatedPath';

function RouteConfig() {
    return (
        <Routes>
            <Route element={<ProtectPublicPath />}>
                <Route path="/*" element={<PublicRoutes />} />
            </Route>
            <Route element={<ProtectAuthetictedPath/>}>
                <Route path="/user/*" element={<AuthenticatedUserRoutes />} />
            </Route>
        </Routes>

    )
}

export default RouteConfig 