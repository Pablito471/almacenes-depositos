import api from "./api";

const depositoService = {
  getAll: async () => {
    const response = await api.get("/depositos");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/depositos/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/depositos", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/depositos/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/depositos/${id}`);
  },
};

const productoService = {
  getByDeposito: async (depositoId) => {
    const response = await api.get(`/productos/deposito/${depositoId}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  create: async (depositoId, data) => {
    const response = await api.post(`/productos/${depositoId}`, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/productos/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/productos/${id}`);
  },
};

export { depositoService, productoService };
