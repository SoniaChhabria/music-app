import './App.css';
import Login from './components/Login'
import Logout from './components/Logout'

import TabComponent from './components/TabComponent';
import { Component } from 'react';


class App extends Component {
  constructor(){
    super();
    this.state={
      isUseLoggedIn: false,
      userEmail: "",
      token:""
    }
    this.toggleLogin = this.toggleLogin.bind(this);
  }
  toggleLogin(res){
    //if logged-in, get User Email and Token and toggle isUseLoggedIn
    var userEmail = "", token=""
    if(res){
      userEmail = res.profileObj.email;
      token =  res.tokenId
    }
    this.setState(prevState => ({
      isUseLoggedIn: !prevState.isUseLoggedIn,
      userEmail: userEmail,
      token: token
    }))
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          Music App
          {this.state.isUseLoggedIn?
          <div style={{marginTop:"50px", marginLeft:"60%", position:"absolute", display: "inline-block"}}>
          <div className="user-text">{this.state.userEmail}!</div>
          <br></br>
          <Logout toggleLogin={this.toggleLogin}/>
          </div>
          :""}
        </header>
        {!this.state.isUseLoggedIn?
          <Login toggleLogin={this.toggleLogin}/>
        :
        <div>
          <TabComponent userEmail = {this.state.userEmail} token ={this.state.token}/>
        </div>
        }
       

        
      </div>
    );

  }
  
}

export default App;
