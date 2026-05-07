import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import type { VideoContract } from "../contracts/VideoContract";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export function AdminDashBoard() {
    const [cookies, , removeCookies] = useCookies(['adminid']);
    const [videos, setVideos] = useState<VideoContract[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    let navigate = useNavigate();

    function loadVideos() {
        axios.get('https://video-liberary.onrender.com/get-videos')
            .then(response => {
                setVideos(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        // Redirect if not logged in (Simple Guard)
        if(!cookies.adminid) {
            // navigate('/admin-login'); 
        }
        loadVideos();
    }, []);

    function handleSignOut() {
        if(window.confirm("Confirm Sign Out?")) {
            removeCookies('adminid');
            navigate('/');
        }
    }

    function handleDelete(id: number) {
        if (confirm("Are you sure you want to delete this video?")) {
            axios.delete(`https://video-liberary.onrender.com/delete-video/${id}`)
                .then(() => {
                    setVideos(videos.filter(video => video.video_id !== id));
                });
        }
    }

    // Filter logic for search bar
    const filteredVideos = videos.filter(v => 
        v.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid min-vh-100 bg-light p-0">
            {/* Navbar */}
            <nav className="navbar navbar-dark bg-dark px-4 shadow-sm">
                <span className="navbar-brand fw-bold">
                    <i className="bi bi-shield-lock me-2"></i>Admin Console
                </span>
                <div className="d-flex align-items-center">
                    <span className="text-light me-3 small">Welcome, {cookies.adminid}</span>
                    <button className="btn btn-outline-danger btn-sm" onClick={handleSignOut}>
                        <i className="bi bi-power me-1"></i>Sign Out
                    </button>
                </div>
            </nav>

            <div className="container py-4">
                <div className="row mb-4 align-items-center">
                    <div className="col-md-6">
                        <h2 className="fw-bold m-0">Video Library Management</h2>
                        <p className="text-muted small">Total Videos: {videos.length}</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <Link to='/add-video' className="btn btn-primary shadow-sm px-4">
                            <i className="bi bi-plus-circle me-2"></i>Add New Video
                        </Link>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-search text-muted"></i>
                            </span>
                            <input 
                                type="text" 
                                className="form-control border-start-0" 
                                placeholder="Search by video title..." 
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Video Table */}
                <div className="card border-0 shadow-sm overflow-hidden">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-dark text-uppercase small">
                            <tr>
                                <th className="ps-4">Video Details</th>
                                <th>Preview</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredVideos.map(video => (
                                    <motion.tr 
                                        key={video.video_id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        layout
                                    >
                                        <td className="ps-4">
                                            <div className="fw-bold text-dark">{video.title}</div>
                                            <div className="text-muted x-small">ID: #{video.video_id}</div>
                                        </td>
                                        <td>
                                            <div className="rounded overflow-hidden shadow-sm" style={{ width: '160px' }}>
                                                <iframe
                                                    width="160"
                                                    height="90"
                                                    src={video.url.replace("watch?v=", "embed/")}
                                                    title="preview"
                                                    frameBorder="0"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </td>
                                        <td className="text-end pe-4">
                                            <Link
                                                to={`/edit-video/${video.video_id}`}
                                                className="btn btn-outline-warning btn-sm me-2 shadow-sm"
                                            >
                                                <i className="bi bi-pencil-square"></i> Edit
                                            </Link>
                                            <button
                                                className="btn btn-outline-danger btn-sm shadow-sm"
                                                onClick={() => handleDelete(video.video_id)}
                                            >
                                                <i className="bi bi-trash3"></i> Delete
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    {filteredVideos.length === 0 && (
                        <div className="text-center py-5">
                            <i className="bi bi-camera-video text-muted display-1"></i>
                            <p className="mt-3 text-muted">No videos found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}