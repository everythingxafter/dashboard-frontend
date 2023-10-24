import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);

        localStorage.setItem('Authorization', data.token);

        navigate('/');

      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex w-screen h-screen justify-center items-center bg-zinc-200'>
      <div className='flex flex-col mx-auto bg-white p-10 shadow-lg rounded-lg'>
        <div className='text-center p-2 mb-10'>
          <h2 className='text-2xl'>User Login</h2>
        </div>
        {token ? (
          <div>
            <p>Login successful!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 mb-4'>
              <p className='text-xl font-medium'>
                Username:
              </p>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="shadow-md appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder='Enter your username'
              />
            </div>
            <div className='flex flex-col gap-2 mb-4'>
              <p className='text-xl font-medium'>
                Password:
              </p>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className="shadow-md appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder='Enter your password'
                />
                <div
                  className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOffIcon className='h-5 w-5 text-gray-400' /> : <EyeIcon className='h-5 w-5 text-gray-400' />}
                </div>
              </div>
            </div>
            <div className='flex mt-10'>
              <div className='py-2 px-4 w-full text-center bg-green-600 rounded-lg shadow-md hover:bg-green-800 hover:shadow-xl '>
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
