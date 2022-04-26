import { call, takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import {
    fetchFulfilled,
    fetchPending,
    fetchRejected,
} from "../reducers/fetchReducer";
import { API_URL } from "../../constants/init";

export const FETCH_SAGA = "FETCH_SAGA";

const asyncRequest = async (url, limit, search) => {
    const response = await axios.get(
        `${API_URL}${url}?${search && `status_like=${search}&`}_limit=${limit}`
    );
    return await response.data;
};

function* fetchWorker({ query }) {
    const { url, limit, search } = query;

    try {
        yield put(fetchPending());
        const response = yield call(asyncRequest.bind(null, url, limit, search));
        yield put(fetchFulfilled({ data: response }));
    } catch (error) {
        yield put(fetchRejected({ error: error.response.status }));
    }
}

export default function* fetchWatcher() {
    yield takeLatest(FETCH_SAGA, fetchWorker);
}

export const fetch_saga_action = (query) => {
    return { type: FETCH_SAGA, query };
};
