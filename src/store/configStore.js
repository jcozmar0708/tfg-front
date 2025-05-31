import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(rootReducer, {}, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
