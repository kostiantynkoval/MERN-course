import React, {useCallback, useState, useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import Loader from '../components/Loader'
import LinkCard from '../components/LinkCard'
import 'materialize-css'

const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState()
    const linkId = useParams().id

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (e) {

        }
    }, [token, linkId, request])

    useEffect(() => {
        if (window.clientSocket) {
            window.clientSocket.onmessage = function(event) {
                const message = event.data && JSON.parse(event.data)
                if (message.messageType === 'link_changed') {
                    setLink(message.link)
                }
            };
        }
    }, [])

    // const getLink = async () => {
    //     try {
    //         const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
    //             Authorization: `Bearer ${token}`
    //         })
    //         setLink(fetched)
    //     } catch (e) {
    //
    //     }
    // }

    useEffect(() => {
        getLink()
    }, [getLink, token, linkId, request])

    if (loading) {
        return <Loader />
    }
    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    );
};

export default DetailPage;