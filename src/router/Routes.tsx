import { Component, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './config'

class Routers extends Component<{}, {}> {
  state = {}

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {
              routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <route.component
                      routes={route.routes}
                    />
                  }>

                </Route>
              ))
            }
          </Routes>
        </Suspense>
      </BrowserRouter >
    )
  }
}

export default Routers
