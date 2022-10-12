import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';

function App() {
  return (
    <React.Fragment>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home}/>
        <Route path="/dogs/:id" component={Detail}/>
    </React.Fragment>
  );
}

export default App;
