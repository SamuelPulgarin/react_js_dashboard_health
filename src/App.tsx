import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LogInPage } from './page/LogInPage';
import RegisterPage from './page/RegisterPage';
import { HomePage } from './page/HomePage';
import { PatientPage } from './page/PatientPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { BeneficiariePage } from './page/BeneficiariePage';
import { EditPatientPage } from './page/EditPatientPage';
import { NotFound404 } from './components/common/NotFound404';

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path='/' element={<LogInPage />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<HomePage />} />
            <Route path='/beneficiary' element={<BeneficiariePage />} />
            <Route path='/patient/:id' element={<PatientPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/update-patient/:id' element={<EditPatientPage />} />
          </Route>

          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
