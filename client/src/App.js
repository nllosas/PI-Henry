import React from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail/Detail';
import BreedCreate from './components/BreedCreate/BreedCreate';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  const realRoutes = ['/home', '/create', '/home:id']
  return (
    <div className='App'>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route path="/create" component={BreedCreate}/>
        <Route path="/home/:id" component={Detail}/>
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
