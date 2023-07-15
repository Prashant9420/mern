import './App.css';
import ResponsiveAppBar from './components/header/navbar2';
import Signup from './components/signUp/signup';
import Home from './components/home/home'
import Signin from './components/signIn/signin'
import Contact from './components/contact/contact';
import PageNotFound from './components/pageNotFound/pageNotFound';
import {Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ForegetPass from './components/signIn/forgetPass/forgetpass';
import { useState } from 'react';
function App() {
  const [isSignin,SetIsSignin]=useState((localStorage.userData)?true:false);
  return (
    <div className="App">
    <ResponsiveAppBar loginShown={isSignin} signinChkHandler={SetIsSignin}/>
      <ToastContainer/>
          <Routes>
            <Route exact path="/" element={<Home signinChk={isSignin}/>} />
            <Route exact path="/signup" element={<Signup signinChkHandler={SetIsSignin}/>} />
            <Route exact path="/contact" element={<Contact signinChk={isSignin} />} />
            <Route exact path="/signin" element={<Signin signinChkHandler={SetIsSignin}/>}/>
            <Route exact path="/signin/forgetpass" element={<ForegetPass/>}/>
            <Route path='/*' element={<PageNotFound/>}/>
          </Routes>
    </div>
  );
}

export default App;
