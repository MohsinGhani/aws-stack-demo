import React from 'react';
import './App.css';
import store from "./store/store";
import { Provider } from "react-redux";
import AppRoutes from "./Routing/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
