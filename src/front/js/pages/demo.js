import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	useEffect (()=>{
		actions.userData()
	},[])
console.log(store.user)
	return (
		<div className="container">
			<h1>Usuario</h1>
			<br />
			<p>Name: {store.user.name}</p>
			<p>username: {store.user.username}</p>
			<p>email: {store.user.email}</p>
		</div>
	);
};
