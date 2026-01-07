import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import './Auth.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await AuthService.login(username, password);
            navigate("/");
            window.location.reload();
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="auth-container animate-fade-in">
            <div className="auth-card card">
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
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
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn btn-primary full-width">Login</button>
                    <p style={{ marginTop: '15px', textAlign: 'center' }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)' }}>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
