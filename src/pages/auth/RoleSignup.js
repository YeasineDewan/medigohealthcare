import { useParams } from 'react-router-dom';
import Signup from '../Signup';

export default function RoleSignup() {
  const { role } = useParams();
  const validRoles = ['admin', 'doctor', 'patient'];
  const r = validRoles.includes(role) ? role : 'patient';

  return <Signup role={r} />;
}
