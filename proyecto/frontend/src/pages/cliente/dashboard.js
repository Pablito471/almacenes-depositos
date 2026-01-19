import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from '../../components/Navbar';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Alert } from '../../components/Alert';
import { Loading } from '../../components/Loading';
import { depositoService, productoService } from '../../services/depositoService';
import { pedidoService } from '../../services/pedidoService';
import authService from '../../services/authService';

export default function ClienteDashboard() {
  const router = useRouter();
  const user = authService.getCurrentUser();
  const [depositos, setDepositos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedDeposito, setSelectedDeposito] = useState(null);
  const [cart, setCart] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || user.tipo !== 'cliente') {
      router.push('/login');
      return;
    }

    const loadDepositos = async () => {
      try {
        const data = await depositoService.getAll();
        setDepositos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando depósitos:', error);
        setLoading(false);
      }
    };

    loadDepositos();
  }, [user, router]);

  const handleDepositoSelect = async (depositoId) => {
    setSelectedDeposito(depositoId);
    try {
      const data = await productoService.getByDeposito(depositoId);
      setProductos(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  const addToCart = (producto) => {
    const exists = cart.find((item) => item.id === producto.id);
    if (exists) {
      setCart(cart.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCart([...cart, { ...producto, cantidad: 1 }]);
    }
  };

  const removeFromCart = (productoId) => {
    setCart(cart.filter((item) => item.id !== productoId));
  };

  const updateQuantity = (productoId, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(productoId);
    } else {
      setCart(cart.map((item) =>
        item.id === productoId ? { ...item, cantidad } : item
      ));
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0 || !selectedDeposito || !direccion || !ciudad) {
      setMessage('Por favor completa todos los campos');
      return;
    }

    try {
      const items = cart.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad
      }));

      await pedidoService.create({
        depositoId: selectedDeposito,
        items,
        direccionEntrega: direccion,
        ciudad
      });

      setMessage('Pedido creado exitosamente!');
      setCart([]);
      setDireccion('');
      setCiudad('');
      setSelectedDeposito(null);
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  if (loading) return <Loading />;

  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mi Compra</h1>

        {message && (
          <Alert
            type={message.includes('exitosamente') ? 'success' : 'error'}
            message={message}
            onClose={() => setMessage('')}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <h2 className="text-xl font-bold mb-4">Selecciona un Depósito</h2>
              <div className="grid grid-cols-2 gap-2">
                {depositos.map((deposito) => (
                  <Button
                    key={deposito.id}
                    variant={selectedDeposito === deposito.id ? 'success' : 'secondary'}
                    onClick={() => handleDepositoSelect(deposito.id)}
                    className="text-left"
                  >
                    {deposito.nombre || 'Depósito'}
                  </Button>
                ))}
              </div>
            </Card>

            {selectedDeposito && (
              <Card>
                <h2 className="text-xl font-bold mb-4">Productos Disponibles</h2>
                <div className="space-y-3">
                  {productos.map((producto) => (
                    <div
                      key={producto.id}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div>
                        <h3 className="font-semibold">{producto.nombre}</h3>
                        <p className="text-gray-600">${producto.precio.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
                      </div>
                      <Button onClick={() => addToCart(producto)} size="sm">
                        Agregar
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div>
            <Card className="sticky top-4">
              <h2 className="text-xl font-bold mb-4">Carrito</h2>

              {cart.length > 0 ? (
                <>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="border-b pb-2">
                        <p className="font-semibold">{item.nombre}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                          >
                            -
                          </Button>
                          <input
                            type="number"
                            value={item.cantidad}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                            className="w-12 px-2 py-1 border rounded text-center"
                          />
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          >
                            +
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            X
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Input
                    label="Dirección de Entrega"
                    type="text"
                    placeholder="Calle 123, Apt 4B"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />

                  <Input
                    label="Ciudad"
                    type="text"
                    placeholder="Nueva York"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  />

                  <p className="font-bold text-lg mb-4">Total: ${total.toFixed(2)}</p>
                  <Button className="w-full" onClick={handleCheckout}>
                    Confirmar Pedido
                  </Button>
                </>
              ) : (
                <p className="text-gray-600">El carrito está vacío</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
