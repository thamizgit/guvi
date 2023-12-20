import './UpdateGender.css'
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UpdateGender = () => {
    const {isLoading,setIsLoading,auth,setAuth} = useAuth();
    const navigate = useNavigate();
    const [gender,setGender] = useState(auth.gender || '');
    const handleGender = async () => {
        try{
            setIsLoading(true);
            
            const res = await axios.post('/update/gender',
            JSON.stringify({
                email:auth.email,
                gender
            }),
            {
                headers:{
                    Accept: "application/json, text/plain",
                    "Content-Type":"application/json"
                }
            }
            );

            console.log(res.data);
            setAuth({...auth,gender});
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
                    <h1>Enter the Gender </h1   >
                    <article className='updateAge-cont-sub'>
                    <p>
                        <input type='radio' value='male' id='male' name='gender' onChange={(e)=>setGender(e.target.value)} checked={gender == 'male' ? 'true' : null} />
                        <label htmlFor='male' >Male</label>
                    </p>
                    <p>
                        <input type='radio' value='female' id='female' name='gender' onChange={(e)=>setGender(e.target.value)} checked={gender == 'female' ? 'true' : null}/>
                        <label htmlFor='female' >Female</label>
                    </p>
                    </article>
                    {!isLoading ?
                    <button onClick={()=>handleGender()}>Update</button> :
                    <p>Updating...</p> }
                </form>
            </article>
        </section>
    )
}
export default UpdateGender