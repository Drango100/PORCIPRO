import { useState } from "react";
import { registerUser } from "../api/auth";

const RegisterForm = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Usuario registrado con éxito");
    } catch (error) {
      alert("Error al registrar usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-72 mx-auto">
      <h2 className="text-xl font-semibold mb-2 text-center">Registrar usuario</h2>
      <input
        name="username"
        placeholder="Nombre de usuario"
        value={form.username}
        onChange={handleChange}
        className="border rounded p-2"
      />
      <input
        name="email"
        type="email"
        placeholder="Correo"
        value={form.email}
        onChange={handleChange}
        className="border rounded p-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="border rounded p-2"
      />
      <button className="bg-green-600 text-white p-2 rounded mt-2">Registrar</button>
    </form>
  );
};

export default RegisterForm;