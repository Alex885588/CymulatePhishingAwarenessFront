import { useState } from 'react';
import { useAuth } from '../../ContextApi/context.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const context = useAuth();
    const navigate = useNavigate()
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!username) {
                toast.error('Input username');
                return;
            }
            if (!password) {
                toast.error('Input password');
                return;
            }
            if (password.length < 5) {
                toast.error('Password must be at least 5 characters long');
                return;
            }
            const response = await context?.apiService.register(username, password);
            if (response?.data) {
                toast.success("Registration successful");
                navigate("/")
            }
        } catch (error) {
            toast.error("Registration failed");
            console.error('Error registering:', error);
        }
    };


    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Register</h3>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                className="form-control mt-1"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <button
                type="button"
                className="btn btn-secondary position-fixed top-0 start-0 m-3"
                onClick={() => navigate("/")}
            >
                Back to Login
            </button>
        </>
    );
}
