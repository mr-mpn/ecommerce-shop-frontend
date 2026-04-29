import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css';
import logo from '../../assets/logo.png'

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
        <div className="nav-left">
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
        </div>

        <div className="nav-center">
          <img src={logo} alt="Logo" className="nav-logo" />
        </div>

        <div className="nav-right">
          {isAuthenticated() && user?.role === 'admin' ? (
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
            ):(
            <>
              <button
                onClick={() => handleNavigation('/login')}
                className={`nav-button ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Login
              </button>
            
            </>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navigation;