import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Start from './Pages/Start'
import DevLogin from './Pages/DevLogin'
import ClientLogin from './Pages/ClientLogin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/sigin/dev" exact component={DevLogin} />
        <Route path="/sigin/client" exact component={ClientLogin} />
        <Route path="/signup/dev" exact component={Signup} />
        <Route path="/dashboard/dev" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
