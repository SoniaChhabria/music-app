import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '845236736865-1jjs0us7u16h33l2u9u3aq5m1k02s183.apps.googleusercontent.com'

function Logout(props) {
  const onSuccess = () => {
    alert('Logout made successfully ✌');
    props.toggleLogin();
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
