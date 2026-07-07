import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import './Login.css';
import {useAuth} from "../context/AuthContext";
import Loader from "../components/Loader";
import Register from "./Register";
const Login=()=>{
    const navigate = useNavigate();
    const {login} = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

     const [loading, setLoading] = useState(false);

    const changeHandler = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const submitHandler = async (e)=>{
        e.preventDefault(); 
        try{
            setLoading(true);
            const {data} = await api.post("/auth/login", form);
            login(data.token,data.user);
            navigate("/dashboard");
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    };
    return(
        <div className="login-page">
            <div className="login-card">
                <h1>TaskFlow</h1>
                <p>Sign in to continue</p>

                <form onSubmit={submitHandler}>
                    <input
                       type="text"
                       value={form.email}
                       name="email"
                       placeholder="Enter Email"
                       onChange={changeHandler}
                       required
                    />

                    <input
                      name = "password"
                      type ="password"
                      value={form.password}
                      placeholder="password"
                      onChange={changeHandler}
                      required

                    />

                    <button type="submit">
                         {loading ? "Please wait...":"Login"}
                    </button>



                </form>

                <span>Don't have an account ?<Link to = "/register">Register</Link></span>

            </div>
            
        </div>
    );

}

export default Login;
