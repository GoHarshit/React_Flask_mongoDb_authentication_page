import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './register.css';
import axios from 'axios';

function Register() {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const registerUser = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
        })
        .then(function (response) {
            console.log(response);
            window.location.href = '/';
        })
        .catch(function (error) {
            console.log(error, 'error');
            alert("An error occurred while processing your request");
        });
    };
    

    return (
        <div className='registration'>
            <div className='form-container'>
                <h1 className='heading'>Register</h1>
                <Form >
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" value={firstName} onChange={(e)=>setfirstName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" value={lastName} onChange={(e)=>setlastName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </Form.Group>
                    <br/>
                    <Button variant="primary" type="submit" onClick={registerUser} >
                        Register
                    </Button>
                </Form>
                <p>Already registered? <Link to="/login">Login here</Link></p> {/* Link to the login page */}
            </div>
        </div>
    );
}

export default Register;
