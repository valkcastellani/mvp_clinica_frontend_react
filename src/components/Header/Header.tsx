import React from 'react';
import './Header.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

export interface HeaderProps {
    nomeClinica: string
}

const Header = (props: HeaderProps) => {
    const { logout, loginWithRedirect, user } = useAuth0();

    return (
        <header className="header">
            <div className="logo">
                <h1>{props.nomeClinica}</h1>
            </div>
            <nav className="nav">
                <ul className='center-text'>
                    {(user ?
                        <>
                            <li><Avatar image={user?.picture} size="large" shape="circle" /></li>
                            <li id="user-name">Olá, {user.name}!</li>
                            <li><Button label='Logout' onClick={() => logout()} /></li>
                        </>
                        :
                        <li><Button label='Login' onClick={() => loginWithRedirect()} /></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;