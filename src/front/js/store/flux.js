const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			registro:async (email,username,password,name) => {
					try{
						const response=await fetch (process.env.BACKEND_URL + "api/registro",{
							method:"POST",
							headers:{
								"Content-Type":"application/json"
							},
							body:JSON.stringify({
								email:email,
								username:username, 
								password:password,
								name:name 
							})
						});
						if (!response.ok){
							throw new Error("falla al crear usuario")
						}
						const data= await response.json()
						return data
					} catch(error)
					{console.error(error)}	
			},
			login:async (email,password) => {
				try{
					const response=await fetch (process.env.BACKEND_URL + "api/login",{
						method:"POST",
						headers:{
							"Content-Type":"application/json"
						},
						body:JSON.stringify({
							email:email,
							
							password:password
							
						})
					});
					if (!response.ok){
						throw new Error("falla al logear")
					}
					const data= await response.json()
					console.log(data)
					localStorage.setItem("accessToken",data.access_token)
					return data
				} catch(error)
				{console.error(error)}	
		},
			
			
		}
	};
};

export default getState;
