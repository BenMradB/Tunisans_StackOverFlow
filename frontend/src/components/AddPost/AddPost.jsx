import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const [img, setImg] = useState('');
    const [postProblem, setPostProblem] = useState('');
    const navigate = useNavigate();

    const addPost = () => {
        const post = {
            postImage: img,
            postTitle: postProblem,
            postedAt: new Date(),
            user: `http://127.0.0.1:8000/api/users/${localStorage.getItem('userId')}`
        }

        console.log(JSON.stringify(post))

        axios.post('http://127.0.0.1:8000/api/posts', post).then(res => {
            navigate('/posts');
        })
    }

    return (
        <>
            <div className="container mt-5">
                <div className="card mb-3">
                    <div className="img-container"
                        style={
                            {
                                width: '100%',
                                height: '350px',
                                padding: '35px'
                            }
                        }
                    >
                        <img src={img} className="card-img-top" alt="Wild Landscape"
                            style={
                                {
                                    width: '100%',
                                    height: '100%',
                                }
                            }
                        />
                    </div>
                    <div className="card-body">
                        <form>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input type="url" id="form1Example1" className="form-control"
                                    onChange={(event) => setImg(event.target.value)}
                                />
                                <label className="form-label" htmlFor="form1Example1">Image URL</label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-4">
                                <input type="text" id="form1Example2" className="form-control"
                                    onChange={(event) => setPostProblem(event.target.value)}
                                />
                                <label className="form-label" htmlFor="form1Example2">Post Problem</label>
                            </div>

                            {/* Submit button */}
                            <button type="button" onClick={addPost} className="btn btn-success btn-block">Create Your Post Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPost