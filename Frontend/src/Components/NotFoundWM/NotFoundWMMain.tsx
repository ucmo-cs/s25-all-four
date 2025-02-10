import React from 'react';
import './css/NotFoundWMMain.css'
import { useNavigate } from 'react-router-dom';

const NotFoundWMMain: React.FC = () => {
    const navigate = useNavigate()

  return (
    <section className='NotFoundWMMain'>
         <h1>We couldn't find the page you were looking for. This is either because: </h1>
         <ul>
            <li>There is an error in the URL entered into your web browser. Please check the URL and try again.</li>
            <li>The page you are looking for has been moved or deleted.</li>
         </ul>
         <button onClick={() => navigate('/')}>Go back</button>
    </section>
    
    
    

  );
}

export default NotFoundWMMain;