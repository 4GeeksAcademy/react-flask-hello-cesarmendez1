import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
    const navigate=useNavigate()
	const { store, actions } = useContext(Context);
	const [data,setData]=useState({
		email:"",
		
		password:""
	})
	const imput=(e)=>{
		const {name,value}=e.target;
		setData(previewdata=>({
			...previewdata,[name]:value
		}));
	}
	const login=async(e)=>{
		e.preventDefault();
		const resultado= await actions.login(data.email,data.password)
        if (resultado) {
			navigate("/demo")
		}else {
			alert ("login fallido")
		}
	}
	return (
		<div className=" mt-5 container">
			<h1>Login</h1>
			<form className="row g-3" onSubmit={login}>
				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" name="email" value={data.email} onChange={imput} />
				</div>
				<div className="col-12">
					<label htmlFor="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword4" name="password" value={data.password} onChange={imput} />
				</div>
				




				<div className="col-12">
					<button type="submit" className="btn btn-primary">Login</button>
				</div>
			</form>
		</div>
	);
};
