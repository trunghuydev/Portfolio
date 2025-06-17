import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [clicks, setClicks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (clicks >= 5) {
      navigate('/a-dmin/edit-profile');
    }

    const timer = setTimeout(() => setClicks(0), 1500);
    return () => clearTimeout(timer);
  }, [clicks, navigate]);

  return (
    <footer className="py-6 mt-1 text-sm text-center text-gray-500 border-t">
      <span onClick={() => setClicks((prev) => prev + 1)} className="select-none">
        © 2025 Built with React
      </span>
    </footer>
  );
};

export default Footer;
