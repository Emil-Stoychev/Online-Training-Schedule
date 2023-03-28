import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './App.css';

import { io } from 'socket.io-client'

import useGlobalErrorsHook from './hooks/useGlobalErrors';

import * as userService from './services/authService.js'

import { PageNotFound } from './components/core/page-not-found/PageNotFound';
import { FooterComponent } from './components/core/footer/Footer';
import { NavigationComponent } from './components/core/navigation/Navigation';

import { LoginComponent } from './components/login/Login';
import { RegisterComponent } from './components/register/Register';

import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';

const LazyMainComponent = lazy(() => import('./components/main/Main'))
const LazyWelcomeComponent = lazy(() => import('./components/welcome/Welcome'))
const LazyTrainingComponent = lazy(() => import('./components/training/Training'))
const LazyAboutComponent = lazy(() => import('./components/about/About'))
const LazyProfileComponent = lazy(() => import('./components/profile/Profile'))
const LazyPostComponent = lazy(() => import('./components/main/post/Post.js'))
const LazyTrainingPostComponent = lazy(() => import('./components/main/training-post/Training-post'))
const LazyChatComponent = lazy(() => import('./components/chat/Chat.js'))
const LazyEditProgramComponent = lazy(() => import('./components/training/edit-program/Edit-program'))
const LazySearchComponent = lazy(() => import('./components/search/SearchComponent.js'))

function App() {
  const [token, setToken] = useState(null)
  const [ontop, setOntop] = useState(false)
  const [soundNotification, setSoundNotification] = useState(false)
  const [newNot, setNewNot] = useState(0)
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef(null)

  let [errors, setErrors] = useGlobalErrorsHook()
  useEffect(() => {
    let getCookie = localStorage.getItem('sessionStorage')

    if (getCookie != null) {
      userService.getUserById(getCookie, undefined)
        .then(res => {
          if (!res.message) {
            setToken({
              token: getCookie,
              _id: res?._id,
              email: res?.email,
              username: res?.username,
              image: res?.image,
            })
            console.log(res?.soundNotification);
            setSoundNotification(res?.soundNotification)
          } else {
            setErrors({ message: res.message, type: '' })

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
    socket.current = io(`http://${window.location.hostname}:8800`)
    socket.current?.emit("newUser", token?._id)
    socket.current?.on('get-users', (users) => {
      setOnlineUsers(users)
    })
  }, [socket, token])

  useEffect(() => {
    if (token != null) {
      setErrors({ message: token?.username, type: 'logged' })
    }
  }, [token])

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

  return (
    <div className="App">

      <NavigationComponent token={token?.token} setToken={setToken} userId={token?._id} newNot={newNot} setNewNot={setNewNot} socket={socket} soundNotification={soundNotification} />

      {ontop && <i onClick={() => goToTop()} className="fa fa-arrow-up btn-to-up"></i>}

      <Routes>

        {token == null
          ?
          <>
            <Route path='/' element={<Suspense fallback={<LoadingSpinner />}><LazyWelcomeComponent /></Suspense>} />

            <Route path='/login' element={<LoginComponent setToken={setToken} />} />

            <Route path='/register' element={<RegisterComponent />} />
          </>
          :
          <>
            <Route path='/' element={<Suspense fallback={<LoadingSpinner />}><LazyMainComponent socket={socket} userId={token?._id} token={token.token} image={token.image} /></Suspense>} />

            <Route path='/post/:id' element={
              <section className="container">

                <article className="posts">

                  <Suspense fallback={<LoadingSpinner />}>
                    <LazyPostComponent socket={socket} x={undefined} userId={token?._id} token={token.token} image={token.image} />
                  </Suspense>

                </article>

              </section>
            } />

            <Route path='/search' element={<Suspense fallback={<LoadingSpinner />}><LazySearchComponent token={token.token} _id={token._id} onlineUsers={onlineUsers} /></Suspense>} />

            <Route path='/chat' element={<Suspense fallback={<LoadingSpinner />}><LazyChatComponent token={token.token} _id={token._id} image={token.image} onlineUsers={onlineUsers} socket={socket} /></Suspense>} />

            <Route path='/training-post/:id' element={<Suspense fallback={<LoadingSpinner />}><LazyTrainingPostComponent token={token.token} _id={token._id} socket={socket} /></Suspense>} />

            <Route path='/training' element={<Suspense fallback={<LoadingSpinner />}><LazyTrainingComponent token={token.token} _id={token._id} /></Suspense>} />

            <Route path='/training-edit-program/:trainingId' element={<Suspense fallback={<LoadingSpinner />}><LazyEditProgramComponent token={token.token} userId={token._id} /></Suspense>} />

            <Route path='/profile' element={<Suspense fallback={<LoadingSpinner />}><LazyProfileComponent token={token?.token} userId={token?._id} email={token?.email} socket={socket} onlineUsers={onlineUsers} setSoundNotification={setSoundNotification} soundNotification={soundNotification} /></Suspense>} />

            <Route path='/profile/:profileId' element={<Suspense fallback={<LoadingSpinner />}><LazyProfileComponent setToken={setToken} token={token?.token} userId={token?._id} socket={socket} onlineUsers={onlineUsers} setSoundNotification={setSoundNotification} soundNotification={soundNotification} /></Suspense>} />
          </>
        }

        <Route path='/about' element={<Suspense fallback={<LoadingSpinner />}><LazyAboutComponent /></Suspense>} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

      <FooterComponent />

    </div>
  );
}

export default App;
