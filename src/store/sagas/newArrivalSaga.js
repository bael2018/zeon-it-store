import { call, takeLatest, put, select } from "redux-saga/effects";
import { paths } from "../../constants/paths";
import axios from "axios";
import {
    newArrivalFulfilled,
    newArrivalInit,
    newArrivalPending,
    newArrivalRejected,
    setNewArrivalFinished,
} from "../reducers/newArrivalReducer";
import { API_URL } from "../../constants/init";

export const NEWARRIVAL_SAGA = "NEWARRIVAL_SAGA";
const limit = 4;

const asyncRequest = async (page) => {
    const response = await axios.get(
        `${API_URL}products?status_like=Новинки&_limit=${limit}&_page=${page}`
    );
    return await response;
};

function* newArrivalWorker({ query }) {
    try {
        const { data, page } = yield select((state) => state.new);

        if (data.length === 0) {
            yield put(newArrivalPending());
        }

        const response = yield call(asyncRequest.bind(null, page));
        const totalCount = response.headers["x-total-count"];

        if (page === 1 && data.length > 1 && query === paths.MAIN) {
            yield put(newArrivalInit({ data: response.data }));
        } else {
            yield put(newArrivalFulfilled({ data: response.data }));
        }

        if (totalCount - data.length <= limit) {
            yield put(setNewArrivalFinished({ finished: true }));
        }
    } catch (error) {
        yield put(newArrivalRejected({ error: error.message }));
    }
}

export default function* newArrivalWatcher() {
    yield takeLatest(NEWARRIVAL_SAGA, newArrivalWorker);
}

export const newArrival_saga_action = (query) => {
    return { type: NEWARRIVAL_SAGA, query };
};
