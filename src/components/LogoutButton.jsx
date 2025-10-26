import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

function Logout() {
    const {logout} = useAuth0();
  return (
    <div>
      <button onClick = {()=> logout({logoutParams: {returnTo: window.location.origin }})}>Log Out</button>
    </div>
  )
}

export default Logout
