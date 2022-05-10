import { useState } from "react";
import axios from "axios";

export const useRequest = (method, url) => {
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetching = async (body = {}) => {
        setStatus(true);

        try {
            const response =
                method === "get"
                    ? await axios.get(url)
                    : method === "post" ? await axios.post(url, body)
                    : method === "delete" ? await axios.delete(url)
                    : await axios.patch(url, body)
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
