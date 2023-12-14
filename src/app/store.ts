import { AnyAction } from "redux";
import { todolistsReducer } from "reducers/todolists-reducer";
import { tasksReducer } from "reducers/tasks-reducer";
import { ThunkAction } from "redux-thunk";
import { appReducer } from "reducers/app-reducer";
import { authReducer } from "reducers/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;

export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;