import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthPage } from '@/pages/auth';
import { HomePage } from '@/pages/home';
import { RouteGuard } from './guards';
import { ROUTES } from './routes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<RouteGuard type="guest" />}>
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
      </Route>

      <Route element={<RouteGuard type="protected" />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};
