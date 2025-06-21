### **Inicio de Sesión**

- **Vista de la interfaz:**

  [![Pantalla de Home](https://via.placeholder.com/400x200?text=Login+Plena+Studio)](https://capable-kiss.surge.sh/)
  [![Pantalla de Home](https://via.placeholder.com/400x200?text=Login+Plena+Studio)](https://capable-kiss.surge.sh/login)

- **Ejemplo de petición a la API:**

  ```http
  POST /api/auth/login
  Content-Type: application/json

  {
    "email": "usuario@correo.com",
    "password": "123456"
  }
  ```

- **Respuesta esperada:**

  ```json
  {
    "user": {
      "id": "1",
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "usuario@correo.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### **Registro de Usuario**

- **Vista de la interfaz:**

  ![Pantalla de registro]([https://via.placeholder.com/400x200?text=Registro+Plena+Studio](https://capable-kiss.surge.sh/register))

- **Ejemplo de petición a la API:**

  ```http
  POST /api/auth/register
  Content-Type: application/json

  {
    "nombre": "Ana",
    "apellido": "López",
    "email": "ana@correo.com",
    "password": "abcdef"
  }
  ```

- **Respuesta esperada:**

  ```json
  {
    "id": "2",
    "nombre": "Ana",
    "apellido": "López",
    "email": "ana@correo.com"
  }
  ```

---

### **Carrito de Compras**

- **Vista de la interfaz:**

  ![Pantalla del carrito](https://via.placeholder.com/400x200?text=Carrito+de+Compras)

- **Ejemplo de petición para obtener el carrito:**

  ```http
  GET /api/cart?userId=1
  ```

- **Respuesta esperada:**

  ```json
  {
    "userId": "1",
    "items": [
      {
        "productId": "1",
        "nombre": "Arete Dorado",
        "cantidad": 2,
        "precioUnitario": 50000
      }
    ]
  }
