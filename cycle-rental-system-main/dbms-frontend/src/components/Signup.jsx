import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{6,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format.';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Phone must be 10 digits.';
    if (!passwordRegex.test(formData.password))
      newErrors.password = 'Password must be of atleast 6 characters and contain uppercase, lowercase, number, and symbol.';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords don't match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        toast.success('Signup successful!');
        navigate('/available-cycles');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to sign up.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>🚲 Create Your Cycle Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          {['fullName', 'email', 'phone', 'password', 'confirmPassword'].map((field) => (
            <div key={field} className="form-group">
              <label htmlFor={field}>
                {field === 'fullName'
                  ? 'Full Name'
                  : field === 'confirmPassword'
                  ? 'Confirm Password'
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={
                  field.includes('password') && !showPassword ? 'password' : field === 'email' ? 'email' : 'text'
                }
                id={field}
                name={field}
                placeholder={
                  field === 'confirmPassword' ? 'Re-enter Password' : `Enter ${field.replace(/([A-Z])/g, ' $1')}`
                }
                value={formData[field]}
                onChange={handleChange}
                aria-invalid={!!errors[field]}
                aria-describedby={`${field}-error`}
              />
              {errors[field] && (
                <p className="error-message" id={`${field}-error`}>
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

          <div className="toggle-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Passwords</label>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? 'Signing You Up...' : '🚀 Sign Up'}
          </button>
        </form>
        <p className="redirect-text">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
