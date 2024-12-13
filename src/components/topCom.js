import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { myObject } from './bridge';

const withNavigation = ({children}) => {  //children: represents the components wrapped by the HOC. Special prop
    
    const navigate = useNavigate();

    useEffect(() => {

      myObject.navigationFun = navigate;


    }, []);

    return children;
    

};

export default withNavigation;



