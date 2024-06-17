import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './Components/LoginPage/Login';
import { useAuth } from './ContextApi/context.api';
import { PhishingAttempt } from './Components/PhishingAttemptPage/PhishingAttempt';
import { RegisterPage } from './Components/RegisterPage/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProtectedRoute = (props: { component: React.ComponentType<any> }) => {
  const context = useAuth();
  useEffect(() => {
    context?.isTokenValid();
  }, []);

  const isAuthenticated = context?.isAuthenticated;
  return isAuthenticated ? <props.component /> : <LoginPage />
};

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute component={PhishingAttempt} />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  );
}

export default App;
