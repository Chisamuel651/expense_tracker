import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state?.auth?.user);

  return user ? element : <Navigate to="/" />;
};

export default ProtectedRoute;