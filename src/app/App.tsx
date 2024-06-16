import React from 'react';
import './App.css';
import { Image } from 'primereact/image';
import Header from '../components/Header/Header';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App" >
      <Header nomeClinica='Carla Criscia Fisioterapia' />
      {isAuthenticated ?
        <span>testando</span>
        :
        <header className="App-header">
          <div className="card flex justify-content-center">
            <Image src="./logo-clinica.png" alt="Image" />
          </div>
        </header>
      }
    </div >
  );
}

export default App;
