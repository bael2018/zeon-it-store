import { useCallback, useState } from "react";
import { API_URL } from "../constants/init";
import axios from "axios";

export const useRequest = (method, endpoint) => {
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetching = useCallback(async (body = {}) => {
        setStatus(true);

        try {
            const response =
                method === "get"
                    ? await axios.get(`${API_URL}${endpoint}`)
                    : await axios.post(`${API_URL}${endpoint}`, body);
            setData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setStatus(false);
        }
    }, []);

    return {
        status,
        data,
        error,
        fetching,
    };
};
