import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import DevLogin from './Pages/DevLogin'
import Start from './Pages/Start'
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/dev-login" component={DevLogin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
