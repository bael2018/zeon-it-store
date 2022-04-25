import { call, takeLatest, put } from "redux-saga/effects";
import { API_URL } from "../../constants/init";
import {
    productFulfilled,
    productPending,
    productRejected,
    setProductCount,
} from "../reducers/productReducer";
import axios from "axios";

export const PRODUCT_SAGA = "PRODUCT_SAGA";

const asyncRequest = async (url, limit, page, search = '') => {
    const response = await axios.get(
        `${API_URL}${url}?${search && `q=${search}&`}_limit=${limit}&_page=${page}`
    );
    return await response;
};

function* productWorker({ params }) {
    const { url, limit, page, search } = params;

    try {
        yield put(productPending());
        const response = yield call(asyncRequest.bind(null, url, limit, page, search));
        const total = response.headers['x-total-count']
        yield put(setProductCount({ total }))
        yield put(productFulfilled({ data: response.data }));
    } catch (error) {
        yield put(productRejected({ error: error.message }));
    }
}

export default function* productWatcher() {
    yield takeLatest(PRODUCT_SAGA, productWorker);
}

export const product_saga_action = (params) => {
    return { type: PRODUCT_SAGA, params };
};