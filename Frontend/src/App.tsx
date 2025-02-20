import {Routes, Route, HashRouter } from 'react-router-dom'
import WebMenu from './Pages/WebMenu'
import Login from './Pages/Login'
import LoginAccess from './Pages/LoginAcces'
import RouterApplication from './Components/Dashboard/RouterApplication'
import NotFoundMW from './Pages/NotFoundWM'
import VerificationFailed from './Pages/VerificationFailed'
function App() {  
  return (    
    <HashRouter>
      <Routes>
        <Route path="/" element={<WebMenu/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<h1>About</h1>} />        
        <Route path="/verification" element={<VerificationFailed/>} />        
        <Route path="/application/*" element={<LoginAccess Dashboard={RouterApplication}/>} />                
        <Route path="/*" element={<NotFoundMW/>} />
      </Routes>
    </HashRouter>
  )
}

export default App
