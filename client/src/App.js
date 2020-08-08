import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser} from './actions/authActions'
import store from './store'
import './App.css'; 
import PrivateRoute from './components/common/private'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/footer'
import Landing from './components/layouts/Landing'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard'
import { decode } from 'querystring';
import { clearCurrentProfile } from './actions/profilesAction';
import NotFound from './components/not-found/NotFound';

//check for token
if(localStorage.jwtToken){
  //set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //decode the token and tget user info and exp
    const decoded = jwt_decode(localStorage.jwtToken)
    //set user and isauthenticated
    store.dispatch(setCurrentUser(decoded))

    //check for expiring token
    const currentTime = Date.now()/1000
    if(decode.exp < currentTime){
           //logout 
           store.dispatch(logoutUser())


           //dispatch clear current profile
           store.dispatch(clearCurrentProfile())

           //todo: clear current Profile
           //redirect to login
           window.location.href = '/login'
    }
}


class App extends Component {
render(){
  return (
    <Provider store = {store}>
    <Router>
    <div className="App">
    <Navbar/>
  <Route exact path="/" component={Landing} />
    <div className="container">
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Switch>
    <PrivateRoute exact path="/dashboard" component= {Dashboard} />
    </Switch>
     
   
    <Route exact path="/not-found" component={NotFound} />
   

    </div>

     <Footer/>
     </div>
    </Router>
    </Provider>
   
  );
}

}

export default App;
