import {useState, useCallback} from 'react'
import {useAuth} from "./auth.hook"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {logout} = useAuth()
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()
            if(!response.ok) {
                console.log('logout', logout)
                logout()
                throw new Error(data.message || 'Unknown request error!')
            }
            setLoading(false)
            return data
        } catch (e) {
            console.error('Request Error! ', e)
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [logout])

    const clearError = useCallback(() => setError(false), [])

    return {loading, request, error, clearError}
}