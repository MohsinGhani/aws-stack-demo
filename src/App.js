import React from 'react';
import './App.css';
import store from "./store/store";
import { Provider } from "react-redux";
import AppRoutes from "./Routing/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Amplify.configure(awsconfig);

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
