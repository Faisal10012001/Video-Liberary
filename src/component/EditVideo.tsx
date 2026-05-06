import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import type { CategoryContract } from "../contracts/CategoryContract";
import type { VideoContract } from "../contracts/VideoContract";

export function EditVideo() {

    const [categories, setCategories] = useState<CategoryContract[]>([]);

    // ✅ Default object (prevents hook/render errors)
    const [video, setVideo] = useState<VideoContract>({
        video_id: 0,
        title: '',
        description: '',
        comments: '',
        url: '',
        likes: 0,
        views: 0,
        category_id: 0
    });

    const navigate = useNavigate();
    const params = useParams();

    // ✅ Formik
    const formik = useFormik({
        initialValues: video,
        enableReinitialize: true,

        onSubmit: (updatedVideo) => {

            axios.put(
                `http://localhost:5050/edit-video/${params.id}`,
                updatedVideo
            )
            .then(() => {
                alert("Video Updated Successfully");
                navigate("/admin-dashboard");
            })
            .catch(err => {
                console.error(err);
                alert("Update Failed");
            });

        }
    });

    // ✅ Load Categories
    function loadCategories() {

        axios.get("http://localhost:5050/get-categories")
            .then(response => {

                response.data.unshift({
                    category_id: -1,
                    category_name: "Select Category"
                });

                setCategories(response.data);

            })
            .catch(err => console.error(err));
    }

    // ✅ Load Video
    function loadVideo() {

        axios.get(`http://localhost:5050/get-video/${params.id}`)
            .then(response => {

                console.log("Video Response:", response.data);

                if (response.data.length > 0) {
                    setVideo(response.data[0]);
                }
                else {
                    alert("Video Not Found");
                    navigate("/admin-dashboard");
                }

            })
            .catch(err => console.error(err));
    }

    // ✅ Load on component mount
    useEffect(() => {
        loadCategories();
        loadVideo();
    }, []);

    return (
        <div className="container">

            <h2>Edit Video</h2>

            <form onSubmit={formik.handleSubmit}>

                <dl className="row">

                    <dt className="col-2">Video Id</dt>
                    <dd className="col-10">
                        <input
                            type="number"
                            name="video_id"
                            value={formik.values.video_id}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    </dd>

                    <dt className="col-2">Title</dt>
                    <dd className="col-10">
                        <input
                            type="text"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    </dd>

                    <dt className="col-2">Description</dt>
                    <dd className="col-10">
                        <input
                            type="text"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    </dd>

                    <dt className="col-2">Comments</dt>
                    <dd className="col-10">
                        <input
                            type="text"
                            name="comments"
                            value={formik.values.comments}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    </dd>

                    <dt className="col-2">URL</dt>
                    <dd className="col-10">
                        <input
                            type="text"
                            name="url"
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    </dd>

                    <dt className="col-2">Likes</dt>
                    <dd className="col-10">
                        <input
                            type="number"
                            name="likes"
                            value={formik.values.likes}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    </dd>

                    <dt className="col-2">Views</dt>
                    <dd className="col-10">
                        <input
                            type="number"
                            name="views"
                            value={formik.values.views}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    </dd>

                    <dt className="col-2">Category</dt>
                    <dd className="col-10">

                        <select
                            name="category_id"
                            value={formik.values.category_id}
                            onChange={formik.handleChange}
                            className="form-select"
                        >

                            {
                                categories.map(category =>
                                    <option
                                        key={category.category_id}
                                        value={category.category_id}
                                    >
                                        {category.category_name}
                                    </option>
                                )
                            }

                        </select>

                    </dd>

                </dl>

                <button
                    type="submit"
                    className="btn btn-success"
                >
                    Save
                </button>

                <Link
                    to="/admin-dashboard"
                    className="btn btn-danger mx-2"
                >
                    Cancel
                </Link>

            </form>

        </div>
    );
}