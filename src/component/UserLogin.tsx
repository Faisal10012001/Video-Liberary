import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export function UserLogin() {
    const [, setCookie] = useCookies(['userid']);
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id: '',
            password: ''
        },
        onSubmit: (user) => {
            axios.get('http://localhost:5050/get-users')
                .then((response) => {
                    let result = response.data.find(
                        (item: any) => item.user_id === user.user_id.trim()
                    );

                    if (result) {
                        if (result.password === user.password) {
                            setCookie('userid', user.user_id, { path: '/' });
                            navigate('/user-dashboard');
                        } else {
                            alert('Incorrect password');
                        }
                    } else {
                        navigate('/user-login-error');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert("Server error. Please try again later.");
                });
        }
    });

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
            {/* Background decorative elements */}
            <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0, opacity: 0.1 }}>
                <div className="bg-warning rounded-circle" style={{ width: '400px', height: '400px', position: 'absolute', top: '-100px', right: '-100px' }}></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card shadow-lg p-4 bg-white" 
                style={{ width: '420px', borderRadius: '20px', zIndex: 1 }}
            >
                <div className="card-body">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-dark">User Login</h2>
                        <p className="text-muted">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">User ID</label>
                            <input 
                                type="text" 
                                name="user_id" 
                                className="form-control form-control-lg bg-light border-0" 
                                placeholder="e.g. john_doe"
                                onChange={formik.handleChange}
                                value={formik.values.user_id}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">Password</label>
                            <div className="input-group">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    className="form-control form-control-lg bg-light border-0" 
                                    placeholder="••••••••"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    required
                                />
                                <button 
                                    className="btn btn-light border-0" 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                                </button>
                            </div>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="btn btn-warning btn-lg w-100 fw-bold shadow-sm py-3"
                        >
                            Sign In
                        </motion.button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-muted mb-0">Don't have an account?</p>
                        <Link to="/user-register" className="text-warning fw-bold text-decoration-none">
                            Create New Account
                        </Link>
                    </div>
                    
                    <div className="text-center mt-3">
                        <Link to="/" className="text-muted small text-decoration-none">
                            <i className="bi bi-house-door me-1"></i> Return Home
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}