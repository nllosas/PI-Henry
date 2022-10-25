import React from 'react';
import { Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail/Detail';
import BreedCreate from './components/BreedCreate/BreedCreate';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  const realRoutes = ['/', '/create', '/home', '/home/*']
  const redirect = {
    path: '*'
  }
  return (
    <div className='App'>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/create" component={BreedCreate}/>
      <Route path="/home" component={Home}/>
      <Route path="/home/:id" component={Detail}/>
      <Route
        path={redirect.path}
        render={({ location }) => (
          realRoutes.includes(location.pathname) || location.pathname.includes('/home/') ? null : <PageNotFound/>
        )}/>
    </div>
  );
}

export default App;
