import { useParams, Link } from 'react-router-dom';
import Login from '../Login';

export default function RoleLogin() {
  const { role } = useParams();
  const validRoles = ['admin', 'doctor', 'patient'];
  const r = validRoles.includes(role) ? role : 'patient';

  return <Login role={r} />;
}
