import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import './Auth.css';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await AuthService.register(username, email, password);
            navigate("/login");
        } catch (err: any) {
            console.error("Signup error:", err);
            const errorMessage = err.response?.data?.message || err.message || "Signup failed.";
            setError(errorMessage);
        }
    };

    return (
        <div className="auth-container animate-fade-in">
            <div className="auth-card card">
                <h2>Create Account</h2>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn btn-primary full-width">Sign Up</button>
                    <p style={{ marginTop: '15px', textAlign: 'center' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
