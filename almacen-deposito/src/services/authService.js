// Servicio de autenticación (simulado, para producción usar backend real)

// Cargar usuarios del localStorage o usar los de demostración
const getUsers = () => {
  if (typeof window === "undefined") {
    return {
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
      admin: [
        {
          id: "4",
          email: "admin@example.com",
          password: "admin123",
          nombre: "Administrador Sistema",
          role: "admin",
        },
      ],
    };
  }

  const stored = localStorage.getItem("users");
  if (stored) {
    return JSON.parse(stored);
  }

  return {
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
    admin: [
      {
        id: "4",
        email: "admin@example.com",
        password: "admin123",
        nombre: "Administrador Sistema",
        role: "admin",
      },
    ],
  };
};

// Guardar usuarios en localStorage
const saveUsers = (users) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("users", JSON.stringify(users));
  }
};

const mockDepositos = [
  {
    id: "1",
    nombre: "Almacén Centro",
    ubicacion: "Centro Ciudad",
    telefono: "+34 912 345 678",
    email: "centro@almacenes.com",
    horario: "8:00 - 18:00",
    estado: "Activo",
  },
  {
    id: "2",
    nombre: "Almacén Norte",
    ubicacion: "Zona Norte",
    telefono: "+34 913 456 789",
    email: "norte@almacenes.com",
    horario: "8:00 - 18:00",
    estado: "Activo",
  },
  {
    id: "3",
    nombre: "Almacén Zona Franca",
    ubicacion: "Zona Franca",
    telefono: "+34 934 567 890",
    email: "franca@almacenes.com",
    horario: "8:00 - 20:00",
    estado: "Activo",
  },
  {
    id: "4",
    nombre: "Almacén Este",
    ubicacion: "Zona Este - Polígono Industrial",
    telefono: "+34 915 678 901",
    email: "este@almacenes.com",
    horario: "6:00 - 22:00",
    estado: "Activo",
  },
  {
    id: "5",
    nombre: "Almacén Sur",
    ubicacion: "Zona Sur - Periferia",
    telefono: "+34 916 789 012",
    email: "sur@almacenes.com",
    horario: "8:00 - 18:00",
    estado: "Activo",
  },
];

export const loginService = {
  login: async (email, password, role) => {
    // Simular delay de red
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const usersList = users[role] || [];
        const user = usersList.find(
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

  register: async (nombre, email, password, role) => {
    // Simular delay de red
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const usersList = users[role] || [];

        // Validar que el email no exista
        const emailExists = usersList.some((u) => u.email === email);
        if (emailExists) {
          reject(new Error("El email ya está registrado"));
          return;
        }

        // Validar campos
        if (!nombre || !email || !password) {
          reject(new Error("Todos los campos son requeridos"));
          return;
        }

        if (password.length < 6) {
          reject(new Error("La contraseña debe tener al menos 6 caracteres"));
          return;
        }

        // Crear nuevo usuario
        const newUser = {
          id: String(Date.now()),
          email,
          password,
          nombre,
          role,
        };

        // Guardar usuario
        usersList.push(newUser);
        users[role] = usersList;
        saveUsers(users);

        const { password: _, ...userData } = newUser;
        resolve(userData);
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
      categoria: "Computadoras",
      imagen:
        "https://images.unsplash.com/photo-1588872657840-790ff3bde4c5?w=500&q=80",
    },
    {
      id: "p2",
      nombre: "Mouse Logitech",
      descripcion: "Mouse inalámbrico",
      precio: 29.99,
      stock: 50,
      categoria: "Periféricos",
      imagen:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80",
    },
    {
      id: "p3",
      nombre: "Teclado Mecánico",
      descripcion: "Teclado RGB",
      precio: 149.99,
      stock: 20,
      categoria: "Periféricos",
      imagen:
        "https://images.unsplash.com/photo-1587829191301-a574fdf4fbb9?w=500&q=80",
    },
  ],
  2: [
    {
      id: "p4",
      nombre: 'Monitor 27"',
      descripcion: "Monitor 4K",
      precio: 349.99,
      stock: 15,
      categoria: "Monitores",
      imagen:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    },
    {
      id: "p5",
      nombre: "Webcam HD",
      descripcion: "Webcam 1080p",
      precio: 59.99,
      stock: 30,
      categoria: "Accesorios",
      imagen:
        "https://images.unsplash.com/photo-1598986646514-e31f83da8c46?w=500&q=80",
    },
    {
      id: "p6",
      nombre: "Auriculares Sony",
      descripcion: "Auriculares con noise cancel",
      precio: 199.99,
      stock: 25,
      categoria: "Audio",
      imagen:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    },
  ],
  3: [
    {
      id: "p7",
      nombre: "Cable HDMI",
      descripcion: "Cable HDMI 2.0",
      precio: 9.99,
      stock: 100,
      categoria: "Cables",
      imagen:
        "https://images.unsplash.com/photo-1626821119020-c72eb9d21e9b?w=500&q=80",
    },
    {
      id: "p8",
      nombre: "Hub USB-C",
      descripcion: "Hub USB-C 7 puertos",
      precio: 79.99,
      stock: 12,
      categoria: "Accesorios",
      imagen:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&q=80",
    },
    {
      id: "p9",
      nombre: "Adaptador VGA",
      descripcion: "Adaptador VGA",
      precio: 19.99,
      stock: 40,
      categoria: "Cables",
      imagen:
        "https://images.unsplash.com/photo-1621905251007-c2c7e90f1d78?w=500&q=80",
    },
  ],
  4: [
    {
      id: "p10",
      nombre: "SSD 1TB",
      descripcion: "SSD NVMe 1TB",
      precio: 129.99,
      stock: 35,
      categoria: "Almacenamiento",
      imagen:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80",
    },
    {
      id: "p11",
      nombre: "RAM DDR4 16GB",
      descripcion: "Memoria RAM 16GB DDR4 3200MHz",
      precio: 79.99,
      stock: 45,
      categoria: "Componentes",
      imagen:
        "https://images.unsplash.com/photo-1621619801721-c60c3f9a5c0e?w=500&q=80",
    },
    {
      id: "p12",
      nombre: "Fuente 750W",
      descripcion: "Fuente de poder 750W modular",
      precio: 89.99,
      stock: 22,
      categoria: "Componentes",
      imagen:
        "https://images.unsplash.com/photo-1612996330333-0e3ffc5d6e5a?w=500&q=80",
    },
  ],
  5: [
    {
      id: "p13",
      nombre: "Micrófono Condenser",
      descripcion: "Micrófono USB profesional",
      precio: 149.99,
      stock: 18,
      categoria: "Audio",
      imagen:
        "https://images.unsplash.com/photo-1634488641435-e6dcd2ffacb9?w=500&q=80",
    },
    {
      id: "p14",
      nombre: "Soporte Escritorio",
      descripcion: "Soporte para monitor/laptop",
      precio: 39.99,
      stock: 55,
      categoria: "Accesorios",
      imagen:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    },
    {
      id: "p15",
      nombre: "Regleta Power Strip",
      descripcion: "Regleta 6 puertos con USB",
      precio: 24.99,
      stock: 70,
      categoria: "Accesorios",
      imagen:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80",
    },
  ],
};
