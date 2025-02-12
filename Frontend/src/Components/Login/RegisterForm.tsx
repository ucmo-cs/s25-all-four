import './css/RegisterForm.css';
import './css/checkbox.css';
import facebook from './img/Facebook.svg'
import instagram from './img/instagram.svg'
import gmail from './img/gmail.svg'
import { useNavigate } from 'react-router-dom';
import { forwardRef, useRef, useState } from 'react';

export interface Url{
  url: string;
}
export interface UserInformaion{
  id?: string;
  username: string;
  password: string;
  email: string;
  nickName: string | null;
  address: string | null;
  phone: string | null;
  position: string;
  birthday: Date | null;
  information: string | null;
  securityCode: string | null;
  loggedIn: boolean;
}
const RegisterForm = forwardRef<HTMLDivElement, Url>((props, ref) => {

  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [r_password, setR_password] = useState<string>('')
  const [admin, setAdmin] = useState<string>('user');
  const [adminCode, setAdminCode] = useState<number>(0)
  const isAdmin = useRef<HTMLInputElement>(null);
  const errorSpan = useRef<HTMLSpanElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('error')
  async function CheckInputs(): Promise<void>{    

    const users: UserInformaion[] = await GetAllUsers();
    
    if(password === '' || username === '' || email === '' || r_password === ''){
      setErrorMessage('Please fill all inputs')
      errorSpan.current!.style.display = 'block';
      setTimeout(() => {            
          errorSpan.current!.style.display = 'none';     
          setErrorMessage('error')       
      }, 2000);
      return
    }
    if(password !== r_password) {
      setErrorMessage('Both passwords must match')
      errorSpan.current!.style.display = 'block';
      setTimeout(() => {            
          errorSpan.current!.style.display = 'none';     
          setErrorMessage('error')       
      }, 2000);
      return
    }
    if(users.find(user => user.email === email)) {
      setErrorMessage('Provided email is already in use')
      errorSpan.current!.style.display = 'block';
      setTimeout(() => {            
          errorSpan.current!.style.display = 'none';     
          setErrorMessage('error')       
      }, 2000);
      return
    }
    if(users.find(user => user.username === username)) {
      setErrorMessage('Provided username is already in use')
      errorSpan.current!.style.display = 'block';
      setTimeout(() => {            
          errorSpan.current!.style.display = 'none';            
          setErrorMessage('error')       
      }, 2000);
      return
    }
    if(isAdmin.current?.value === 'admin' && adminCode !== 12451){
      setErrorMessage('Provided correct administrator code')
      errorSpan.current!.style.display = 'block';
      setTimeout(() => {            
          errorSpan.current!.style.display = 'none';            
          setErrorMessage('error')       
      }, 2000);
      return      
    }
    await SendUsernDB()
  }

  async function GetAllUsers(): Promise<UserInformaion[]> {
      try{
        const response = await fetch(props.url)
        const data: UserInformaion[] = await response.json();
        return data;
      }catch(e){
        alert(e)
        return [];
      }
  }

  async function SendUsernDB(): Promise<void>{
    try{
      const response = await fetch(props.url,{
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(CreateUserInformation())
      });
  
      if(response.ok) console.log('Evertying worked OK')
      if(!response.ok) console.log('Evertying Failed')
    } catch(e){
      alert(e + "server error");
    } finally{
      setUsername('')
      setEmail('')
      setPassword('')
      setR_password('');

      setErrorMessage('User successfully created!')       
      errorSpan.current!.style.display = 'block';
      errorSpan.current!.style.color = 'green';
      setTimeout(() => {            
          errorSpan.current!.style.display = 'none';            
          errorSpan.current!.style.color = 'red';
          setErrorMessage('error')       
      }, 5000);
    }
  }

  function CreateUserInformation(): UserInformaion{
    return{
      username: username.toLowerCase().trim(),
      password: password.trim(),
      email: email.toLowerCase().trim(),
      nickName: null,
      address: null,
      phone: null,
      position: admin,
      birthday: null,
      information: null,
      securityCode: null,
      loggedIn: false
    }
  }

  return (
    <section className='RegisterForm' ref={ref}>
         <h1>Create your account!</h1>
         <h3>Create an account using your social networks</h3>
         <div className='sociaMedia'>
          <img src={facebook} 
               alt="facebook" />
          <img src={gmail}
               alt="gmail" />
          <img src={instagram}
               alt="instagrma" />
        </div>        
        <div className='Horizontalline'>
          <div className='Line'></div>
          <p>or</p>
          <div className='Line'></div>
          <span ref={errorSpan} style={{
            color:'red', 
            marginBlockStart:'0%', 
            display: 'none', 
            position: 'absolute', 
            top: '25%',
            backgroundColor: 'white',
            height: 'fit-content',
            width: 'fit-content',
            border: '1px solid gray',
            padding: '0.3em',
            borderRadius: '0.25em'
            }}>
              {errorMessage}
          </span>
        </div>
        <article className='RForm'>
          <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type='text' placeholder='Email'value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={(e) =>setPassword(e.target.value)}/>
          <input type='password' placeholder='Repeat password' value={r_password} onChange={(e) => setR_password(e.target.value)}/>
          <div className='AdminInput'>
            <div className="checkbox-apple">
                <input className="yep" ref={isAdmin} onClick={() => setAdmin(isAdmin.current?.checked ? "admin" : "user")} id="check-apple" type="checkbox" />
                <label htmlFor="check-apple" /> 
            </div>
            <input type="number" value={admin} onChange={(e) => setAdminCode(Number(e.target.value))} style={{height:'35%'}} placeholder='Are you an admin?'/>
          </div>
          <button style={{cursor: 'pointer'}} onClick={CheckInputs} type='submit'>Create account!</button>          
          <p style={{cursor: 'pointer'}} onClick={() => navigate('/')}>Go back to menu</p>
        </article>        
    </section>
    );
});

export default RegisterForm;