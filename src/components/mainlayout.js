import React from 'react';
import NavBar from './navbar';
import Footer from './footer';
import '../style/footer.css';
import { Outlet } from 'react-router-dom'; 

const MainLayout = () => {
    return (
        <>
            <NavBar />
            <div className="calcRem">
                <Outlet />  
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;