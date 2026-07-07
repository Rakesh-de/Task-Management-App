import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./Register.css";

const Register = () =>{
    const navigate = useNavigate();
    const {login} = useAuth();

    const [form,setForm] = useState({
        name:"",
        email:"",
        password:"",
    });

    const[loading,setLoading]= useState(false);

    const changeHandler= (e)=>{
        setForm({...form,
            [e.target.name]:e.target.value,
        });
    };

    const submitHandler = async(e)=>{
        e.preventDefault();

        try{
            setLoading(true);

            const {data} = await api.post("/auth/register",form);

            login(data.token,data.user);

            navigate("/dashboard");
        }catch(err){
           alert(err.response?.data?.message || "Registration Failed");
        }finally{
            setLoading(false);
        }
    };
    return (
        <div className="register-page">
            <div className="register-card">
                <h1>Create Account</h1>
                <p>welcome to TaskFlow</p>

                <form onSubmit={submitHandler}>
                    <input
                    type = "text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={changeHandler}
                    required

                    
                    />

                    <input
                    type = "email"
                    name="email"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={changeHandler}
                    required

                    
                    />      
                    <input
                    type = "password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={changeHandler}
                    required
                   
                    />     

                    <button type="submit">
                        {loading ? "Creating...":"Register"}
                    </button>                              


                </form>

                <span>
                    Already have an account?
                    <Link to="/">Login</Link>
                </span>

            </div>

        </div>
    )
}

export default Register;