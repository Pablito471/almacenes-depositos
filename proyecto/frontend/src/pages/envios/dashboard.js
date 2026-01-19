import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Alert } from '../../components/Alert';
import { Loading } from '../../components/Loading';
import { pedidoService, envioService } from '../../services/pedidoService';
import authService from '../../services/authService';

export default function EnviosDashboard() {
  const router = useRouter();
  const user = authService.getCurrentUser();
  const [pedidosDisponibles, setPedidosDisponibles] = useState([]);
  const [envios, setEnvios] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || user.tipo !== 'envios') {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        const allPedidos = await pedidoService.getAll();
        setPedidosDisponibles(allPedidos.filter((p) => p.estado === 'listo_envio'));

        const allEnvios = await envioService.getAll();
        setEnvios(allEnvios);

        setLoading(false);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [user, router]);

  const handleCreateEnvio = async () => {
    if (!selectedPedido) {
      setMessage('Por favor selecciona un pedido');
      return;
    }

    try {
      await envioService.create({ pedidoId: selectedPedido });
      setMessage('Envío creado exitosamente');
      setSelectedPedido('');

      const allPedidos = await pedidoService.getAll();
      setPedidosDisponibles(allPedidos.filter((p) => p.estado === 'listo_envio'));

      const allEnvios = await envioService.getAll();
      setEnvios(allEnvios);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleUpdateEnvioStatus = async (envioId, nuevoEstado) => {
    try {
      await envioService.updateStatus(envioId, nuevoEstado);
      setEnvios(envios.map((e) => (e.id === envioId ? { ...e, estado: nuevoEstado } : e)));
      setMessage('Estado del envío actualizado');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Gestión de Envíos</h1>

        {message && (
          <Alert type="info" message={message} onClose={() => setMessage('')} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Envío</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Seleccionar Pedido
              </label>
              <select
                value={selectedPedido}
                onChange={(e) => setSelectedPedido(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">-- Selecciona un pedido --</option>
                {pedidosDisponibles.map((pedido) => (
                  <option key={pedido.id} value={pedido.id}>
                    {pedido.numero} - ${pedido.total.toFixed(2)} - {pedido.ciudad}
                  </option>
                ))}
              </select>
            </div>
            <Button className="w-full" onClick={handleCreateEnvio}>
              Crear Envío
            </Button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Resumen</h2>
            <p className="text-gray-600 mb-2">
              Pedidos disponibles: <strong>{pedidosDisponibles.length}</strong>
            </p>
            <p className="text-gray-600">
              Envíos creados: <strong>{envios.length}</strong>
            </p>
          </Card>
        </div>

        <Card className="mt-6">
          <h2 className="text-xl font-bold mb-4">Mis Envíos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b">
                <tr>
                  <th>Número Seguimiento</th>
                  <th>Pedido</th>
                  <th>Destino</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {envios.map((envio) => (
                  <tr key={envio.id} className="border-b">
                    <td className="font-mono text-xs">{envio.numeroSeguimiento}</td>
                    <td>{envio.Pedido?.numero}</td>
                    <td>{envio.Pedido?.ciudad}</td>
                    <td>
                      <select
                        value={envio.estado}
                        onChange={(e) =>
                          handleUpdateEnvioStatus(envio.id, e.target.value)
                        }
                        className="px-2 py-1 border rounded text-xs"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="recogido">Recogido</option>
                        <option value="en_transito">En Tránsito</option>
                        <option value="entregado">Entregado</option>
                        <option value="devuelto">Devuelto</option>
                      </select>
                    </td>
                    <td>
                      <Button size="sm" variant="secondary">
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
