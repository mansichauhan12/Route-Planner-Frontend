
import react, { useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import RoutePlanner from './pages/RoutePlanner';

const app = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<RoutePlanner />} />

        </Routes>
      </div>
    </Router>
  )
}

export default app;


