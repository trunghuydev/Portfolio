import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

import LoginPage from './Pages/Login/Login';

import AdminLayout from './Pages/Admin/AdminLayout';
import AdminEditProfile from './Pages/Admin/Profile/EditProfile';
import PortfolioHuy from './Pages/T_Huy/Portfolio';
import PortfolioHan from './Pages/Han/Portfolio';
import PortfolioThanh from './Pages/Thanh/Portfolio';
import PortfolioPhong from './Pages/Phong/Portfolio';
import PortfolioNam from './Pages/H_Nam/Portfolio';
import PortfolioThy from './Pages/Thy/Portfolio';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/trung-huy" element={<PortfolioHuy />} />
          <Route path="/tuong-han" element={<PortfolioHan />} />
          <Route path="/trung-thanh" element={<PortfolioThanh />} />
          <Route path="/kien-phong" element={<PortfolioPhong />} />
          <Route path="/hoai-nam" element={<PortfolioNam />} />
          <Route path="/anh-thy" element={<PortfolioThy />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/a-dmin" element={<AdminLayout />}>
            <Route path="edit-profile" element={<AdminEditProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
