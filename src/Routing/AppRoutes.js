import React, { useEffect } from "react";
import Routes from "./Routes";
import { useDispatch } from "react-redux";
import { authAction } from "../store/action/index";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAction.isLoggedIn())
  }, [dispatch])

  return <Routes />
}

export default AppRoutes;
