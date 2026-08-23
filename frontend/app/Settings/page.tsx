'use client'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ThemeToggle from '../Components/ThemeToggle';

const Settings = () => {

    return (
        <div>
            <Header />
            <div>
                <h1>Settings</h1>
                <p>This is the settings page.</p>
                <ThemeToggle />
            </div>
            <Footer />
        </div>
    );
}
export default Settings;