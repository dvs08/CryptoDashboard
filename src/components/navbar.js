import React, { useState, useEffect} from 'react';
import '../style/navbar.css';
import { Button, Popover } from '@innovaccer/design-system';
import '@innovaccer/design-system/css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        navigate('/login');
    };
   
    return (
        <div className="bar">
            <h2 className="center">Cryptocurrency Dashboard</h2>
            <div className="rightBar">
                <Button onClick={() => navigate('/category')} appearance = "transparent">
                    Category
                </Button>
                <Button onClick={() => navigate('/')} appearance = "transparent">
                    Coins
                </Button>

                <div>
                    <Popover
                        // className="w-25"
                        position="bottom-end"
                        trigger={
                        <div className="d-flex">
                            <Button
                            appearance="transparent"
                            className="ml-3"
                            icon="arrow_drop_down"
                            >
                            Menu
                            </Button>
                        </div>
                        }
                    >
                        <div className="pb-4" style={{paddingLeft:"10px" }}>
                            <div>
                                <div className="Option pl-0 pr-4 cursor-pointer" onClick={() => navigate('/profile')}>Profile</div>
                                <div className="Option pl-0 pr-4 cursor-pointer" onClick={handleLogout}>Sign Out</div>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default NavBar;


