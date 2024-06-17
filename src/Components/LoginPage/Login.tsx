import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../ContextApi/context.api';
import '../LoginPage/Login.css';
import 'react-toastify/dist/ReactToastify.css';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const context = useAuth()

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
            const response = await context?.apiService.login(username, password);
            if (response.token) {
                context?.setToken(response.token)
            }
        } catch (error: any) {
            toast.error("Invalid Credentials");
            console.error('Error signing in:', error);
        }
    };

    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
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
                                Submit
                            </button>
                            <div className="text-center mt-3">
                                <a href="/register" className="register-link">Register</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}


