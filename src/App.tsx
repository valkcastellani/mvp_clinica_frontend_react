import React from 'react';
import LoginButton from './components/LoginButton/LoginButton';
import LogoutButton from './components/LogoutButton/LogoutButton';
import Profile from './components/Profile/Profile';
import './App.css';
import { Image } from 'primereact/image';

function App() {
  return (
    <div className="App" >
      <LoginButton />
      <Profile />
      <LogoutButton />
      <header className="App-header">
        <div className="card flex justify-content-center">
          <Image src="./logo-clinica.png" alt="Image" />
        </div>
      </header>
    </div >
  );
}

export default App;
