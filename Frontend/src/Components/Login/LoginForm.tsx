import { useNavigate } from 'react-router-dom';
import './css/LoginForm.css';
import { forwardRef, useRef, useState } from 'react';
import { Url, UserInformaion } from './RegisterForm';

const LoginForm = forwardRef<HTMLDivElement, Url>((props, ref) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<UserInformaion | null>(null);
  const errorSpan = useRef<HTMLSpanElement>(null);

  async function Login(): Promise<void> {
    try {
      const response = await fetch(props.url);
      const data: UserInformaion[] = await response.json();

      const userInf = data.find(
        (u) => u.username === username && u.password === password
      );

      if (userInf) {
        localStorage.setItem('UserAC', userInf.securityCode ?? '');
        localStorage.setItem('UserId', userInf.id ?? '');

        setUser(userInf);        
        await ActivateUserStatus(userInf);

        navigate('/application');
      } else {

        if (errorSpan.current) {
          errorSpan.current.style.display = 'block';
          setTimeout(() => {
            if (errorSpan.current) {
              errorSpan.current.style.display = 'none';
            }
          }, 2000);
        }
      }
    } catch (e) {
      alert(e + ' Login part');
    }
  }

  async function ActivateUserStatus(userData: UserInformaion): Promise<void> {
    try {
      const url = props.url + '/' + (userData.id ?? '');
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          loggedIn: true, 
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        console.error('PUT request failed:', message);
      } else {
        console.log('PUT request succeeded');
      }
    } catch (e) {
      alert(e + ' put part');
    }
  }

  return (
    <section ref={ref} className='LoginForm'>
        <h1>Login with your account!</h1>
        <h3>Login using your social networks</h3>
        <div className='sociaMedia'>
          <img src="https://www.svgrepo.com/show/494273/facebook-round.svg" 
               alt="facebook" />
          <img src="https://www.svgrepo.com/show/146973/gmail.svg"
               alt="gmail" />
          <img src="https://www.svgrepo.com/show/494277/instagram-round.svg"
               alt="instagrma" />
        </div>
        <div className='Horizontalline' style={{position: 'relative'}}>
          <div className='Line'></div>
          <p>or</p>
          <div className='Line'></div>
        <span ref={errorSpan} style={{color:'red', marginBlockStart:'1%', display: 'none', position: 'absolute', top: '65%'}}>user not found</span>
        </div>
        <article className='LForm'>          
          <input type='text' placeholder='Email' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button style={{cursor: 'pointer'}} onClick={() => Login()} type='submit'>Login!</button>          
          <p style={{cursor: 'pointer'}} onClick={() => navigate('/')}>Go back to menu</p>
        </article>
        
        
    </section>
    );
  });

export default LoginForm;