import './UpdateDOB.css';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UpdateDOB = () => {
    const {isLoading,setIsLoading,auth,setAuth} = useAuth();
    const navigate = useNavigate();
    const [dob,setDob] = useState(auth.dob || '');
    const handleDob = async () => {
        try{
            setIsLoading(true);
            
            const res = await axios.post('/update/dob',
            JSON.stringify({
                email:auth.email,
                dob
            }),
            {
                headers:{
                    Accept: "application/json, text/plain",
                    "Content-Type":"application/json"
                }
            }
            );

            console.log(res.data);
            setAuth({...auth,dob});
            navigate('/',{replace:true});
        }
        catch(err){
            console.log(err);
        }
        finally{
            setIsLoading(false);
        }
    }
    return(
        <section className="updateAge">
        <article className="updateAge-cont">
            <form onSubmit={(e)=>e.preventDefault()}>
                <label htmlFor='dob'>Enter the Date-Of-Birth</label>
                <input className='dob' id='dob' type='string' placeholder='DD/MM/YYYY' value={dob} onChange={(e)=>setDob(e.target.value)}/>
                {!isLoading ?
                    <button onClick={()=>handleDob()}>Update</button> :
                    <p>Updating...</p> }
            </form>
        </article>
    </section>
    )
}
export default UpdateDOB