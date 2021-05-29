import React from 'react';
import '../styles/common.css';
import { GoogleLogout } from 'react-google-login';

const clientId = '{Update Client Id}'

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
