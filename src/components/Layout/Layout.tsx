import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import classes from './Layout.module.scss';

const Layout = () => (
    <div className={classes.layout}>
        <Header />
        <main className={classes.layoutContainer}>
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default Layout;