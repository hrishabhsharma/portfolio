import { useState } from 'react';

export default function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <form onSubmit={handleSubmit} style={{
        maxWidth: '28rem',
        width: '100%',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label 
            htmlFor="username" 
            style={{
              display: 'block',
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}
          >
            Username
          </label>
          <input 
            type="text" 
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              outline: 'none'
            }}
            placeholder="Enter your username"
          />
          <small style={{
            color: '#6b7280',
            fontSize: '0.75rem',
            marginTop: '0.25rem',
            display: 'block'
          }}>
            Username must be at least 3 characters
          </small>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="email" 
            style={{
              display: 'block',
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}
          >
            Email
          </label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              outline: 'none'
            }}
            placeholder="Enter your email"
          />
        </div>

        <button 
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#3b82f6',
            color: 'white',
            fontWeight: '600',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
