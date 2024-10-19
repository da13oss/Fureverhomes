import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // State variables for form fields and errors
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState(''); // New state for username
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    // Password requirements
    const passwordRequirements = [
        { regex: /.{8,}/, text: "At least 8 characters long" },
        { regex: /[A-Z]/, text: "Contains an uppercase letter" },
        { regex: /[a-z]/, text: "Contains a lowercase letter" },
        { regex: /\d/, text: "Contains a number" }
    ];

    // Function to validate individual fields
    const validateField = (field, value) => {
        switch (field) {
            case 'firstName':
            case 'lastName':
                return value.length < 3 ? `${field} must be at least 3 characters` : '';
            case 'username':
                return value.length < 3 ? 'Username must be at least 3 characters' : '';
            case 'email':
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
            case 'password':
                return passwordRequirements.some(req => !req.regex.test(value)) ? 'Password does not meet all requirements' : '';
            default:
                return '';
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));

        // Update the corresponding state variable
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        // Validate all fields
        const formErrors = {
            firstName: validateField('firstName', firstName),
            lastName: validateField('lastName', lastName),
            username: validateField('username', username),
            email: validateField('email', email),
            password: validateField('password', password),
        };

        // Check if there are any validation errors
        if (Object.values(formErrors).every(error => error === '')) {
            try {
                const response = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName, lastName, username, email, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Registration failed');
                }

                const data = await response.json();
                console.log('Registration successful:', data);
                navigate('/login');
            } catch (err) {
                console.error('Registration error:', err);
                setServerError(err.message || 'Registration failed. Please try again.');
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Register</h1>

            {serverError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{serverError}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name input */}
                <div>
                    <label htmlFor="firstName" className="block mb-1">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                    {firstName && errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                </div>

                {/* Last Name input */}
                <div>
                    <label htmlFor="lastName" className="block mb-1">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                    {lastName && errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                </div>

                {/* Username input */}
                <div>
                    <label htmlFor="username" className="block mb-1">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                    {username && errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                </div>

                {/* Email input */}
                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                    {email && errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Password input */}
                <div>
                    <label htmlFor="password" className="block mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                    {/* Display password requirements */}
                    <ul className="mt-2 space-y-1 text-sm">
                        {passwordRequirements.map((requirement, index) => (
                            <li
                                key={index}
                                className={`${requirement.regex.test(password) ? 'text-green-500 line-through' : 'text-red-500'
                                    }`}
                            >
                                {requirement.text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={Object.values(errors).some(error => error !== '')}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;