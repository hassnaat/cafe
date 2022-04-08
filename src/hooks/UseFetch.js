import axios from "../axiosInstance";
import { useState, useEffect } from "react"

const useFetch = (url, options, dependencies) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(url, options);
                setResponse(res);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error);
            }
        };
        fetchData();
    }, dependencies ? dependencies : []);
    return { response, loading, error };
};

export default useFetch