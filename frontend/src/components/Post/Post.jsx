import React, { useEffect, useState } from 'react';
import Login from '../Auth/Login/Login';
import axios from 'axios';
import './Post.css';
import { Link } from 'react-router-dom';

const DeletePostBtn = (props) => {
    return (
        <>
            <button
                onClick={() => props.deletePost(props.post.id)}
                type="button"
                className="btn btn-danger btn btn-sm btn-rounded"
                style={{ marginLeft: '10px' }}
            >
                <i className="fa-solid fa-trash" style={{ fontSize: '20px' }}></i>
            </button>
        </>
    )
}

const SearchPost = (props) => {
    return (
      <>
        <div className="input-group">
          <div className="form-outline">
            <input type="search" id="form1" className="form-control" 
              onChange={(event) => props.setProblemText(event.target.value)}
            />
            <label className="form-label" htmlFor="form1">Search</label>
          </div>
          <button type="button" className="btn btn-success" onClick={() => props.searchProblem()}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </>
    )
  }

const PostCode = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [problemText, setProblemText] = useState('');


    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/posts');
            setPosts(res.data['hydra:member']);
            setAllPosts(res.data['hydra:member'])
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = (postId) => {
        axios.delete(`http://127.0.0.1:8000/api/posts/${postId}`).then(() => {
            setPosts(posts.filter(post => post.id !== postId));
            setAllPosts(allPosts.filter(post => post.id !== postId))
        })
    };

    // useEffect(() => {
    //     posts.forEach((post) => {
    //         post.answers.forEach((answer) => {
    //             getAnswers(answer);
    //         });
    //     });
    // }, [posts]);

    const searchProblem = () => {
        setPosts(allPosts.filter(post => post.postTitle.toLowerCase().includes(problemText.toLowerCase())))
    }

    return (
        <>
            <div className="container mt-5">
                <div className='search card p-2 mb-3'>
                    <SearchPost posts={posts} searchProblem={searchProblem} setProblemText={setProblemText}/>
                </div>
                <div className="mb-3" style={{ display: 'flex' }}>
                    <Link className="link" to="/add-post">
                        <button type="button" className="btn btn-primary btn-sm btn-rounded">
                            <i className="fa-solid fa-plus" style={{ fontSize: '20px' }}></i>
                        </button>
                    </Link>
                </div>
                {posts.map((post) => {

                    const parts = post.user.split("/");
                    const userId = parts[parts.length - 1];

                    const date = new Date(post.postedAt);
                    const options = { day: 'numeric', month: 'long', year: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);

                    let collapseExample = `#collapseWidthExample${post.id}`;
                    let collapseExampleControls = `collapseWidthExample${post.id}`;

                    return (
                        <React.Fragment key={post.id}>
                            <div className="card mb-3" key={post.id}>
                                <div
                                    style={{ width: '100%', height: '340px', padding: '35px' }}
                                    type="button"
                                    data-mdb-toggle="collapse"
                                    data-mdb-target={collapseExample}
                                    aria-expanded="false"
                                    aria-controls={collapseExampleControls}
                                >
                                    <img
                                        src={post.postImage}
                                        className="card-img-top"
                                        alt="Wild Landscape"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                                <div className="card-body collapse mt-3" id={collapseExampleControls}>
                                    <div className="d-flex justify-content-between">
                                        <div className="btns d-flex flex-md-column gap-5">
                                            <strong className="card-title">Problem: {post.postTitle}</strong>
                                            <div className="btns-container">
                                                <Link className="link" to="/answering/post" state={[post]}>
                                                    <button type="button" className="btn btn-success btn-sm btn-rounded">
                                                        <i className="fa-solid fa-comment" style={{ fontSize: '20px' }}></i>
                                                    </button>
                                                </Link>

                                                {
                                                    parseInt(localStorage.getItem('userId')) === parseInt(userId) ? <DeletePostBtn deletePost={deletePost} post={post} /> : null
                                                }
                                            </div>
                                        </div>
                                        <div className='d-flex flex-md-column gap-5'
                                        >
                                            <p className="card-text">
                                                <small className="text-muted">{formattedDate}</small>
                                            </p>
                                            <div className="answers">
                                                <strong> {post.answers.length} </strong> answer(s)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    );
};

const Post = () => {
    return <>{localStorage.getItem('userId') !== null ? <PostCode /> : <Login />}</>;
};

export default Post;
