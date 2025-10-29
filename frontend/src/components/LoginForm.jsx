import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      alert("Credenciales incorrectas o error de conexión");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-72 mx-auto">
      <h2 className="text-xl font-semibold mb-2 text-center">Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-2"
      />
      <button className="bg-green-600 text-white p-2 rounded mt-2">Entrar</button>
    </form>
  );
};

export default LoginForm;