import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export function AdminLogin() {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            admin_id: '',
            password: '',
        },
        onSubmit: (admin) => {
            // Give the user some feedback that we are checking credentials
            axios.get('https://video-liberary.onrender.com/get-admins') 
                .then(response => {
                    let user = response.data.find((item: any) => item.admin_id === admin.admin_id);
                    
                    if (user) {
                        if (user.password === admin.password) {
                            
                            navigate('/admin-dashboard');
                        } else {
                            alert('Invalid Password. Please try again.');
                        }
                    } else {
                        alert('Admin ID not recognized.');
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('Server error. Is the backend running?');
                });
        }
    });

    return (
        <div className="container-fluid bg-dark vh-100 d-flex justify-content-center align-items-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card shadow-lg bg-secondary text-white p-4" 
                style={{ width: '400px', borderRadius: '15px' }}
            >
                <div className="card-body">
                    <div className="text-center mb-4">
                        <i className="bi bi-shield-lock-fill text-success display-4"></i>
                        <h2 className="fw-bold mt-2">Admin Login</h2>
                        <p className="text-light opacity-75">Secure access to dashboard</p>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Admin ID</label>
                            <div className="input-group">
                                <span className="input-group-text bg-dark border-0">
                                    <i className="bi bi-person text-white"></i>
                                </span>
                                <input 
                                    type="text" 
                                    name="admin_id" 
                                    className="form-control bg-dark text-white border-0" 
                                    placeholder="Enter Admin ID"
                                    onChange={formik.handleChange} 
                                    value={formik.values.admin_id}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Password</label>
                            <div className="input-group">
                                <span className="input-group-text bg-dark border-0">
                                    <i className="bi bi-key text-white"></i>
                                </span>
                                <input 
                                    type="password" 
                                    name="password" 
                                    className="form-control bg-dark text-white border-0" 
                                    placeholder="Enter Password"
                                    onChange={formik.handleChange} 
                                    value={formik.values.password}
                                    required 
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success w-100 fw-bold py-2 shadow-sm">
                            Login to Dashboard
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/" className="text-warning text-decoration-none small">
                            <i className="bi bi-arrow-left me-1"></i> Back to Home
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}