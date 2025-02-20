import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationFailed: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000);
  },[])
  return (
    <main className='VerificationFailed'>
           <div className="container verification-failed">
              <h1>Verification Failed</h1>
              <p>Redirecting to main page in 2 seconds...</p>
              <div className="loader"></div>
          </div>
    </main>
  );
}

export default VerificationFailed;