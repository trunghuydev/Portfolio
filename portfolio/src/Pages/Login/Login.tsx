import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '@/Interface/auth';
import { useLogin } from './Hook/useLogin';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Login = {
      username,
      password,
    };

    setError('');

    loginMutation.mutate(payload, {
      onSuccess: () => {
        navigate('/');
      },
      onError: () => {
        setError('Sai tên đăng nhập hoặc mật khẩu');
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-sm p-8 bg-white shadow-xl rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Đăng nhập Admin</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Tên đăng nhập</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loginMutation.status === 'pending'}
            className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {loginMutation.status === 'pending' ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
