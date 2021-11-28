import { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { RouteModel } from '~/common/sharedModel';
import routes from './config';

const Routers = () => {
  // let redirectPath = '';

  const getRouteList = (routes: RouteModel[], prePath: string) => {
    let redirectPath = '';
    if (!routes || routes.length === 0) {
      return;
    }
    return (
      <>
        {routes.map(route => {
          if (route.index) {
            redirectPath = route.path;
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component routes={route.routes ? route.routes : []} />}>
              {
                route.routes && getRouteList(route.routes, route.path)
              }
            </Route>
          );
        })}
        {
          redirectPath !== '' && (
            <Route path={prePath} element={<Navigate replace to={redirectPath} />} />
          )
        }
      </>
    );
  };
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {
            getRouteList(routes, '/')
          }
          {/* <Route path='/' element={<Navigate replace to={redirectPath} />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter >
  )
}

export default Routers
