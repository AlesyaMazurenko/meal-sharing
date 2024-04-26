import React from 'react';
import './Layout.css';
import { AppBar } from '../Appbar/Appbar';

export const Layout = () => {
    return (
        <>
            <header className='navbar'>
                <AppBar />
            </header>  
        </>
    )
}