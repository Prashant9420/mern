import './App.css';
import ResponsiveAppBar from './components/header/navBar';
import Signup from './components/signUp/signup';
import Home from './components/home/home'
import About from './components/about/about'
import Signin from './components/signIn/signin'
import Contact from './components/contact/contact';
import PageNotFound from './components/pageNotFound/pageNotFound';
import {Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ForegetPass from './components/signIn/forgetPass/forgetpass';
function App() {
  return (
    <div className="App">
    <ResponsiveAppBar/>
      <ToastContainer/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/signin" element={<Signin/>}/>
            <Route exact path="/signin/forgetpass" element={<ForegetPass/>}/>
            <Route path='/*' element={<PageNotFound/>}/>
          </Routes>
    </div>
  );
}

export default App;
