import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

import LoginPage from './Pages/Login/Login';
import Portfolio from './Pages/cv/Portfolio';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/edit-cv" element={<Editcv />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
