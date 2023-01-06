import { Routes, Route } from 'react-router-dom'
import './App.css';


import { PageNotFound } from './components/core/page-not-found/PageNotFound';
import { WelcomeComponent } from './components/welcome/Welcome';
import { FooterComponent } from './components/core/footer/Footer';
import { NavigationComponent } from './components/core/navigation/Navigation';
import { LoginComponent } from './components/login/Login';
import { RegisterComponent } from './components/register/Register';
import { TrainingComponent } from './components/training/Training';
import { AboutComponent } from './components/about/About';
import { ProfileComponent } from './components/profile/Profile';
import { MainComponent } from './components/main/Main';
import { PostComponent } from './components/main/post/Post';
import { TrainingPostComponent } from './components/main/training-post/Training-post';
import { useEffect, useState } from 'react';

function App() {
  const [cookie, setCookie] = useState(null)

  useEffect(() => {
    let getCookie = localStorage.getItem('sessionStorage')

    if (getCookie != '') {
      setCookie(getCookie)
    } else {
      setCookie(null)
    }
  }, [cookie])

  return (
    <div className="App">

      <NavigationComponent cookie={cookie} setCookie={setCookie} />

      <Routes>

        {cookie != null
          ? <Route path='/' element={<MainComponent />} />
          : <Route path='/' element={<WelcomeComponent />} />
        }

        <Route path='/post/:id' element={
          <section className="container">

            <article className="posts">

              <PostComponent />

            </article>

          </section>
        } />

        <Route path='/training-post/:id' element={<TrainingPostComponent />} />

        <Route path='/training' element={<TrainingComponent />} />

        <Route path='/about' element={<AboutComponent />} />

        <Route path='/profile' element={<ProfileComponent />} />

        <Route path='/login' element={<LoginComponent setCookie={setCookie} />} />

        <Route path='/register' element={<RegisterComponent />} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

      <FooterComponent />

    </div>
  );
}

export default App;
