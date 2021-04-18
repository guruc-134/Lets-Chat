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
            {/* <Chat/> */}
            <div className = 'outsideChat'>
              <p>
                Select an existing chat room 
              </p>
              <p>
                or Create a new Chat room
              </p>
            </div>
            </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
