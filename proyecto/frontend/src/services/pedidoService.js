import api from "./api";

const pedidoService = {
  create: async (data) => {
    const response = await api.post("/pedidos", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/pedidos");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  },

  updateStatus: async (id, estado) => {
    const response = await api.put(`/pedidos/${id}/status`, { estado });
    return response.data;
  },
};

const envioService = {
  create: async (data) => {
    const response = await api.post("/envios", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/envios");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/envios/${id}`);
    return response.data;
  },

  updateStatus: async (id, estado) => {
    const response = await api.put(`/envios/${id}/status`, { estado });
    return response.data;
  },
};

export { pedidoService, envioService };
