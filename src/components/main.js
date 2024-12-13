import React, {useState, useEffect} from 'react';
import NavBar from './navbar';
import CoinPage from './coinPage';
import CoinDisplay from './coinDisplay';
import CategoryBar from './categories';
import Footer from './footer';
import Profile from './profile';
import MainLayout from './mainlayout';
import Login from './login';
import Signup from './signup';
import CategoryBarFiltered from './categoryFiltered';
import ProtectedRoute from './protectedroute';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ErrorPage from './errorPage';
import {myObject} from './bridge';

import TopCom from './topCom';

const CryptoDashboard = () => {

    return (
   
        <Router>
            <TopCom>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<ProtectedRoute/>}> 
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<CoinDisplay />} />
                            <Route path="/coin/:id" element={<CoinPage />} />
                            <Route path="/category" element={<CategoryBar />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path ="/category/:name/:id" element={<CategoryBarFiltered/>}/>
                            <Route path ="/error" element={<ErrorPage/>}/>
                        </Route>
                    </Route>
                </Routes>
            </TopCom>
        </Router>
  
    );
};

export default CryptoDashboard;