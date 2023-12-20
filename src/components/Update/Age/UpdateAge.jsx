import './UpdateAge.css';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UpdateAge = () => {
    const {isLoading,setIsLoading,auth,setAuth} = useAuth();
    const navigate = useNavigate();
    const [age,setAge] = useState(0);
    const handleAge = async () => {
        try{
            setIsLoading(true);
            
            const res = await axios.post('/update/age',
            JSON.stringify({
                email:auth.email,
                age 
            }),
            {
                headers:{
                    Accept: "application/json, text/plain",
                    "Content-Type":"application/json"
                }
            }
            );

            console.log(res.data);
            setAuth({...auth,age});
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
                    <label htmlFor='age'>Enter the Age</label>
                    <input className='age' id='age' type='number' min={1} max={100} required value={age ? age : auth.age} onChange={(e)=>setAge(e.target.value)}/>
                    {!isLoading ?
                    <button onClick={()=>handleAge()}>Update</button> :
                    <p>Updating...</p> }
                </form>
            </article>
        </section>
    )
}
export default UpdateAge