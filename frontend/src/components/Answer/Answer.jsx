import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const EditAnswerBtn = (props) => {
    return (
        <>
            <button
                type="button"
                className="btn btn btn-sm btn-rounded"
                data-mdb-toggle="modal" data-mdb-target="#edit"
                style={{ background: '#198754', color: '#FFF' }}
                onClick={() => props.getAnswer(props.answer)}
            >
                <i className="fa-solid fa-pen-to-square" style={{ fontSize: '15px' }}></i>
            </button>
        </>
    )
}

const DeleteAnswerBtn = (props) => {
    return (
        <>

            <button
                onClick={() => props.getAnswer(props.answer)}
                type="button"
                className="btn btn-danger btn btn-sm btn-rounded"
                style={{ marginLeft: '10px' }}
                data-mdb-toggle="modal" data-mdb-target="#delete"
            >
                <i className="fa-solid fa-trash" style={{ fontSize: '16px' }}></i>
            </button>
        </>
    )

}

const Answer = () => {
    const location = useLocation();
    const post = location.state[0];
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState('');
    const [answerObj, setAnswerObj] = useState({});
    // let answerObj = {};

    useEffect(() => {
        const fetchAnswers = () => {
            try {
                post.answers.forEach((answer) => {
                    setAnswers([])
                    axios.get(`http://127.0.0.1:8000${answer}`).then((res) => {
                        setAnswers((prevAnswers) => [...prevAnswers, res.data]);
                    });
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchAnswers();
    }, []);


    const addAnswer = () => {
        const baseURL = `http://127.0.0.1:8000/api`;
        const _answer = {
            user: `${baseURL}/users/${localStorage.getItem('userId')}`,
            post: `${baseURL}/posts/${post.id}`,
            answer: answer,
            commentedAt: new Date()
        }

        axios.post(`${baseURL}/answers`, _answer).then(res => {
            setAnswers((prevAnswers) => [...prevAnswers, res.data]);
            document.getElementById('closeAdd').click();
        });
    }

    const deleteAnswer = () => {
        axios.delete(`http://127.0.0.1:8000/api/answers/${answerObj.id}`).then(res => {
            setAnswers(answers.filter(_answer => _answer.id !== answerObj.id));
            document.getElementById('closeDelete').click();
        })
    }

    const editAnswer = () => {
        const baseURL = `http://127.0.0.1:8000/api`;
        const _answer = {
            user: `${baseURL}/users/${localStorage.getItem('userId')}`,
            post: `${baseURL}/posts/${post.id}`,
            answer: answer,
            commentedAt: new Date()
        }

        axios.put(`${baseURL}/answers/${answerObj.id}`, _answer).then(res => {
            setAnswers(answers.filter(a => {
                if (a.id === answerObj.id) a.answer = answer;
                return answer;
            }));
            document.getElementById('closeEdit').click();
        });
    }

    const getAnswer = (answer) => {
        setAnswerObj(answer);
        setAnswer(answer.answer)
    }

    return (
        <>
            <div className="container mt-5">

                <div className="mb-3">
                    <div className="card-body d-flex justify-content-between mb-3">
                        <div className="title">
                            <h5>Answers Of The Problem  : <strong>{post.postTitle}</strong> : </h5>
                        </div>
                        <div className="actions">
                            {/* <Link className="link"> */}
                            <button type="button" className="btn btn-primary btn-sm btn-rounded" data-mdb-toggle="modal" data-mdb-target="#add">
                                <i className="fa-solid fa-plus" style={{ fontSize: '20px' }}></i>
                            </button>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
                {
                    answers.length > 0 &&
                    answers.map(answer => {
                        const parts = answer.user.split("/");
                        const userId = parts[parts.length - 1];

                        const date = new Date(answer.commentedAt);
                        const options = { day: 'numeric', month: 'long', year: 'numeric' };
                        const formattedDate = date.toLocaleDateString('en-US', options);
                        return (
                            <React.Fragment key={answer.id}>
                                <div className="card mb-3">
                                    <div className="card-body d-flex justify-content-between mb-3">
                                        <div className="answer">
                                            {answer.answer.toLowerCase()}
                                        </div>
                                        <div className="d-flex flex-column gap-3">
                                            <div className="actions">
                                                {
                                                    parseInt(localStorage.getItem('userId')) === parseInt(userId) ? <EditAnswerBtn getAnswer={getAnswer} answer={answer} /> : ''
                                                }
                                                {/* </Link> */}

                                                {
                                                    parseInt(localStorage.getItem('userId')) === parseInt(userId) ? <DeleteAnswerBtn getAnswer={getAnswer} answer={answer} /> : ''
                                                }

                                            </div>

                                            <p className="card-text">
                                                <small className="text-muted">{formattedDate}</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>

            <div className="modal fade" id="add" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Provide your answer to this problem </h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                {/* Password input */}
                                <div className="form-outline mb-4">
                                    <input type="text" id="form1Example2" className="form-control"
                                        onChange={(event) => setAnswer(event.target.value)}
                                    />
                                    <label className="form-label" htmlFor="form1Example2">Your Answer</label>
                                </div>

                                {/* Submit button */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal" id="closeAdd">Close</button>
                            <button type="button" className="btn btn-success" onClick={addAnswer}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="edit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Your Answer </h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                {/* Password input */}
                                <div className="form-outline mb-4">
                                    <input value={answer} type="text" id="form1Example2" className="form-control"
                                        onChange={(event) => setAnswer(event.target.value)}
                                    />
                                    <label className="form-label" htmlFor="form1Example2">Your Answer</label>
                                </div>

                                {/* Submit button */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal" id="closeEdit">Close</button>
                            <button type="button" className="btn btn-success" onClick={editAnswer}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="delete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Deleting An Answer </h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <strong>Are u sure About this action</strong>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal" id="closeDelete">Close</button>
                            <button type="button" className="btn btn-danger" onClick={deleteAnswer}>Commit Action</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Answer