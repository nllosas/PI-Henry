import React from 'react';
import { Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail/Detail';
import RaceCreate from './components/RaceCreate';

function App() {
  return (
    <div className='App'>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/home" component={Home}/>
      <Route path="/create" component={RaceCreate}/>
      <Route path="/home/:id" component={Detail}/>
    </div>
  );
}

export default App;
