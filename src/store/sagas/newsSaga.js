import { call, takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import {
    newsFulfilled,
    newsPending,
    newsRejected,
    setIsFetching,
    setNewsPage,
    setNewsTotalCount,
} from "../reducers/newsReducer";
import { API_URL } from "../../constants/init";

export const NEWS_SAGA = "NEWS_SAGA";

const request = async (page) => {
    const response = await axios.get(
        `${API_URL}news?_limit=8&_page=${page}`
    );
    return await response;
};

function* newsWorker() {
    try {
        const { page, data } = yield select((state) => state.news);
        if(data.length === 0){
            yield put(newsPending());
        }
        const response = yield call(request.bind(null, page));
        const totalCount = response.headers['x-total-count']

        if(data.length < totalCount){
            yield put(newsFulfilled({ data: response.data }));
            yield put(setNewsPage({ page: page + 1 }))
            yield put(
                setNewsTotalCount({ count: totalCount })
            );
            yield put(setIsFetching({ fetching: false }))    
        }
    } catch (error) {
        yield put(newsRejected(error.message));
    }
}

export default function* newsWatcher() {
    yield takeLatest(NEWS_SAGA, newsWorker);
}

export const news_saga_action = (query) => {
    return { type: NEWS_SAGA, query };
};