import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-buttons">
          {/* Always show Homepage and Offers */}
          <button
            onClick={() => handleNavigation('/')}
            className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
          >
            Homepage
          </button>
          
          <button
            onClick={() => handleNavigation('/offers')}
            className={`nav-button ${location.pathname === '/offers' ? 'active' : ''}`}
          >
            Offers
          </button>
          
          {/* Show admin controls only if user is authenticated and is admin */}
          {isAuthenticated() && user?.role === 'admin' && (
            <>
              <button
                onClick={() => handleNavigation('/admin')}
                className={`nav-button ${location.pathname === '/admin' ? 'active' : ''}`}
              >
                Admin Panel
              </button>
              
              <button
                onClick={handleLogout}
                className="nav-button logout-button"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;