import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import Header from './components/Header.jsx';

import routes from './routes.js';

const App = () => (
     
  <Router >
      <div className="w-screen mt-16 h-screen bg-black">
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
      </div>
    </Router>
);

export default App;
