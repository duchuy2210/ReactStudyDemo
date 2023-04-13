import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import SignUpPage from './pages/SignUpPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInPage from 'pages/SignInPage';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        </Routes>
      </AuthProvider>
      {/* Hiện message của validate */}
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
