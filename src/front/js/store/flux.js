const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user:{}

		},
		actions: {
			// Use getActions to call a function within a fuction
			registro: async (email, username, password, name) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/registro", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							username: username,
							password: password,
							name: name
						})
					});
					if (!response.ok) {
						throw new Error("falla al crear usuario")
					}
					const data = await response.json()
					return data
				} catch (error) { console.error(error) }
			},
			login: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,

							password: password

						})
					});
					if (!response.ok) {
						throw new Error("falla al logear")
					}
					const data = await response.json()
					console.log(data)
					localStorage.setItem("accessToken", data.access_token)
					return data
				} catch (error) { console.error(error) }
			},
			userData: async () => {
				try {
					const token = localStorage.getItem("accessToken")
					if (!token) {
						throw new Error("token no funciona")
					}
					const response = await fetch(process.env.BACKEND_URL + "api/usuario", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						}
					});
					if (!response.ok) {
						throw new Error("no funciono el fetch")
					}
					const data = await response.json()
					console.log("user", data)
					setStore({ user: data.user })
					return data
				} catch (error) {
					console.error("data", error)
				}
			}

		}
	};
};

export default getState;
