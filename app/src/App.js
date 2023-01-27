import { Routes, Route } from 'react-router-dom'
import './App.css';

import * as userService from './services/authService.js'

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
import { ChatComponent } from './components/chat/Chat';

function App() {
  const [token, setToken] = useState(null)
  const [ontop, setOntop] = useState(false)

  useEffect(() => {
    let getCookie = localStorage.getItem('sessionStorage')

    if (getCookie != null) {
      userService.getUserById(getCookie, undefined)
        .then(res => {
          if (!res.message) {
            setToken({
              token: getCookie,
              _id: res?._id,
              image: res?.image
            })
          } else {
            localStorage.removeItem('sessionStorage')
            setToken(null)
          }
        })
    } else {
      setToken(null)
    }
  }, [])

  const goToTop = () => {
    window.onload = window.scrollTo(0, 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop > 1000) {
        setOntop(true)
      } else {
        if (!ontop) {
          setOntop(false)
        }
      }
    })
  }, [])

  // FINAL STEP IS TO CLEAN USER PASSWORD RETURNED FROM BACKEND AND TO SET LOADING SCREEN!!!
  // AND TO ADD AWESOME SNACKBAR TO SHOW ERROR AND SOME MESSAGES!!!
  return (
    <div className="App">

      <NavigationComponent token={token?.token} setToken={setToken} />

      {ontop && <i onClick={() => goToTop()} className="fa fa-arrow-up btn-to-up"></i>}

      <Routes>

        {token == null
          ?
          <>
            <Route path='/' element={<WelcomeComponent />} />

            <Route path='/login' element={<LoginComponent setToken={setToken} />} />

            <Route path='/register' element={<RegisterComponent />} />
          </>
          :
          <>
            <Route path='/' element={<MainComponent userId={token?._id} token={token.token} image={token.image} />} />

            <Route path='/post/:id' element={
              <section className="container">

                <article className="posts">

                  <PostComponent x={undefined} userId={token?._id} token={token.token} image={token.image} />

                </article>

              </section>
            } />

            <Route path='/chat' element={<ChatComponent token={token.token} _id={token._id} image={token.image} />} />

            <Route path='/training-post/:id' element={<TrainingPostComponent token={token.token} _id={token._id} />} />

            <Route path='/training' element={<TrainingComponent token={token.token} _id={token._id} />} />

            <Route path='/profile' element={<ProfileComponent token={token?.token} userId={token?._id} />} />

            <Route path='/profile/:profileId' element={<ProfileComponent setToken={setToken} token={token?.token} userId={token?._id} />} />
          </>
        }

        <Route path='/about' element={<AboutComponent />} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

      <FooterComponent />

    </div>
  );
}

export default App;
