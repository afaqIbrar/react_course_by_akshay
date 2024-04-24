import React, { lazy, Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
// import About from './components/About';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenuPage from './components/RestaurantMenuPage';
import Cart from './components/Cart';
// import Grocery from './components/Grocery';

const Grocery = lazy(() => import('./components/Grocery'));
const About = lazy(() => import('./components/About'));
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
// chunking
// Code Splitting
// Dynamic bundling
// lazy loading
// on demand loading
// dynamic imoprt

const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = { name: 'Afaq Ibrar' };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <Outlet />
          {/* <Footer /> */}
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        )
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        )
      },
      {
        path: '/restaurants/:resId',
        element: <RestaurantMenuPage />
      },
      {
        path: '/cart',
        element: <Cart />
      }
    ],
    errorElement: <Error />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter}></RouterProvider>);
