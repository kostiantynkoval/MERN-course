import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";
import 'materialize-css'

const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const fetched = await request('/api/link', 'GET', null,  {
                    Authorization: `Bearer ${token}`
                })
                setLinks(fetched)
            } catch (e) {}
        }
        fetchLink()
    }, [token, request])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    );
};

export default LinksPage;