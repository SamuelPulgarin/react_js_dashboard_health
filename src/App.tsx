import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './page/HomePage';
import { LogInPage } from './page/LogInPage';
import RegisterPage from './page/RegisterPage';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LogInPage />} />
        <Route path='/dashboard' element={ <HomePage/>} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
