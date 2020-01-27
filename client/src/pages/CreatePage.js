import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import 'materialize-css'

const CreatePage = () => {
    const [link, setLink] = useState('')
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    useEffect(() => {
        window.M.updateTextFields()
    })
    const changeLink = evt => setLink(evt.target.value)
    const keyPressHandler = async evt => {
        if (evt.key === "Enter") {
            try {
                const data = await request('api/link/generate', 'POST', {from: link}, {
                    'Authorization': `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
                
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2 padding-top-2rem">
                <div className="input-field">
                    <input
                        placeholder="Enter link"
                        id="link"
                        type="text"
                        value={link}
                        onChange={changeLink}
                        onKeyPress={keyPressHandler}
                    />
                    <label htmlFor="link">Link</label>
                </div>
            </div>
        </div>

    );
};

export default CreatePage;