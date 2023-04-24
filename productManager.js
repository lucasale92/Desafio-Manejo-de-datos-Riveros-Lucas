const fs = require('fs');
class ProductManager {
    // inicializo el id en 1
    id = 1;

    // Constructor de la clase ProductManager
    constructor(path) {
      this.path = path;
      // el producto esta vacio
      this.products = [];
      // Lee el archivo JSON y lo convierte a objetos JS
      const productsString = fs.readFileSync(this.path,'utf-8')
      const products = JSON.parse(productsString);
      // Asigna los objetos JS a la propiedad products
      this.products = products;
    }
    //llamo al metodo addProduct
    addProduct(product) {
      //Verifica si el código del producto ya existe
      let checkCode = this.products.find((p) => p.code === product.code);
      if (checkCode) {
        throw new Error('El codigo ya existe');
      }
      // Verifica que se proporcionaron todos los campos necesarios
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        throw new Error('faltan campos por completar');
      }
      // Crea un nuevo producto con el id actual y lo agrega al array de productos
      let newProduct = { ...product, id: this.id };
      this.products.push(newProduct);
       // Incrementa el id en 1
      this.id++;
      // Guarda los productos actualizados en el archivo JSON
      const productsString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productsString);
      // Devuelve un mensaje indicando que el producto se agregó correctamente
      return 'Producto agregado';
    }
    // llamo al metodo getProduct
    getProducts() {
      return this.products;
    }
    // llamo al metodo getProductById
    getProductById(id) {
      let found = this.products.find((p) => p.id === id);
      if (!found) {
        return 'no se encontro el producto';
      }
      return found;
    }
    // llamo al método updateProduct que actualiza los productos en el archivo JSON
    updateProduct() {
      const productsString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productsString);
    }
    // llamo al método deleteProduct que elimina un producto por id
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
      const productsString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productsString);
    }
}
  // Crea dos objetos de prueba
  const product = {
    title:"producto prueba",
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail:
      'Sin imagen',
    code: 'abc123',
    stock: 20,
  };
  const product2 = {
    title:"producto prueba",
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail:
      'Sin imagen',
    code: 'abc123',
    stock: 20,
  };
  
  // Creo una nueva instancia de ProductManager
  const productManager = new ProductManager("productos.json");
  
  // Agrega un producto de prueba
  console.log(productManager.addProduct(product));

  // Para que verifique si existe o no el codigo  
  //console.log(productManager.addProduct(product2));
  
  // Obtiene todos los productos
  console.log(productManager.getProducts());

  // Obtiene un producto por id
  console.log(productManager.getProductById(1));

// actualización de un producto
const productToUpdate = productManager.getProductById(1);
productToUpdate.price = 250;
productToUpdate.stock = 15;
productManager.updateProduct();

// eliminación de un producto
productManager.deleteProduct(2);
console.log(productManager.getProducts());