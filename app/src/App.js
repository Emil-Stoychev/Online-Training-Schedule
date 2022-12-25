import { Routes, Route } from 'react-router-dom'
import './App.css';


import { PageNotFound } from './components/core/page-not-found/PageNotFound';
import { WelcomeComponent } from './components/welcome/Welcome';
import { FooterComponent } from './components/core/footer/Footer';
import { NavigationComponent } from './components/core/navigation/Navigation';
import { LoginComponent } from './components/login/Login';
import { RegisterComponent } from './components/register/Register';

function App() {
  return (
    <div className="App">

      <NavigationComponent />

      <Routes>

        <Route path='/' element={<WelcomeComponent />} />

        <Route path='/login' element={<LoginComponent />} />

        <Route path='/register' element={<RegisterComponent />} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

      <FooterComponent />

    </div>
  );
}

export default App;
