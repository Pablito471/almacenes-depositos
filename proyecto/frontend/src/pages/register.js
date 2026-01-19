import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { Card } from '../components/Card';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const router = useRouter();
  const { tipo } = router.query;
  const { register, loading, error } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    tipo: tipo || 'cliente',
    deposito: {
      nombre: '',
      ubicacion: '',
      ciudad: '',
      telefono: ''
    }
  };

  const form = useForm(initialValues, handleSubmit);

  async function handleSubmit(values) {
    if (values.password !== values.confirmPassword) {
      form.setErrors({ password: 'Las contraseñas no coinciden' });
      return;
    }

    try {
      const userData = {
        email: values.email,
        password: values.password,
        nombre: values.nombre,
        tipo: tipo || 'cliente',
        ...(tipo === 'deposito' && { deposito: values.deposito })
      };

      await register(userData);
      setSuccessMessage('Registro exitoso. Redirigiendo...');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      console.error('Error al registrarse:', err);
    }
  }

  useEffect(() => {
    if (tipo) {
      form.setValues({
        ...form.values,
        tipo
      });
    }
  }, [tipo]);

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card>
          <h1 className="text-2xl font-bold mb-6">Registrarse como {tipo || 'Cliente'}</h1>

          {error && <Alert type="error" message={error} />}
          {successMessage && <Alert type="success" message={successMessage} />}

          <form onSubmit={form.handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
            />

            <Input
              label="Nombre"
              type="text"
              placeholder="Tu nombre"
              name="nombre"
              value={form.values.nombre}
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

            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="••••••••"
              name="confirmPassword"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              error={form.errors.password}
            />

            {tipo === 'deposito' && (
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-3">Información del Depósito</h3>
                <Input
                  label="Nombre del Depósito"
                  type="text"
                  placeholder="Depósito Centro"
                  name="deposito.nombre"
                  value={form.values.deposito.nombre}
                  onChange={(e) => {
                    const deposito = { ...form.values.deposito, nombre: e.target.value };
                    form.setValues({ ...form.values, deposito });
                  }}
                />

                <Input
                  label="Ubicación"
                  type="text"
                  placeholder="Calle Principal 123"
                  name="deposito.ubicacion"
                  value={form.values.deposito.ubicacion}
                  onChange={(e) => {
                    const deposito = { ...form.values.deposito, ubicacion: e.target.value };
                    form.setValues({ ...form.values, deposito });
                  }}
                />

                <Input
                  label="Ciudad"
                  type="text"
                  placeholder="Nueva York"
                  name="deposito.ciudad"
                  value={form.values.deposito.ciudad}
                  onChange={(e) => {
                    const deposito = { ...form.values.deposito, ciudad: e.target.value };
                    form.setValues({ ...form.values, deposito });
                  }}
                />

                <Input
                  label="Teléfono"
                  type="tel"
                  placeholder="+1-555-0000"
                  name="deposito.telefono"
                  value={form.values.deposito.telefono}
                  onChange={(e) => {
                    const deposito = { ...form.values.deposito, telefono: e.target.value };
                    form.setValues({ ...form.values, deposito });
                  }}
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Inicia sesión aquí
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
