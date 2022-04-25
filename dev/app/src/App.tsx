import React from 'react';
import { 
  BrowserRouter,
  Switch,
  Route,
 } from 'react-router-dom';
import Home from './pages/Home'
import PoolPage from './pages/PoolPage';
import './tailwind.css';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pool" component={ PoolPage }/>
        <Route path="/" component={ Home }/>
      </Switch>
    </BrowserRouter>
  );
}
export default App
