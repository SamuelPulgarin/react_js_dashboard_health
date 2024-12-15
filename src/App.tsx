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
import { PublicRoute } from './components/auth/PublicRoute';
import { UploadPatientPage } from './page/UploadPatientPage';

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>

          {/* Public Route */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LogInPage />} />
          </Route>

          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<HomePage />} />
            <Route path='/beneficiary' element={<BeneficiariePage />} />
            <Route path='/patient/:id' element={<PatientPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/update-patient/:id' element={<EditPatientPage />} />
            <Route path='/upload-patient' element={<UploadPatientPage />} />
          </Route>

          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
