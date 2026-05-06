import { Link, useNavigate, useParams } from "react-router-dom";
import type { VideoContract } from "../contracts/VideoContract";
import { useState, useEffect } from "react";
import axios from "axios";

export function DeleteVideo() {
    // 1. Removed setCategories since categories aren't displayed here
    const [videos, setVideos] = useState<VideoContract[]>([{ 
        video_id: 0, title: '', description: '', url: '', comments: '', views: 0, likes: 0, category_id: 0 
    }]);

    let navigate = useNavigate();
    let Params = useParams();

    // 2. DELETED the 'const formik = ...' block entirely. 
    // It was causing the error because it wasn't being used.

    function LoadVideos() {
        axios.get(`https://video-liberary.onrender.com/get-video/${Params.id}`)
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => console.error("Error loading video:", error));
    }

    useEffect(() => {
        // 3. Only loading the video data; Categories aren't needed for a delete confirmation
        LoadVideos();
    }, []);

    function handleDeleteClick() {
        axios.delete(`https://video-liberary.onrender.com/delete-video/${Params.id}`)
            .then(() => {
                alert('Video Deleted');
                navigate('/admin-dashboard');
            })
            .catch(error => console.error("Error deleting video:", error));
    }

    return (
        <div className="container-fluid mt-4 text-white">
            <h2 className="text-danger">Delete Video</h2>
            <div className="card bg-dark border-secondary p-4">
                <h4>Are you sure you want to delete this video?</h4>
                <hr className="border-secondary" />
                <dl className="row">
                    <dt className="col-sm-2">Title</dt>
                    <dd className="col-sm-10">{videos[0]?.title}</dd>
                    
                    <dt className="col-sm-2">Preview</dt>
                    <dd className="col-sm-10">
                        <div className="ratio ratio-16x9 w-50">
                            <iframe 
                                src={videos[0]?.url.replace("watch?v=", "embed/")} 
                                title="Video Preview"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </dd>
                </dl>
                <div className="mt-3">
                    <button onClick={handleDeleteClick} className="btn btn-danger px-4">Yes, Delete</button>
                    <Link to={"/admin-dashboard"} className="btn btn-warning mx-2">Cancel</Link>
                </div>
            </div>
        </div>
    )
}