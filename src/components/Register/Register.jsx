import { useEffect, useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
const Register = () => {
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [rePassword,setRePassword] = useState('');

    const [userFocus,setUserFocus] = useState(false);
    const [mailFocus,setMailFocus] = useState(false);
    const [passwordFocus,setPasswordFocus] = useState(false);
    const [rePasFocus,setRePasFocus] = useState(false);
    
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const EMAIL_REGEX = /^\S+@\S+\.\S+/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#%&*]).{8,24}$/;

    const [infoMsg,setInfoMsg] = useState('');
    const [validName,setValidName] = useState(true);
    const [validMail,setValidMail] = useState(true);
    const [validPassword,setValidPassword] = useState(true);
    const [validRePassword,setValidRePassword] = useState(true);

    const [isLoading,setIsLoading] = useState(false);
    const [sucMsg,setSucMsg] = useState('');
    const [errMsg,setErrMsg] = useState('');

   
    useEffect(()=>{
        const validMatch = username.match(USER_REGEX);
        setErrMsg('');
        setInfoMsg('');
        if(validMatch)
        {
            setInfoMsg('');
            setValidName(true);
        }
        else{
            if(userFocus)
                setInfoMsg('Username should contain atleast 4 characters');
            setValidName(false);
        }
    },[username])

    useEffect(()=>{
        const validMatch = email.match(EMAIL_REGEX);
        setErrMsg('');
        setInfoMsg('');
        if(validMatch){
            setValidMail(true);
            setInfoMsg('');
        }
        else{
            setValidMail(false);
            
            if(mailFocus)
                setInfoMsg('Enter Valid Mail-Id');
        }
    },[email])

    useEffect(()=>{
        const validMatch = password.match(PASSWORD_REGEX);
        setErrMsg('');
        setInfoMsg('');
        if(validMatch)
        {
            setInfoMsg('');
            setValidPassword(true);
        }
        else{
            if(passwordFocus)
                setInfoMsg('Password must contain a number,an alphabet and a special character');
            setValidPassword(false);
        }
    },[password])

    useEffect(()=>{
        const validPwd = password == rePassword;
        setErrMsg('');
        setInfoMsg('');
        if(validPwd && password.length){
            setInfoMsg('');
            setValidRePassword(true);
        }
        else{
            if(rePasFocus)
                setInfoMsg('Passwords should match');
            setValidRePassword(false);
        }
    },[rePassword])

    const handleRegister = async () => {
        try{
            setInfoMsg('');
            setErrMsg('');
            if(!validMail || !validName || !validPassword || !validRePassword)
            {
                setErrMsg('Enter valid details');
                return;
            }
            setIsLoading(true);
            const res = await axios.post('/register',
        JSON.stringify({
            username,email,password
        }),
        {
            headers:{
                Accept: "application/json, text/plain",
                "Content-Type":"application/json"
            }
        }
        );
        setSucMsg('Registration Successful ! Login Now');
        }
        catch(err){
            if (!err.response) {
                setErrMsg("No server response");
              }
            else if (err.response?.status === 409) {
                setErrMsg("You Mail-Id have been already registered");
              }
              else if (err.response?.status === 402) {
                setErrMsg("Username already taken");
              } 
              else {
                setErrMsg("Network error");
              }
        }
        finally{
            setIsLoading(false);
        }
    }
    const handleReset = () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setRePassword('');
    }
    return(
        <section className="register">
            <form onSubmit={(e)=>e.preventDefault()}>
               
                <p className={`info ${infoMsg.length > 0 && 'display'}`}>{infoMsg}</p>

                <p className={`suc ${sucMsg.length > 0 && 'display1'}`}>{sucMsg}</p>

                <p className={`err ${errMsg.length > 0 && 'display2'}`}>{errMsg}</p>
                
                <span >
                <h1>Register</h1>
                {isLoading &&
                    <p>Loading...</p>
                }
                </span>
                <p>
                    <label htmlFor="username">Username : </label>
                    <input className={validName ? 'valid-user' : null} id="username" placeholder="Username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} onBlur={()=>setUserFocus(false)} onFocus={()=>setUserFocus(true)}/>
                </p>
                <p>
                    <label htmlFor="email">Email : </label>
                    <input className={validMail ? 'valid-user' : null} id="email" placeholder="Your Mail-Id" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} onBlur={()=>setMailFocus(false)} onFocus={()=>setMailFocus(true)}/>
                </p>
                <p>
                    <label htmlFor="password">Password : </label>
                    <input className={validPassword ?'valid-user': null} id="password" placeholder="Your Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} onBlur={()=>setPasswordFocus(false)} onFocus={()=>setPasswordFocus(true)}/>
                </p>
                <p style={{marginBottom:"1rem"}}>
                    <label htmlFor="confirm">Confirm Password : </label>
                    <input className={validRePassword ? 'valid-user' : null} id="confirm" placeholder="Re-Enter Password" type="password" value={rePassword} onChange={(e)=>setRePassword(e.target.value)} onBlur={()=>setRePasFocus(false)} onFocus={()=>setRePasFocus(true)}/>
                </p>

                <span>
                <button onClick={()=>handleRegister()} className='submit'>Submit</button>
                <button onClick={()=>handleReset()} className='reset'>Reset</button>
                </span>

                <nav>Already Registered ? <Link to="/login">Login</Link></nav>
            </form>
        </section>
    )
}
export default Register