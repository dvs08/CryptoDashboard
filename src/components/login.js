// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import {Input} from '@innovaccer/design-system';
// import '../style/login.css';


// const Login = () => {
//     const [input, setInput] = useState({ username: "", password: "" });
//     const [error, setError] = useState("");  
//     const navigate = useNavigate(); 

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//         const user = existingUsers.find(
//             (user) => user.username === input.username && user.password === input.password
//         );

//         if (user) {
//             localStorage.setItem('isAuthenticated', true);  
//             localStorage.setItem('currentUser', JSON.stringify(user));
//             navigate('/'); 
//         } else {
//             setError("Invalid username or password");
//         }
//     };

//     return (
//         <div className="login">
//             <div className="login-card">
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <input
//                             name="username"
//                             value={input.username}
//                             onChange={(e) => setInput({ ...input, username: e.target.value })}
//                             type="text"
//                             placeholder="Username"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             name="password"
//                             value={input.password}
//                             onChange={(e) => setInput({ ...input, password: e.target.value })}
//                             type="password"
//                             placeholder="Password"
//                         />
//                     </div>

//                     {error && <div className="error-message">{error}</div>}

//                     <button type="submit">Login</button>

//                     <p className="signup-link">
//                         Don't have an account? <a onClick={() => navigate('/signup')}>Sign up here</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;


/* MDS VERSION */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Heading, Label, Input, Icon, Link, Button } from '@innovaccer/design-system';
import '@innovaccer/design-system/css/dist/index.css';
import '../style/login.css';
import '../style/signup.css';

const Login = () => {
  const [input, setInput] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signInDisabled, setSignInDisabled] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = existingUsers.find(
      (user) => user.username === input.username && user.password === input.password
    );

    if (user) {
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/', { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  const handleUsernameChange = (e) => {
    const { password } = input;
    const username = e.target.value;
    setInput({ ...input, username });
    setSignInDisabled(!username || !password);
  };

  const handlePasswordChange = (e) => {
    const { username } = input;
    const password = e.target.value;
    setInput({ ...input, password });
    setSignInDisabled(!username || !password); 
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <div style={{ width: '350px' }}>
        <Card className="px-6 py-6">
          <form onSubmit={handleSubmit}>
            <Heading className="mb-7" size="m">
              Login
            </Heading>

            <Label withInput={true}>Username</Label>
            <Input
              name="username"
              type="text"
              placeholder="Enter username"
              value={input.username}
              className="mb-6"
              onChange={handleUsernameChange}
              autoComplete="off"
            />

            <Label withInput={true}>Password</Label>
            <Input
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter password"
              value={input.password}
              className="mb-4"
              onChange={handlePasswordChange}
              actionIcon={
                <Icon
                  name={passwordVisible ? 'visibility' : 'visibility_off'}
                  onClick={togglePasswordVisibility}
                />
              }
              autoComplete="off"
            />

            {error && <div className="error-message">{error}</div>}
            
            <Button
              className="mt-7"
              appearance="primary"
              expanded={true}
              disabled={signInDisabled}
              type="submit"
            >
              Sign In
            </Button>

            <p className="signup-link" >
              Don't have an account? <a style={{cursor:"pointer"}} onClick={() => navigate('/signup')}>Sign up here</a>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
