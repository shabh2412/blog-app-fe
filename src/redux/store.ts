import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
	user: userReducer,
});

const middleware = applyMiddleware(thunk);
export const store = legacy_createStore(rootReducer, middleware);

export type RootReducer = ReturnType<typeof rootReducer>;
