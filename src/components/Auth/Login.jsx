import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al realizar la petición");
                }
                return response.json();
            })
            .then((responseData) => {
                login(responseData.token);
                setData(responseData);
            })
            .catch((error) => {
                setIsError(true);
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
    }

    return (
        <section className="section">
            <div className="columns is-centered">
                <div className="column is-4">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="username">Nombre de usuario:</label>
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="password">Contraseña:</label>
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-primary is-fullwidth"
                                >
                                    Enviar
                                </button>
                                {isLoading && <p>Cargando...</p>}
                                {isError && <p>Error al cargar los datos.</p>}
                                {data && (
                                    <p>{`Token obtenido: ${data.token}`}</p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
