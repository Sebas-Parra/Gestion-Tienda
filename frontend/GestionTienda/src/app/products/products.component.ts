import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductosSService, Product, ProductInput } from '../productos-s.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private productosService = inject(ProductosSService); // inyección del servicio
  productos: Product[] = []; // aquí se guardarán los datos

  ngOnInit(): void {
    this.productosService.getAllProducts().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  modalAbierto: boolean = false;
  productoActual = signal<any>(null);
  verProductModal(producto: any) {
    this.modalAbierto = true;
    this.productoActual.set(producto);
  }
  cerrarModal(): void {
    this.modalAbierto = false;
    this.productoActual.set(null);
  }


  //Agregar producto
  modalAgregarAbierto: boolean = false;
  nuevoProducto: ProductInput = {name: '', description: '', price: 0 };
  abrirModalAgregar(): void {
    this.modalAgregarAbierto = true;
    this.nuevoProducto = {name: '', description: '', price: 0 };
  }

  agregarProducto(): void {
    this.productosService.createProduct(this.nuevoProducto).subscribe({
      next: (data) => {
        console.log('Producto agregado:', data);
        this.cerrarModalAgregar();
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error al agregar producto:', err);
      }
    });
  }


  cerrarModalAgregar(): void {
    this.modalAgregarAbierto = false;
    this.nuevoProducto = {name: '', description: '', price: 0 };
  }


  //Editar producto

  modalEdicionAbierta: boolean = false;
  productoEditado: Product = { id: 0, name: '', description: '', price: 0 };
  abrirModalEdicion(producto: Product) {
    this.modalEdicionAbierta = true;
    this.productoEditado = { ...producto }; // Copia para no modificar directamente
  }

  cerrarModalEdicion(): void {
    this.modalEdicionAbierta = false;
    this.productoEditado = { id: 0, name: '', description: '', price: 0 };
  }

  guardarCambios(): void {
    this.productosService.updateProduct(this.productoEditado.id, this.productoEditado).subscribe({
      next: (data) => {
        console.log('Producto editado:', data);
        this.cerrarModalEdicion();
        this.ngOnInit(); // Recarga los productos
      },
      error: (err) => {
        console.error('Error al editar producto:', err);
      }
    });
  }

  //Eliminar producto
  modalEliminarAbierto: boolean = false;
productoAEliminar: Product | null = null;

  abrirModalEliminar(producto: Product): void {
  this.modalEliminarAbierto = true;
  this.productoAEliminar = producto;
}

cerrarModalEliminar(): void {
  this.modalEliminarAbierto = false;
  this.productoAEliminar = null;
}

confirmarEliminarProducto(): void {
  if (this.productoAEliminar) {
    this.productosService.deleteProduct(this.productoAEliminar.id).subscribe({
      next: () => {
        console.log('Producto eliminado:', this.productoAEliminar?.name);
        this.cerrarModalEliminar();
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
      }
    });
  }
}

busqueda: string = '';

productosFiltrados(): Product[] {
  if (!this.busqueda.trim()) return this.productos;

  const filtro = this.busqueda.toLowerCase();

  return this.productos.filter(producto =>
    producto.name.toLowerCase().includes(filtro) ||
    producto.description.toLowerCase().includes(filtro) ||
    producto.price.toString().includes(filtro)
  );
}


}
