import { API_URL } from "../constants/init";
import { useState } from "react";
import axios from "axios";

export const useRequest = (method, endpoint) => {
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetching = async (body = {}) => {
        setStatus(true);

        try {
            const response =
                method === "get"
                    ? await axios.get(`${API_URL}${endpoint}`)
                    : await axios.post(`${API_URL}${endpoint}`, body);
            setData(response.data);
        } catch ({ response }) {
            setError(response.status);
        } finally {
            setStatus(false);
        }
    };

    return {
        status,
        data,
        error,
        fetching,
    };
};
