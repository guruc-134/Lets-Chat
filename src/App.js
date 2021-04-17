import './App.css';
import Chat from './components/chats/Chat';
import React , {useState} from'react';
import Sidebar from './components/sidebar/Sidebar';
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import Login from './components/login/Login';
import { useStateValue } from './StateProvider';
function App() {
    const [{user}, dispatch] = useStateValue();
  return (
    // BEM naming convention
    <div className="app">

      {
        !user ? (<Login/>)
      :(
        <div className='app__body'>
          <Router>
              <Sidebar/>
            <Switch>
            <Route path ='/rooms/:roomId'>
                <Chat/>
            </Route>
            <Route path ="/">
            <Chat/>
            </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
