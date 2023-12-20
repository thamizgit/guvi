import { Link,useLocation,useNavigate} from 'react-router-dom';
import './Login.css';
import axios from '../../api/axios';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [errMsg,setErrMsg] = useState('');
    const [lastfocus,setLastFocus] = useState('');
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
        setIsLoading(true);
        const res = await axios.post('/login',
        JSON.stringify({
            email,password
        }),
        {
            headers:{
                Accept: "application/json, text/plain",
                "Content-Type":"application/json"
            }
        }
        );
        
        console.log(res?.data);
        
        setAuth(res.data);
       
        
        navigate(from,{replace: true});

        }
        catch(err){
            if (!err?.response)
                setErrMsg('No server response')
            else if (err.response?.status === 400)
                setErrMsg('Missing username or password')
            else if (err.response?.status === 401)
                setErrMsg('Incorrect username or password')
            else
                setErrMsg('Login failed')
        }
        finally{
            setIsLoading(false);
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        if(lastfocus == 'email'){
            setEmail('');   
        }
        else
            setPassword('');
    }
    return(
        <section className="login">
            
            <form>
                {errMsg && (
                <p className='err-msg'>{errMsg}</p>
                            )
                }
                <span>
                <h1>Login</h1>
                
                {isLoading &&
                   <p>Loading...</p>
                }
                </span>
                <p>
                <label htmlFor="email">Email :</label>
                <input id="email" placeholder="Your Email" type="text" autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} onFocus={()=>setLastFocus('email')} />
                </p>

                <p>
                <label htmlFor="password">Password: </label>
                <input id="password" placeholder="Your Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} onFocus={()=>setLastFocus('pass')} />
                </p>

                <span>
                <button onClick={(e)=>handleSubmit(e)} className='go'>Go</button>
                <button onClick={(e)=>handleReset(e)} className='reset'>Reset</button>
                </span>

                <p className='need-account'>Need an Account?<Link to='/register'>Register</Link></p>
            </form>
        </section>
    )
}

export default Login