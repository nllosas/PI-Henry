import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <React.Fragment>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home}/>
    </React.Fragment>
  );
}

export default App;
