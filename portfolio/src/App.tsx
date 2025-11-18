import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

import LandingPage from './Pages/Landing/LandingPage';
import AdminLayout from './Pages/Admin/AdminLayout';
import AdminEditProfile from './Pages/Admin/Profile/EditProfile';
import PublicPortfolio from './Pages/Portfolio/PublicPortfolio';
import CorporatePortfolioPage from './Pages/Corporate/Portfolio';

import AdminEditProject from './Pages/Admin/Profile/EditProject';
import AdminEditWorkexp from './Pages/Admin/Profile/Workexperience/AdminEditWorkexp';
import AdminEditSkill from './Pages/Admin/Profile/EditSkill';
import AdminEditCertificate from './Pages/Admin/Profile/EditCertificate';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/my-cv" element={<CorporatePortfolioPage />} />

          <Route path="/a-dmin" element={<AdminLayout />}>
            <Route path="edit-profile" element={<AdminEditProfile />} />
            <Route path="edit-workexp" element={<AdminEditWorkexp />} />
            <Route path="edit-project" element={<AdminEditProject />} />
            <Route path="edit-skill" element={<AdminEditSkill />} />
            <Route path="edit-certificate" element={<AdminEditCertificate />} />
          </Route>

          <Route path="/:username" element={<PublicPortfolio />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
