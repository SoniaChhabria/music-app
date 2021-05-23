import logo from './logo.svg';
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
    console.log(res)
    var userEmail = "", token=""
    if(res){
      userEmail = res.At.ku;
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
        </header>
        {/* <TabComponent userEmail = {this.state.userEmail} token ={this.state.token}/> */}
        {!this.state.isUseLoggedIn?
          <Login toggleLogin={this.toggleLogin}/>
        :
        <div>
          <Logout toggleLogin={this.toggleLogin}/>
          <br />
          <TabComponent userEmail = {this.state.userEmail} token ={this.state.token}/>
        </div>
        }
       

        
      </div>
    );

  }
  
}

export default App;
