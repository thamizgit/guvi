import './UpdateMobile.css'
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UpdateMobile = () => {
    const {isLoading,setIsLoading,auth,setAuth} = useAuth();
    const navigate = useNavigate();
    const [mobile,setMobile] = useState(auth.mobile || '');
    const handleMobile = async () => {
        try{
            setIsLoading(true);
            
            const res = await axios.post('/update/mobile',
            JSON.stringify({
                email:auth.email,
                mobile
            }),
            {
                headers:{
                    Accept: "application/json, text/plain",
                    "Content-Type":"application/json"
                }
            }
            );

            console.log(res.data);
            setAuth({...auth,mobile});
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
                <label htmlFor='mob'>Enter Mobile Number</label>
                <input className='mob' id='mob' type='string' value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
                {!isLoading ?
                    <button onClick={()=>handleMobile()}>Update</button> :
                    <p>Updating...</p> }
            </form>
        </article>
    </section>
    )
}
export default UpdateMobile