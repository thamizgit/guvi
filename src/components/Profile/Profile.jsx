
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Profile.css'
import { MdEdit } from "react-icons/md";
const Profile = () => {
    const {auth,setAuth} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        setAuth({});
        navigate('/login',{replace:true});
    }
    return(
        <section className="profile">
            <article className="profile-name">
                <h2>Name :</h2>
                <p>{auth.username}</p>
                <MdEdit style={{fontSize:"1.2rem",marginTop:"0.2rem",color:"rgba(251,216,0,255)"}}/>
            </article>
            <article className="profile-name">
                <h2>Age :</h2>
                {auth.age ?
                <p>{auth.age}</p>
                : <p>-</p> 
                }
                <MdEdit style={{fontSize:"1.2rem",marginTop:"0.2rem",cursor:"pointer"}} onClick={()=>navigate('/updateage')}/>
            </article>
            <article className="profile-name">
                <h2>Gender :</h2>
                {auth.gender ?
                <p>{auth.gender}</p>
                : <p>-</p> 
                }
                <MdEdit style={{fontSize:"1.2rem",marginTop:"0.2rem",cursor:"pointer"}} onClick={()=>navigate('/updategender')} />
            </article>
            <article className="profile-name">
                <h2>DOB :</h2>
                {auth.dob ?
                <p>{auth.dob}</p>
                : <p>-</p> 
                }
                <MdEdit style={{fontSize:"1.2rem",marginTop:"0.2rem",cursor:"pointer"}} onClick={()=>navigate('/updatedob')}/>
            </article>
            <article className="profile-name">
                <h2>Mobile :</h2>
                {auth.mobile ?
                <p>{auth.mobile}</p>
                : <p>-</p> 
                }
                <MdEdit style={{fontSize:"1.2rem",marginTop:"0.2rem",cursor:"pointer"}} onClick={()=>navigate('/updatemobile')} />
            </article>
            <button onClick={()=>handleLogout()}>Logout</button>
        </section>
    )
}
export default Profile