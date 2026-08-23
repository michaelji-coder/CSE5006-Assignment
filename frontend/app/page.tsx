'use client'
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div>
        <Header />
        <p>Welcome to the RSS Feed Assignment</p>
        <p>Please use the navigation menu to explore the different sections.</p>
        <Footer />
    </div>
  );
};

export default App;