import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AuthenticatedUserRoutes from './AuthenticatedUserRoutes';
import ProtectPublicPath from './pathProtection/ProtectPublicPath';
import ProtectAuthetictedPath from './pathProtection/ProtectAuthenticatedPath';

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