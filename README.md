## **Code**

```typescript
// Backend: Ejemplo de endpoint para obtener productos
app.get('/api/catalog', (req, res) => {
  res.json(productService.getAll());
});

// Backend: Servicio de productos (product.service.ts)
class ProductService {
  create(product: Product): Product { /* ... */ }
  update(id: string, data: Partial<Product>): Product { /* ... */ }
  delete(id: string): boolean { /* ... */ }
  getById(id: string): Product { /* ... */ }
  getAll(): Product[] { /* ... */ }
}

// Frontend: Ejemplo de componente React para mostrar productos
function Catalogo() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    fetch('/api/catalog')
      .then(res => res.json())
      .then(setProductos);
  }, []);
  return (
    <div>
      {productos.map(p => (
        <div key={p.id}>
          <h3>{p.nombre}</h3>
          <p>{p.descripcion}</p>
          <span>${p.precio}</span>
        </div>
      ))}
    </div>
  );
}

// Prueba unitaria (Jest)
test('ProductService.getAll retorna un array', () => {
  expect(Array.isArray(productService.getAll())).toBe(true);
});
