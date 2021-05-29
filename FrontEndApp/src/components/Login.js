import React from 'react';
import '../styles/common.css';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../components/RefreshToken';


 const clientId =
   '845236736865-1jjs0us7u16h33l2u9u3aq5m1k02s183.apps.googleusercontent.com'

//const clientId =
  // '621535821907-lh1dlk6bhi2c9mm9oa78signnqot3qvu.apps.googleusercontent.com'

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
    <div class="container">
      <div class="vertical-center">
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