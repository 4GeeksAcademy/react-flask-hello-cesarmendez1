import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [data,setData]=useState({
		email:"",
		username:"",
		name:"",
		password:""
	})
	const imput=(e)=>{
		const {name,value}=e.target;
		setData(previewdata=>({
			...previewdata,[name]:value
		}));
	}
	const registro=async(e)=>{
		e.preventDefault();
		const resultado= await actions.registro(data.email,data.username,data.password,data.name)
	}
	return (
		<div className=" mt-5 container">
			<h1>Registro</h1>
			<form className="row g-3" onSubmit={registro}>
				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" name="email" value={data.email} onChange={imput} />
				</div>
				<div className="col-12">
					<label htmlFor="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword4" name="password" value={data.password} onChange={imput} />
				</div>
				<div className="col-12">
					<label htmlFor="inputAddress" className="form-label">Username</label>
					<input type="text" className="form-control" id="inputAddress" name="username" value={data.username} onChange={imput} />
				</div>
				<div className="col-12">
					<label htmlFor="inputAddress2" className="form-label">Name</label>
					<input type="text" className="form-control" id="inputAddress2" name="name" value={data.name} onChange={imput} />
				</div>




				<div className="col-12">
					<button type="submit" className="btn btn-primary">Sign in</button>
				</div>
			</form>
		</div>
	);
};
