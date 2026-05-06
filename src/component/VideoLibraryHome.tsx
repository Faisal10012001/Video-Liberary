import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Optional: for smooth animations

export function VideoLibraryHome() {
    return (
        <div className="container-fluid bg-dark text-white" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="display-4 fw-bold mb-5"
                >
                    Welcome to <span className="text-warning">VideoStream</span>
                </motion.h1>

                <div className="row justify-content-center g-4">
                    {/* User Card */}
                    <div className="col-md-4">
                        <motion.div 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            className="card bg-secondary text-white h-100 border-0 shadow-lg"
                        >
                            <div className="card-body p-5">
                                <div className="mb-4">
                                    <i className="bi bi-person-circle display-1 text-warning"></i>
                                </div>
                                <h3 className="card-title">User Portal</h3>
                                <p className="card-text opacity-75">Browse, watch, and manage your favorite videos.</p>
                                <Link to="/user-login" className="btn btn-warning btn-lg w-100 mt-3 fw-bold">
                                    Enter as User
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Admin Card */}
                    <div className="col-md-4">
                        <motion.div 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            className="card bg-dark text-white h-100 border-warning border shadow-lg"
                        >
                            <div className="card-body p-5">
                                <div className="mb-4">
                                    <i className="bi bi-shield-lock display-1 text-success"></i>
                                </div>
                                <h3 className="card-title">Admin Dashboard</h3>
                                <p className="card-text opacity-75">Manage content, users, and library settings.</p>
                                <Link to="/admin-login" className="btn btn-success btn-lg w-100 mt-3 fw-bold">
                                    Enter as Admin
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}