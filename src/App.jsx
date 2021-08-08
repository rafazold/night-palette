import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Context from './context/context.js';
import Store from './context/store.js';
import routes from './routes.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer/Footer';

const App = () => {
  const store = Store();
  return (
    <Context.Provider value={store}>
      <Router>
        <div className="pt-16 pb-8 min-h-screen bg-black overflow-auto container px-4 mx-auto">
          <ToastContainer />
          <Header />
          <Suspense
            fallback={<div className="font-bold text-xl p-4">Loading...</div>}
          >
            <Switch>
              {routes.map((props, key) => (
                <Route key={key} {...props} />
              ))}
            </Switch>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </Context.Provider>
  );
};

export default App;
