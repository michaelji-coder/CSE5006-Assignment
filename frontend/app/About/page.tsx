'use client'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const About = () => {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1>About Us</h1>
        <p>This is a simple RSS feed project built with Next.js and Bootstrap.</p>
        <p>It demonstrates the frontend implimentation at the moment with serverside components to come in future assignments. </p>
        <video width="560" height="315" controls className="rounded shadow">
            <source src="/Assets/Video/Demonstration.mp4" type="video/mp4" />
          </video>
      </div>
      <Footer />
    </div>
  );
};

export default About;
