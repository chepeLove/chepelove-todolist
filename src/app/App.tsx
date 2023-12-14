import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TodolistList } from "components/todolistsList/TodolistList";
import { Login } from "components/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";
import { Preloader } from "components/preloader/Preloader";
import { Button } from "components/button/Button";
import { ErrorSnackbar } from "components/errorSnackbar/ErrorSnackbar";
import { RequestStatusType } from "reducers/app-reducer";
import { LinearProgress } from "components/linearProgress/LinearProgress";
import { selectAppStatus, selectIsInitialized } from "reducers/app-selectors";
import { authThunks } from "reducers/auth-reducer";

function App() {
  const isInitialized = useAppSelector<boolean>(selectIsInitialized);
  const status = useAppSelector<RequestStatusType>(selectAppStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.me());
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(authThunks.logout());
  }, []);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <>
      {status === "loading" && <LinearProgress />}
      <Button name={"log out"} callBackButton={logoutHandler} />
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<TodolistList />} />
        <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
        <Route path={"*"} element={<Navigate to={"/404"} />} />
      </Routes>
      <ErrorSnackbar />
    </>
  );
}

export default App;