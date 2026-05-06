import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { CategoryContract } from "../contracts/CategoryContract"

type CategoryItem = CategoryContract & {
    category_id?: number
    categoty_id?: number
    category_name?: string
}

export function AddVideo() {
    const navigate = useNavigate()
    const [categories] = useState<CategoryItem[]>([])

    const formik = useFormik({
        initialValues: {
            video_id: 0,
            title: '',
            description: '',
            comments: '',
            url: '',
            likes: 0,
            views: 0,
            category_id: 0
        },
        onSubmit: (video) => {   // ✅ FIXED (onsubmit → onSubmit)
            axios.post('https://video-liberary.onrender.com/add-video', video)
                .then(() => {
                    console.log('Video Added Successfully');
                    alert('Video Added Successfully');
                    navigate('/admin-dashboard')
                })
        }
    })

    return (
        <div>
            <h2>Add Video</h2>
            <form onSubmit={formik.handleSubmit}>   
                <dl className="row">
                    <dt className="col-2">Video Id</dt>
                    <dt className="col-10">
                        <input type="number" name="video_id" onChange={formik.handleChange} />
                    </dt>

                    <dt className="col-2">Title</dt>
                    <dt className="col-10">
                        <input type="text" name="title" onChange={formik.handleChange} />
                    </dt>

                    <dt className="col-2">Description</dt>
                    <dt className="col-10">
                        <input type="text" name="description" onChange={formik.handleChange} />
                    </dt>

                    <dt className="col-2">Comment</dt>
                    <dt className="col-10">
                        <input type="text" name="comments" onChange={formik.handleChange} />
                    </dt>

                    <dt className="col-2">URL</dt>
                    <dt className="col-10">
                        <input type="text" name="url" onChange={formik.handleChange} />
                    </dt>

                    <dt className="col-2">Likes</dt>
                    <dt className="col-10">
                        <input type="text" name="likes" onChange={formik.handleChange} />
                    </dt>

                    <dt className="col-2">Views</dt>
                    <dt className="col-10">
                        <input type="number" name="views" onChange={formik.handleChange} />
                    </dt>

                    <dt className="col-2">Category</dt>
                    <dt className="col-10">
                        <select name="category_id" onChange={formik.handleChange}>
                            {
                                categories?.map(category =>
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </option>
                                )
                            }
                        </select>
                    </dt>
                </dl>

                <button className="btn mx-2 btn-primary" type="submit">Add Video</button>
                <Link to={"/admin-dashboard"} className="btn btn-warning">Cancel</Link>
            </form>
        </div>
    )
}