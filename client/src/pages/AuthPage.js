import React, {useContext, useEffect, useState} from 'react';
import 'materialize-css'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    const changeForm = event => setForm({...form, [event.target.name]: event.target.value})

    const submitAuthForm = async evt => {
        try {
            const targetName = evt.target.name
            const data = await request(`/api/auth/${targetName}`, 'POST', {...form})
            if (targetName === 'login') {
                auth.login(data.token, data.userId)
            }
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeForm}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeForm}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            name="login"
                            onClick={submitAuthForm}
                            className="btn yellow darken-4 margin-right-10"
                            disabled={loading}
                        >Login</button>
                        <button
                            name="register"
                            className="btn grey lighten-1 black-text"
                            onClick={submitAuthForm}
                            disabled={loading}
                        >Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;