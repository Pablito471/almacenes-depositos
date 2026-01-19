import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/Navbar";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Alert } from "../../components/Alert";
import { Loading } from "../../components/Loading";
import {
  productoService,
  depositoService,
} from "../../services/depositoService";
import { pedidoService } from "../../services/pedidoService";
import authService from "../../services/authService";

export default function DepositoDashboard() {
  const router = useRouter();
  const user = authService.getCurrentUser();
  const [deposito, setDeposito] = useState(null);
  const [tab, setTab] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  useEffect(() => {
    if (!user || user.tipo !== "deposito") {
      router.push("/login");
      return;
    }

    const loadData = async () => {
      try {
        const depositos = await depositoService.getAll();
        const userDeposito = depositos.find((d) => d.usuarioId === user.id);
        if (userDeposito) {
          setDeposito(userDeposito);
          const prods = await productoService.getByDeposito(userDeposito.id);
          setProductos(prods);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [user, router]);

  useEffect(() => {
    if (tab === "pedidos" && deposito) {
      const loadPedidos = async () => {
        try {
          const allPedidos = await pedidoService.getAll();
          setPedidos(allPedidos.filter((p) => p.depositoId === deposito.id));
        } catch (error) {
          console.error("Error cargando pedidos:", error);
        }
      };
      loadPedidos();
    }
  }, [tab, deposito]);

  const handleAddProducto = async (e) => {
    e.preventDefault();
    try {
      await productoService.create(deposito.id, {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
      });
      setMessage("Producto agregado exitosamente");
      setFormData({ nombre: "", descripcion: "", precio: "", stock: "" });
      const prods = await productoService.getByDeposito(deposito.id);
      setProductos(prods);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleDeleteProducto = async (id) => {
    try {
      await productoService.delete(id);
      setProductos(productos.filter((p) => p.id !== id));
      setMessage("Producto eliminado");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleUpdatePedidoStatus = async (pedidoId, nuevoEstado) => {
    try {
      await pedidoService.updateStatus(pedidoId, nuevoEstado);
      setPedidos(
        pedidos.map((p) =>
          p.id === pedidoId ? { ...p, estado: nuevoEstado } : p,
        ),
      );
      setMessage("Pedido actualizado");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Gestión de Depósito</h1>

        {message && (
          <Alert type="info" message={message} onClose={() => setMessage("")} />
        )}

        {deposito && (
          <Card className="mb-6 bg-blue-50">
            <h2 className="text-xl font-bold">{deposito.nombre}</h2>
            <p className="text-gray-600">{deposito.ciudad}</p>
            <p className="text-gray-600">Teléfono: {deposito.telefono}</p>
          </Card>
        )}

        <div className="flex gap-4 mb-6">
          <Button
            variant={tab === "productos" ? "primary" : "secondary"}
            onClick={() => setTab("productos")}
          >
            Productos
          </Button>
          <Button
            variant={tab === "pedidos" ? "primary" : "secondary"}
            onClick={() => setTab("pedidos")}
          >
            Pedidos
          </Button>
        </div>

        {tab === "productos" && (
          <div>
            <Card className="mb-6">
              <h2 className="text-xl font-bold mb-4">Agregar Nuevo Producto</h2>
              <form onSubmit={handleAddProducto}>
                <Input
                  label="Nombre"
                  placeholder="Nombre del producto"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
                <Input
                  label="Descripción"
                  placeholder="Descripción"
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                />
                <Input
                  label="Precio"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={formData.precio}
                  onChange={(e) =>
                    setFormData({ ...formData, precio: e.target.value })
                  }
                />
                <Input
                  label="Stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                />
                <Button type="submit" className="w-full">
                  Agregar Producto
                </Button>
              </form>
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-4">Productos del Depósito</h2>
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id} className="border-b">
                      <td>{producto.nombre}</td>
                      <td>${producto.precio.toFixed(2)}</td>
                      <td>{producto.stock}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteProducto(producto.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {tab === "pedidos" && (
          <Card>
            <h2 className="text-xl font-bold mb-4">Pedidos Asignados</h2>
            <table className="w-full text-left text-sm">
              <thead className="border-b">
                <tr>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="border-b">
                    <td>{pedido.numero}</td>
                    <td>{pedido.cliente?.nombre || "N/A"}</td>
                    <td>${pedido.total.toFixed(2)}</td>
                    <td>
                      <select
                        value={pedido.estado}
                        onChange={(e) =>
                          handleUpdatePedidoStatus(pedido.id, e.target.value)
                        }
                        className="px-2 py-1 border rounded"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="preparado">Preparado</option>
                        <option value="listo_envio">Listo Envío</option>
                        <option value="enviado">Enviado</option>
                      </select>
                    </td>
                    <td>
                      <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                        {pedido.ciudad}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
}
