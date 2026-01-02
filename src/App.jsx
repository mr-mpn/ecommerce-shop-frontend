import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './views/HomePage';
import AdminPanel from './views/AdminPanel';
import Offers from './views/Offers';
import Login from './views/Login';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;