import { call, takeLatest, put, select } from "redux-saga/effects";
import {
    bestsellerFinished,
    bestsellerFulfilled,
    bestsellerInit,
    bestsellerPending,
    bestsellerRejected,
} from "../reducers/bestsellerReducer";
import axios from "axios";
import { paths } from "../../constants/paths";
import { API_URL } from "../../constants/init";

export const BESTSELLER_SAGA = "BESTSELLER_SAGA";
const limit = 8;

const asyncRequest = async (page) => {
    const response = await axios.get(
        `${API_URL}products?status_like=Хит продаж&_limit=${limit}&_page=${page}`
    );
    return await response;
};

function* bestsellerWorker({ query }) {
    try {
        const { data, page } = yield select((state) => state.best);

        if (data.length === 0) {
            yield put(bestsellerPending());
        }

        const response = yield call(asyncRequest.bind(null, page));
        const totalCount = response.headers["x-total-count"];

        if (page === 1 && data.length > 1 && query === paths.MAIN) {
            yield put(bestsellerInit({ data: response.data }));
        } else {
            yield put(bestsellerFulfilled({ data: response.data }));
        }

        if (totalCount - data.length <= limit) {
            yield put(bestsellerFinished({ finished: true }));
        }
    } catch (error) {
        yield put(bestsellerRejected({ error: error.message }));
    }
}

export default function* bestsellerWatcher() {
    yield takeLatest(BESTSELLER_SAGA, bestsellerWorker);
}

export const bestseller_saga_action = (query) => {
    return { type: BESTSELLER_SAGA, query };
};
