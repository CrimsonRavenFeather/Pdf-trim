import './App.css';
import Header from './Component/Header';
import Login from './Component/Login';
import Upload from './Component/Upload';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { LoginInfoProvider } from './Context/LoginContext';



function App() {
  return (
    <>
      <LoginInfoProvider>
        <Router>
          <Header></Header>
          <Routes>
            <Route path='/' element={<Upload />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </Router>
      </LoginInfoProvider>
    </>
  );
}

export default App;
