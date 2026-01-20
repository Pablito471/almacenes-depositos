// Servicio de autenticación (simulado, para producción usar backend real)

const mockUsers = {
  cliente: [
    {
      id: "1",
      email: "cliente@example.com",
      password: "cliente123",
      nombre: "Juan Cliente",
      role: "cliente",
    },
  ],
  deposito: [
    {
      id: "2",
      email: "deposito@example.com",
      password: "deposito123",
      nombre: "Almacén Central",
      role: "deposito",
    },
  ],
  envios: [
    {
      id: "3",
      email: "envios@example.com",
      password: "envios123",
      nombre: "Envíos Rápidos",
      role: "envios",
    },
  ],
};

const mockDepositos = [
  {
    id: "1",
    nombre: "Almacén Centro",
    ubicacion: "Centro Ciudad",
    telefono: "+34 912 345 678",
  },
  {
    id: "2",
    nombre: "Almacén Norte",
    ubicacion: "Zona Norte",
    telefono: "+34 913 456 789",
  },
  {
    id: "3",
    nombre: "Almacén Zona Franca",
    ubicacion: "Zona Franca",
    telefono: "+34 934 567 890",
  },
];

export const loginService = {
  login: async (email, password, role) => {
    // Simular delay de red
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = mockUsers[role] || [];
        const user = users.find(
          (u) => u.email === email && u.password === password,
        );

        if (user) {
          const { password, ...userData } = user;
          resolve(userData);
        } else {
          reject(new Error("Credenciales inválidas"));
        }
      }, 500);
    });
  },

  getDepositos: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDepositos), 300);
    });
  },
};

export const mockProductos = {
  1: [
    {
      id: "p1",
      nombre: "Laptop Dell",
      descripcion: 'Laptop 15"',
      precio: 899.99,
      stock: 10,
    },
    {
      id: "p2",
      nombre: "Mouse Logitech",
      descripcion: "Mouse inalámbrico",
      precio: 29.99,
      stock: 50,
    },
    {
      id: "p3",
      nombre: "Teclado Mecánico",
      descripcion: "Teclado RGB",
      precio: 149.99,
      stock: 20,
    },
  ],
  2: [
    {
      id: "p4",
      nombre: 'Monitor 27"',
      descripcion: "Monitor 4K",
      precio: 349.99,
      stock: 15,
    },
    {
      id: "p5",
      nombre: "Webcam HD",
      descripcion: "Webcam 1080p",
      precio: 59.99,
      stock: 30,
    },
    {
      id: "p6",
      nombre: "Auriculares Sony",
      descripcion: "Auriculares con noise cancel",
      precio: 199.99,
      stock: 25,
    },
  ],
  3: [
    {
      id: "p7",
      nombre: "Cable HDMI",
      descripcion: "Cable HDMI 2.0",
      precio: 9.99,
      stock: 100,
    },
    {
      id: "p8",
      nombre: "Hub USB-C",
      descripcion: "Hub USB-C 7 puertos",
      precio: 79.99,
      stock: 12,
    },
    {
      id: "p9",
      nombre: "Adaptador VGA",
      descripcion: "Adaptador VGA",
      precio: 19.99,
      stock: 40,
    },
  ],
};
