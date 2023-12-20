import './App.css'
import { Routes,Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RequireAuth from './hooks/RequireAuth';
import Profile from './components/Profile/Profile';
import UpdateAge from './components/Update/Age/UpdateAge';
import UpdateGender from './components/Update/Gender/UpdateGender';
import UpdateDOB from './components/Update/DoB/UpdateDOB';
import UpdateMobile from './components/Update/Mobile/UpdateMobile';
function App() {
  return (
    
        <Routes>
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Profile />} />
              <Route path='/updateage' element={<UpdateAge />} />
              <Route path='/updategender' element={<UpdateGender />} />
              <Route path='/updatedob' element={<UpdateDOB />} />
              <Route path='/updatemobile' element={<UpdateMobile />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    
  )
}

export default App
