import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const HOME_BY_ROLE = {
  admin: '/admin',
  doctor: '/doctor',
  patient: '/patient',
};

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const location = useLocation();
  const role = useAuthStore((state) => state.role);

  if (!role) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    const fallback = HOME_BY_ROLE[role] || '/auth';
    return <Navigate to={fallback} replace />;
  }

  return children;
}
