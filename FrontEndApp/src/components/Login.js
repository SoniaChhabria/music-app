import React from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../components/RefreshToken';

const clientId =
  '845236736865-1jjs0us7u16h33l2u9u3aq5m1k02s183.apps.googleusercontent.com'

function Login(props) {
  const onSuccess = (res) => {
    alert(
      `Logged in successfully welcome ${res.profileObj.name}.`
    );
    console.log(res);
    props.toggleLogin(res);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;