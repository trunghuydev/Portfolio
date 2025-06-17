// Components/Sidebar.tsx
import { NavLink } from 'react-router-dom';

const menu = [
  { path: '/a-dmin/edit-profile', label: 'Profile' },
  { path: '/a-dmin/experience', label: 'Experience' },
  { path: '/a-dmin/project', label: 'Project' },
  { path: '/a-dmin/skills', label: 'Skills' },
  { path: '/a-dmin/contact', label: 'Contact' },
];

const Sidebar = () => {
  return (
    <aside className="fixed w-48 h-screen p-4 bg-gray-100 shadow-md">
      <nav className="space-y-4">
        {menu.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `block font-medium ${
                isActive ? 'text-blue-500' : 'text-gray-700 hover:text-blue-400'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
