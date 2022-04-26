import { call, takeLatest, put, apply } from "redux-saga/effects";
import { API_URL, endpoints } from "../../constants/init";
import {
    searchFulfilled,
    searchPending,
    searchRejected,
} from "../reducers/searchReducer";

export const SEARCH_SAGA = "SEARCH_SAGA";

function* searchWorker({ query }) {
    if (query === "") {
        yield put(searchFulfilled({ data: [] }));
    } else {
        try {
            yield put(searchPending());
            const response = yield call(
                fetch,
                `${API_URL}${endpoints.PRODUCTS}?title_like=${query}`
            );
            const parser = yield apply(response, response.json);
            yield put(searchFulfilled({ data: parser }));
        } catch (error) {
            yield put(searchRejected({ error: error.response.status }));
        }
    }
}

export default function* searchWatcher() {
    yield takeLatest(SEARCH_SAGA, searchWorker);
}

export const search_saga_action = (query) => {
    return { type: SEARCH_SAGA, query };
};
