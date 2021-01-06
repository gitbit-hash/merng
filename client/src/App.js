import React from 'react'
import { AuthProvider } from './context/auth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import SinglePostPage from './pages/SinglePostPage/SinglePostPage'
import MenuBar from './components/MenuBar/MenuBar'
import UploadImage from './components/UploadImage/UploadImage'
import PrivateRoute from './routes/PrivteRoute'

import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

const App = () => (
  <AuthProvider>
    <Router>
      <Container>
        <MenuBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/posts/:postId' component={SinglePostPage} />
          <PrivateRoute exact path='/upload' component={UploadImage} />
        </Switch>
      </Container>
    </Router>
  </AuthProvider>
);

export default App
