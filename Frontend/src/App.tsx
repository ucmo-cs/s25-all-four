import {Routes, Route, HashRouter } from 'react-router-dom'
import WebMenu from './Pages/WebMenu'
import Login from './Pages/Login'
import LoginAccess from './Pages/LoginAcces'
import RouterApplication from './Components/Dashboard/RouterApplication'
import NotFoundMW from './Pages/NotFoundWM'

function App() {  
  return (    
    <HashRouter>
      <Routes>
        <Route path="/" element={<WebMenu/>} />
        <Route path="/*" element={<NotFoundMW/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<h1>About</h1>} />        
        <Route path="/application/*" element={<LoginAccess Dashboard={RouterApplication}/>} />                
      </Routes>
    </HashRouter>
  )
}

export default App
