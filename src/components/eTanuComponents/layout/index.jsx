import React from 'react';
import Header from '../../newestComponents/navbar-n';

import './style.scss';

function Layout({ children }) {
    return ( 
        <div className='layout'>
            <Header />
            <div className="container">
                { children }
            </div>
        </div>
    );
}

export default Layout;