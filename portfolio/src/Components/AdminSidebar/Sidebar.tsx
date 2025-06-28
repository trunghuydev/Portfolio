import { NavLink } from 'react-router-dom';

const menu = [
  { path: '/a-dmin/edit-profile', label: 'Profile' },
  { path: '/a-dmin/edit-workexp', label: 'Experience' },
  { path: '/a-dmin/edit-project', label: 'Project' },
  { path: '/a-dmin/edit-skill', label: 'Skills' },
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
