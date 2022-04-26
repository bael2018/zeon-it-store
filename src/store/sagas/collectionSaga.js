import { call, takeLatest, put, select } from "redux-saga/effects";
import { paths } from "../../constants/paths";
import axios from "axios";
import {
    collectionFinished,
    collectionFulfilled,
    collectionInit,
    collectionPending,
    collectionRejected,
} from "../reducers/collectionReducer";
import { API_URL, endpoints } from "../../constants/init";

export const COLLECTION_SAGA = "COLLECTION_SAGA";
const limit = 4;

const asyncRequest = async (page) => {
    const response = await axios.get(
        `${API_URL}${endpoints.COLLECTIONS}?_limit=${limit}&_page=${page}`
    );
    return await response;
};

function* collectionWorker({ query }) {
    try {
        const { data, page } = yield select((state) => state.collection);

        if (data.length === 0) {
            yield put(collectionPending());
        }

        const response = yield call(asyncRequest.bind(null, page));
        const totalCount = response.headers["x-total-count"];

        if (page === 1 && data.length > 1 && query === paths.MAIN) {
            yield put(collectionInit({ data: response.data }));
        } else {
            yield put(collectionFulfilled({ data: response.data }));
        }

        if (totalCount - data.length <= limit) {
            yield put(collectionFinished({ finished: true }));
        }
    } catch (error) {
        yield put(collectionRejected({ error: error.message }));
    }
}

export default function* collectionWatcher() {
    yield takeLatest(COLLECTION_SAGA, collectionWorker);
}

export const collection_saga_action = (query) => {
    return { type: COLLECTION_SAGA, query };
};
