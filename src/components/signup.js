// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import '../style/signup.css';

// const Signup = () => {
//     const navigate = useNavigate();
//     const [input, setInput] = useState({
//         name: "",
//         email: "",
//         username: "",
//         password: "",
//         DOB: "",
//         designation: "",
//     });
//     const [error, setError] = useState(""); 

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!input.name || !input.email || !input.username || !input.password || !input.DOB || !input.designation) {
//             setError("All fields are required.");
//             return;  
//         }

//         const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//         existingUsers.push(input);
//         localStorage.setItem("users", JSON.stringify(existingUsers));

//         setInput({
//             name: "",
//             email: "",
//             username: "",
//             password: "",
//             DOB: "",
//             designation: "",
//         });

//         navigate('/login');
//     };

//     return (
//         <div className="signup">
//             <div className="signup-card">
//                 <h2>Create an Account</h2>
//                 <form onSubmit={handleSubmit}>
//                     {/* Name */}
//                     <div className="form-group">
//                         <input
//                             name="name"
//                             value={input.name}
//                             onChange={(e) => setInput({ ...input, name: e.target.value })}
//                             type="text"
//                             placeholder="Your Name"
//                         />
//                     </div>

//                     {/* Email */}
//                     <div className="form-group">
//                         <input
//                             name="email"
//                             value={input.email}
//                             onChange={(e) => setInput({ ...input, email: e.target.value })}
//                             type="email"
//                             placeholder="Your Email"
//                         />
//                     </div>

//                     {/* Username */}
//                     <div className="form-group">
//                         <input
//                             name="username"
//                             value={input.username}
//                             onChange={(e) => setInput({ ...input, username: e.target.value })}
//                             type="text"
//                             placeholder="Username"
//                         />
//                     </div>

//                     {/* Password */}
//                     <div className="form-group">
//                         <input
//                             name="password"
//                             value={input.password}
//                             onChange={(e) => setInput({ ...input, password: e.target.value })}
//                             type="password"
//                             placeholder="Password"
//                         />
//                     </div>

//                     {/* Date of Birth */}
//                     <div className="form-group">
//                         <input
//                             name="DOB"
//                             value={input.DOB}
//                             onChange={(e) => setInput({ ...input, DOB: e.target.value })}
//                             type="date"
//                         />
//                     </div>

//                     {/* Designation */}
//                     <div className="form-group">
//                         <input
//                             name="designation"
//                             value={input.designation}
//                             onChange={(e) => setInput({ ...input, designation: e.target.value })}
//                             type="text"
//                             placeholder="Designation"
//                         />
//                     </div>

//                     {error && <div className="error-message">{error}</div>}

//                     <button type="submit">Register</button>

//                     <p className="signin-link">
//                         Already have an account? 
//                         <a onClick={() => navigate('/login')}>Login Here</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Signup;

/*MDS VERSION */

import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Text, Row, Column, Label, Input, Dropdown, DatePicker, Button } from '@innovaccer/design-system';
import '@innovaccer/design-system/css/dist/index.css';
import '../style/signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    DOB: "",
    designation: "",
    gender: "", 
  });
  const [error, setError] = useState(""); 

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate('/', { replace: true }); 
    }
  }, [navigate]);



  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  const onChange = (value, name) => {
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.name || !input.email || !input.username || !input.password || !input.DOB || !input.designation || !input.gender) {
      setError("All fields are required.");
      return;  
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    

    //duplicate

    const userExist = existingUsers.some(user => user.email === input.email || user.username === input.username || user.password === input.password);

    if(userExist){
      setError("Already in use");
      console.log("Error after update: ", error);
      return;
    }

    const newUser = {

      ...input,

    };


    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setInput({
      name: "",
      email: "",
      username: "",
      password: "",
      DOB: "",
      designation: "",
      gender: "", 
    });

    navigate('/login');
  };

  return (
    <div className="signup-wrapper">
      <Card className="px-6 py-6">
        <Text appearance="subtle" weight="strong">Create an Account</Text>
        <form onSubmit={handleSubmit}>
          <Column className="mt-6">
            {/* Name */}
            <Column sizeXL={4} sizeL={4} sizeM={6} className="mr-6 mb-6">
              <Label withInput={true} required={true}>Name</Label>
              <Input
                name="name"
                value={input.name}
                onChange={(e) => onChange(e.target.value, e.target.name)}
                type="text"
                placeholder="Your Name"
                icon="person"
                autocomplete={'off'}
              />
            </Column>

            {/* Email */}
            <Column sizeXL={4} sizeL={4} sizeM={6} className="mr-6 mb-6">
              <Label withInput={true} required={true}>Email Address</Label>
              <Input
                name="email"
                value={input.email}
                onChange={(e) => onChange(e.target.value, e.target.name)}
                type="email"
                placeholder="E.g. abc@gmail.com"
                icon="mail"
                autocomplete={'off'}
              />
            </Column>

            {/* Username */}
            <Column sizeXL={4} sizeL={4} sizeM={6} className="mr-6 mb-6">
              <Label withInput={true} required={true}>Username</Label>
              <Input
                name="username"
                value={input.username}
                onChange={(e) => onChange(e.target.value, e.target.name)}
                type="text"
                placeholder="Username"
                icon="person"
                autocomplete={'off'}
              />
            </Column>

            {/* Password */}
            <Column sizeXL={4} sizeL={4} sizeM={6} className="mr-6 mb-6">
              <Label withInput={true} required={true}>Password</Label>
              <Input
                name="password"
                value={input.password}
                onChange={(e) => onChange(e.target.value, e.target.name)}
                type="password"
                placeholder="Password"
                icon="lock"
                autocomplete={'off'}
              />
            </Column>

            {/* Date of Birth */}
            <Column sizeXL={4} sizeL={4} sizeM={6} className="mr-6 mb-6">
              <Label withInput={true} required={true}>Date of Birth</Label>
              <DatePicker
                name="DOB"
                value={input.DOB}
                withInput={true}
                onDateChange={(currentDate) => onChange(currentDate, 'DOB')}
                inputOptions={{
                  placeholder: 'MM/DD/YYYY',
                  icon: 'cake',
                  mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
                }}
              />
            </Column>

            {/* Designation */}
            <Column sizeXL={4} sizeL={4} sizeM={6} className="mr-6 mb-6">
              <Label withInput={true} required={true}>Designation</Label>
              <Input
                name="designation"
                value={input.designation}
                onChange={(e) => onChange(e.target.value, e.target.name)}
                type="text"
                placeholder="Your Designation"
                icon="work"
                autocomplete={'off'}
              />
            </Column>

            {/* Gender */}
            <Column sizeXL={4} sizeL={4} sizeM={6} className="mr-6 mb-6">
              <Label withInput={true} required={true}>Gender</Label>
              <Dropdown
                options={genderOptions}
                value={input.gender}
                onChange={(value) => onChange(value, 'gender')}
              />
            </Column>
          </Column>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <Button className="mr-4" onClick={() => navigate('/login')}>Cancel</Button>
            <Button type="submit" appearance="success" disabled={!input.name || !input.email || !input.username || !input.password || !input.DOB || !input.designation || !input.gender}>Register</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Signup;


