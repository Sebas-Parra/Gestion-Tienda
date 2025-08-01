import { Component, OnInit, inject, signal  } from '@angular/core';
import { CategorieSService, Category, CategoryInput } from '../categorie-s.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private categoryService = inject(CategorieSService); // inyección del servicio
  categorias: Category[] = []; // aquí se guardarán los datos

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al obtener categorias:', err);
      }
    });
  }


  //Agregar categoria
  modalAgregarAbierto: boolean = false;
nuevaCategoria: CategoryInput = { name: '', description: '' };
  abrirModalAgregar(): void {
  this.modalAgregarAbierto = true;
  this.nuevaCategoria = { name: '', description: '' };
}


  agregarCategoria(): void {
  this.categoryService.createCategory(this.nuevaCategoria).subscribe({
    next: (data) => {
      console.log('Categoria agregada:', data);
      this.cerrarModalAgregar();
      this.ngOnInit(); // Recarga las categorías
    },
    error: (err) => {
      console.error('Error al agregar categoria:', err);
    }
  });
}


  cerrarModalAgregar(): void {
  this.modalAgregarAbierto = false;
  this.nuevaCategoria = { name: '', description: '' };
}


  //Ver categoria
  modalAbierto: boolean = false;
  categoriaActual = signal<any>(null);
  verCategoryModal(categoria: any) {
    this.modalAbierto = true;
    this.categoriaActual.set(categoria);
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.categoriaActual.set(null);
  }   

  //Editar categoria
  modalEdicionAbierto: boolean = false;
  categoriaEdicion: Category = { id: 0, name: '', description: '', createdAt: new Date() };
  abrirModalEdicion(categoria: Category): void {
    this.modalEdicionAbierto = true;
    this.categoriaEdicion = { ...categoria };
  }

  cerrarModalEdicion(): void {
    this.modalEdicionAbierto = false;
    this.categoriaEdicion = { id: 0, name: '', description: '', createdAt: new Date() };
  }

  editarCategoria(): void {
    this.categoryService.updateCategory(this.categoriaEdicion.id, this.categoriaEdicion).subscribe({
      next: (data) => {
        console.log('Categoria editada:', data);
        this.cerrarModalEdicion();
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error al editar categoria:', err);
      }
    });
  }

  //Eliminar categoria
  modalEliminarAbierto: boolean = false;
categoriaAEliminar: Category | null = null;
  abrirModalEliminar(categoria: Category): void {
    this.modalEliminarAbierto = true;
    this.categoriaAEliminar = categoria;
  }

  cerrarModalEliminar(): void {
    this.modalEliminarAbierto = false;
    this.categoriaAEliminar = null;
  }

  confirmarEliminarCategoria(): void {
  if (this.categoriaAEliminar) {
    this.categoryService.deleteCategory(this.categoriaAEliminar.id).subscribe({
      next: () => {
        console.log('Categoria eliminada:', this.categoriaAEliminar?.id);
        this.cerrarModalEliminar();
        this.ngOnInit(); // Recargar lista
      },
      error: (err) => {
        console.error('Error al eliminar categoria:', err);
      }
    });
  }
}

busqueda: string = '';

categoriasFiltradas(): Category[] {
  if (!this.busqueda.trim()) return this.categorias;

  const filtro = this.busqueda.toLowerCase();

  return this.categorias.filter(categoria =>
    categoria.name.toLowerCase().includes(filtro) ||
    categoria.description.toLowerCase().includes(filtro)
  );
}


}
