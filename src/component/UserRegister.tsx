import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export function UserRegister() {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id: '',   // Changed from admin_id
            user_name: '',
            password: '',
            mobile: '',
            email: ''
        },
        onSubmit: (newUser) => {
            // 🔹 THE FIX: Use POST to send data to the database
            axios.post('https://video-liberary.onrender.com/register-user', newUser)
                .then(() => {
                    alert("Registration Successful!");
                    navigate('/user-login'); // Take them to login after registering
                })
                .catch((error) => {
                    console.error("Error adding user:", error);
                    alert("Failed to register user. Is the server running?");
                });
        }
    });

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card shadow-lg p-4 bg-white" 
                style={{ width: '450px', borderRadius: '20px' }}
            >
                <div className="card-body text-dark">
                    <h2 className="fw-bold text-center mb-4">Create Account</h2>
                    
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold small">User ID</label>
                            <input 
                                type="text" 
                                name="user_id" 
                                placeholder="Choose a unique ID"
                                className="form-control bg-light border-0" 
                                onChange={formik.handleChange} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small">Full Name</label>
                            <input 
                                type="text" 
                                name="user_name" 
                                placeholder="Enter your full name"
                                className="form-control bg-light border-0" 
                                onChange={formik.handleChange} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Create a strong password"
                                className="form-control bg-light border-0" 
                                onChange={formik.handleChange} 
                                required 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold small">Mobile</label>
                            <input 
                                type="text" 
                                name="mobile" 
                                placeholder="Enter mobile number"
                                className="form-control bg-light border-0" 
                                onChange={formik.handleChange} 
                                required 
                            />
                        </div>

                        <button type="submit" className="btn btn-warning w-100 fw-bold py-3 shadow-sm">
                            Register & Sign In
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <Link to="/user-login" className="text-muted small text-decoration-none">
                            Already have an account? <span className="text-warning fw-bold">Login</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}