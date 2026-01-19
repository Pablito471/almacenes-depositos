import { useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../components/Navbar.jsx";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";
import { Alert } from "../components/Alert.jsx";
import { Card } from "../components/Card.jsx";
import { useForm } from "../hooks/useForm.jsx";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Login() {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const form = useForm({ email: "", password: "" }, handleSubmit);

  async function handleSubmit(values) {
    try {
      await login(values.email, values.password);
      setSuccessMessage("Inicio de sesión exitoso");
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-12">
        <Card>
          <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>

          {error && <Alert type="error" message={error} />}
          {successMessage && <Alert type="success" message={successMessage} />}

          <form onSubmit={form.handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              {...form.values}
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate aquí
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
