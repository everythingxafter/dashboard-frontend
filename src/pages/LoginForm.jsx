import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
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

        // Save the token to localStorage
        localStorage.setItem('Authorization', data.token);

        // Redirect to home page
        navigate('/');

      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {token ? (
        <div>
          <p>Login successful!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
