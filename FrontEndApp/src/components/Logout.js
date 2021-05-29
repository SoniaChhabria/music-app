import React from 'react';
import '../styles/common.css';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '845236736865-1jjs0us7u16h33l2u9u3aq5m1k02s183.apps.googleusercontent.com'

//const clientId =
  //'621535821907-lh1dlk6bhi2c9mm9oa78signnqot3qvu.apps.googleusercontent.com'

function Logout(props) {
  const onSuccess = () => {
    props.toggleLogin();
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        className="logout-button"
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
