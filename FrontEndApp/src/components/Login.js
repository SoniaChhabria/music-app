import React from 'react';
import '../styles/common.css';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../components/RefreshToken';


 const clientId = '{Update Client IDd}'

function Login(props) {
  const onSuccess = (res) => {
    props.toggleLogin(res);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    alert(
      `Failed to login.`
    );
  };

  return (
    <div className="container">
      <div className="vertical-center">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        className="sign-in-button"
      />
    </div>
  </div>

  );
}

export default Login;