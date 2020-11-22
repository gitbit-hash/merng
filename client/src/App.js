import React from 'react'
import { AuthProvider } from './context/auth'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import MenuBar from './components/MenuBar/MenuBar'

import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

const App = () => (
  <AuthProvider>
    <Router>
      <Container>
        <MenuBar />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route />
      </Container>
    </Router>
  </AuthProvider>
);

export default App
