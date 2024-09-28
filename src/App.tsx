import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './page/HomePage';
import { LogInPage } from './page/LogInPage';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LogInPage />} />
        <Route path='/dashboard' element={ <HomePage/>} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
