import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", form);
      localStorage.setItem("token", data.token);
      alert("Logged in successfully");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}
export default Login;
