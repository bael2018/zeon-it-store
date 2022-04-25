import { spawn, all, call } from "redux-saga/effects";
import bestsellerWatcher from "./bestsellterSaga";
import newArrivalWatcher from "./newArrivalSaga";
import collectionWatcher from "./collectionSaga";
import productWatcher from "./productSaga";
import searchWatcher from "./searchSaga";
import newsWatcher from "./newsSaga";
import fetchWatcher from "./fetchSaga";

export default function* rootSaga() {
    const allSagas = [
        searchWatcher,
        newsWatcher,
        fetchWatcher,
        productWatcher,
        bestsellerWatcher,
        newArrivalWatcher,
        collectionWatcher
    ];

    const retrySagas = yield allSagas.map((saga) => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga);
                    break;
                } catch (error) {
                    console.log(error.message);
                }
            }
        });
    });

    yield all(retrySagas);
}
