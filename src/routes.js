import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Start from './Pages/Start'
import DevLogin from './Pages/DevLogin'
import ClientLogin from './Pages/ClientLogin'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/sigin/dev" component={DevLogin} />
        <Route path="/sigin/client" component={ClientLogin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
