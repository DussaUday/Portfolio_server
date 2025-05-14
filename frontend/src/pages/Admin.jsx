import { useState } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <AdminDashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <AdminLogin setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default Admin;