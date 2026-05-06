import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import type { VideoContract } from "../contracts/VideoContract";
import axios from "axios";
import { motion } from "framer-motion";

export function UserDashBoard() {
    const [cookies, , removeCookies] = useCookies(['userid']);
    const [videos, setVideos] = useState<VideoContract[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    let navigate = useNavigate();

    // 🔹 Load Videos from API
    function loadVideos() {
        axios.get('http://localhost:5050/get-videos')
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error("Error loading videos:", error);
            });
    }

    // 🔹 Auth Guard & Initial Load
    useEffect(() => {
        if (!cookies.userid) {
            navigate('/user-login');
        } else {
            loadVideos();
        }
    }, [cookies.userid, navigate]);

    // 🔹 Sign Out Logic
    function handleSignOut() {
        if (window.confirm("Are you sure you want to sign out?")) {
            removeCookies('userid');
            navigate('/');
        }
    }

    // 🔹 Search Filter Logic
    const filteredVideos = videos.filter(v =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-vh-100 bg-dark text-white" style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
            
            {/* 🖥️ STICKY NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary px-4 sticky-top shadow">
                <div className="container-fluid">
                    {/* Logo */}
                    <span className="navbar-brand fw-bold fs-3 text-warning">
                        Video<span className="text-white">Stream</span>
                    </span>
                    
                    {/* Search Bar (Interactive) */}
                    <div className="d-flex flex-grow-1 justify-content-center mx-4">
                        <div className="input-group w-75">
                            <span className="input-group-text bg-dark border-secondary text-muted rounded-start-pill">
                                <i className="bi bi-search"></i>
                            </span>
                            <input 
                                type="text" 
                                className="form-control bg-dark border-secondary text-white rounded-end-pill px-3" 
                                placeholder="Search your favorite videos..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* User Profile & Logout */}
                    <div className="d-flex align-items-center">
                        <span className="me-3 d-none d-md-inline text-warning fw-bold fs-5">
                            <i className="bi bi-person-circle me-1"></i> {cookies.userid}
                        </span>
                        <button className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            {/* 📺 MAIN CONTENT */}
            <div className="container py-5">
                <header className="mb-5">
                    <h2 className="fw-bold text-white mb-1">
                        Welcome back, <span className="text-warning">{cookies.userid}!</span>
                    </h2>
                    <p className="text-muted fs-5">Explore our latest collection of videos curated just for you.</p>
                </header>

                {/* Video Grid */}
                <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                    {filteredVideos.map((video) => (
                        <div className="col" key={video.video_id}>
                            <motion.div 
                                whileHover={{ scale: 1.03, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="card h-100 bg-secondary bg-opacity-25 text-white border-0 shadow-lg overflow-hidden"
                                style={{ borderRadius: '15px', backdropFilter: 'blur(10px)' }}
                            >
                                {/* Video Thumbnail / Iframe Wrapper */}
                                <div className="ratio ratio-16x9 shadow-sm">
                                    <iframe
                                        src={video.url.replace("watch?v=", "embed/")}
                                        title={video.title}
                                        allowFullScreen
                                        className="rounded-top"
                                        style={{ border: 'none' }}
                                    ></iframe>
                                </div>

                                <div className="card-body p-3">
                                    <h5 className="card-title text-truncate fw-bold mb-2" title={video.title}>
                                        {video.title}
                                    </h5>
                                    <p className="card-text text-white small mb-3" style={{ height: '45px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                        {video.description}
                                    </p>
                                    
                                    <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-3 mt-auto">
                                        <div className="small text-light">
                                            <span className="me-3">
                                                <i className="bi bi-hand-thumbs-up-fill text-warning me-1"></i> {video.likes}
                                            </span>
                                            <span>
                                                <i className="bi bi-eye-fill text-info me-1"></i> {video.views}
                                            </span>
                                        </div>
                                        <motion.button 
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="btn btn-sm btn-warning rounded-circle shadow"
                                            title="Add to Watch Later"
                                        >
                                            <i className="bi bi-bookmark-plus-fill"></i>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </section>

                {/* 🔍 EMPTY STATE */}
                {filteredVideos.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-center mt-5 pt-5"
                    >
                        <i className="bi bi-patch-question text-muted display-1"></i>
                        <h3 className="mt-3 text-muted">No videos found matching "{searchQuery}"</h3>
                        <button className="btn btn-link text-warning" onClick={() => setSearchQuery("")}>Clear search</button>
                    </motion.div>
                )}
            </div>

            {/* 🎨 FOOTER */}
            <footer className="py-4 mt-5 border-top border-secondary text-center text-muted small">
                &copy; 2026 VideoStream Admin Panel. All Rights Reserved.
            </footer>
        </div>
    );
}