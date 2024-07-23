import React, { lazy, Suspense } from "react";


import { motion } from 'framer-motion';

import { createTheme, ThemeProvider } from '@mui/material';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import './App.scss';
import Login from './components/eTanuComponents/login/login';
import GrayNavbar from './components/gray-navbar/gray-navbar';
import AuthProvider from './context/authContext';
import SearchProvider from './context/searchContext';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import BureauPage from './pages/BureauPage/BureauPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import CreateArticlePage from './pages/CreateArticle/CreateArticlePage';
import DosiePage from './pages/dosPage/DosiePage';
import NewDosiePage from './pages/new-dosie-page';
import OracleTableESF from './pages/ESF/OracleTable/OracleTable';
import History from './pages/eTanu/history/index';
import ETanu from "./pages/eTanu/home";
import Profile from './pages/eTanu/profile/index';
import Result from './pages/eTanu/result';
import ITapPage from './pages/iTapCombatPage/ITapPage';
import MainPage from './pages/mainPage/MainPage';
import NewsPage from './pages/NewsPage/NewsPage';
import OracleTable from "./pages/OracleTable/OracleTable";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SearchPage from './pages/searchPage/SearchPage';
import SupersetPage from "./pages/Superset/SupersetPage";
import UlDosiePage from './pages/ulDosPage/UlDosiePage';
import WorkersPage from './pages/WorkersPage/WorkersPage';
import CSVUpload from "./pages/сsv-upload";
import DataProvider from "./context/dosieDataContext";

function App() {
  const userSession = JSON.parse(localStorage.getItem("user"))

  const RegistrationPage = lazy(() => import('./pages/Registration/RegistrationPage'));
  const SignInPage = lazy(() => import('./pages/SignIn/SignInPage'));
  const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));
  const TableLog = lazy(() => import('./components/itapComponents copy/TableLog/TableLog'));
  const UserDetails = lazy(() => import('./pages/userDetails/userDetails'));
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: 'Montserrat',
      fontSize: 14
    },
  })

  const esfTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: 'Montserrat',
      fontSize: 13
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#0D0F11'
          },
          focused: {
            backgroundColor: '#0D0F11'
          },
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0   0 100px #0D0F11 inset'
            }
          }
        }
      }
    }
  })
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
            <AuthProvider>
              <SearchProvider>
                  <Routes>
                    <Route path="/eTanu" element={<ETanu/>} />
                    <Route path='/eTanu/login' element={<Login />} />
                    <Route path='/eTanu/search/result' element={<Result />} />
                    <Route path="/eTanu/history" element={<History />} />
                    <Route path="/eTanu/profile" element={<Profile />} />
                  </Routes>
              </SearchProvider>
            </AuthProvider>
          <Routes>
            <Route path='/' element={
              <>
                <MainPage/>
              </>
            }/>
            <Route path='/superset' element={
              <>
                <GrayNavbar/>
                <SupersetPage/>
              </>
            }/>
            <Route path='/workers' element={
              <>
                <GrayNavbar/>
                <WorkersPage/>
              </>
            }/>
            <Route path='/article/create' element={
              <>
                <GrayNavbar/>
                <CreateArticlePage/>
              </>
            }/>
            <Route path='/news' element={
              <>
                <NewsPage/>
              </>
            }/>
            <Route path='/article/:id' element={
              <>
                <div style={{height: "12px"}}></div>
                <GrayNavbar/>
                <ArticlePage/>
              </>
            }/>
            <Route path='/calendar' element={
              <>
                <GrayNavbar/>
                <CalendarPage/>
              </>
            }/>
            <Route path='/bureau' element={
              <>
                <GrayNavbar/>
                <BureauPage/>
              </>
            }/>
            <Route path='/profiler' element={
              <>
                <GrayNavbar/>
                <SearchPage/>
              </>
            }/>
            <Route path='/profiler/person/:iin' element={
              <>
                <GrayNavbar/>
                <DosiePage/>
              </>
            }/>
            <Route path='/new-profiler/person/:iin' element={
              <DataProvider>
                <GrayNavbar/>
                <NewDosiePage/>
              </DataProvider>
            }/>
            <Route path='/profiler/ul/:bin' element={
              <>
                <GrayNavbar/>
                <UlDosiePage/>
              </>
            }/>
            <Route path="/itap" element={
              <>
                <GrayNavbar/>
                  <Suspense fallback={<span class="loader"></span>}>
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.2 }}>
                      <ITapPage />
                    </motion.div>
                  </Suspense>
              </>
            } />
            <Route path="/itap/upload-csv" element={
                <>
                  <GrayNavbar/>
                    <Suspense fallback={<span class="loader"></span>}>
                      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.2 }}>
                        <CSVUpload />
                      </motion.div>
                    </Suspense>
                </>
            }/>
            <Route path='/profile' element={
              <>
                <GrayNavbar/>
                <ProfilePage/>
              </>
            }/>
            <Route path='/bureau' element={
              <>
                <GrayNavbar/>
                <BureauPage/>
              </>
            }/>
            <Route path="/registration" element={
              <>

                <GrayNavbar/>
                <Suspense fallback={<span class="loader"></span>}>
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.2 }}>
                    <RegistrationPage/>
                  </motion.div>
                </Suspense>
              </>
            } />
            
          <Route path="/login" element={
            <>
              <Suspense fallback={<span class="loader"></span>}>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.2 }}>
                  <SignInPage />
                </motion.div>
              </Suspense>
            </>
          } />
          {console.log(userSession)}
          <Route path="/table" element={
            <>
              <GrayNavbar/>
              <Suspense fallback={<span className="loader"></span>}>
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.2 }}>
              <TableLog/>
                  </motion.div>
              </Suspense>
            </>
          } />
          <Route path="/admin" element={
            <>
                  <GrayNavbar/>
                  <Suspense fallback={<span class="loader"></span>}>
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.2 }}>
                      <AdminPage/>
                    </motion.div>
                  </Suspense>
                </>
              }/>
          <Route path="/users/:username" element={
            <>
              <GrayNavbar/>
              <Suspense fallback={<span class="loader"></span>}>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: 0.2 }}>
                  <UserDetails/>
                </motion.div>
              </Suspense>
            </>
          }/>
            <Route path='/oracle' element={
              <>
              <GrayNavbar/>
              <OracleTable/>
              </>
            }/>
            <Route path='/esf' element={
              <>
                <GrayNavbar/>
                <OracleTableESF/>
              </>
            }/>
            </Routes>
        </Router>
      </ThemeProvider>
      <ThemeProvider theme={esfTheme}>
        <Router>
          <Routes>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
