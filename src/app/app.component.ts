import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pan } from './app.model';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  precioACalcular = 0;
  PRECIO_BASE = 10;

  porcentajeConRespectoAPesoBase = 0;
  DIVISOR = 5; //

  pesoBase = 0;
  tipoPan = 'Pan Salado';
  panes: Pan[] = [
    { value: 'salado', viewValue: 'Pan Salado' },
    { value: 'dulce', viewValue: 'Pan Dulce' },
    { value: 'chapata', viewValue: 'Chapata' },
    { value: 'tamal', viewValue: 'Tamal de Harina' },
    { value: 'empanada', viewValue: 'Empanada' },
  ];

  form: FormGroup;
  peso = 0;
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      pan: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(1), Validators.max(10000)]]
    });
    this.form.get('pan')?.valueChanges.subscribe(
      pan => {
        this.setPesoBase(pan);
        if (this.form.get('precio')?.valid) {
          this.calcularPeso();
        }
      }
    );
    this.form.get('precio')?.valueChanges.subscribe(
      precio => {
        this.precioACalcularValor = precio;
        this.setPorcentajeConRespectoAPesoBase(precio);
        if (this.form.get('pan')?.valid) {
          this.calcularPeso();
        }
      }
    );
  }
  calcularPeso(): void {
    this.peso = (this.diferencia >= 0) ? this.pesoDiferenciaPositiva : this.pesoDiferenciaNegativa;
  }

  get precio(): number {
    return this.form.get('precio')?.value;
  }

  get pan(): string {
    return this.form.get('pan')?.value;
  }

  get diferencia(): number {
    return this.precioACalcular - this.PRECIO_BASE;
  }

  set precioACalcularValor(precioACalcular: number) {
    this.precioACalcular = precioACalcular;
  }

  get cociente(): number {
    return this.porcentajeConRespectoAPesoBase / this.DIVISOR;
  }

  set porcentajeConRespectoAPesoBaseValor(porcentajeConRespectoAPesoBase: number) {
    this.porcentajeConRespectoAPesoBase = porcentajeConRespectoAPesoBase;
  }

  get pesoDiferenciaPositiva(): number {
    return (1 + ((this.cociente * this.diferencia) / 100)) * this.pesoBase;
  }

  get pesoDiferenciaNegativa(): number {
    return ((this.porcentajeConRespectoAPesoBase / 50) + ((this.cociente * this.diferencia) / 100)) * this.pesoBase;
  }

  set pesoBaseValor(pesoBase: number) {
    this.pesoBase = pesoBase;
  }

  setPesoBase(pan: string): void {
    switch (pan) {
      case 'salado':
        this.pesoBaseValor = 300;
        break;
      case 'dulce':
        this.pesoBaseValor = 280;
        break;
      case 'tamal':
        this.pesoBaseValor = 270;
        break;
      case 'chapata':
        this.pesoBaseValor = 150;
        break;
      case 'empanada':
        this.pesoBaseValor = 150;
        break;
      default:
        this.pesoBaseValor = 300;
        break;
    }
  }

  setPorcentajeConRespectoAPesoBase(precio: number): void {
    if (precio >= 1 && precio <= 9) {
      this.porcentajeConRespectoAPesoBaseValor = 46.5;
    } else if (precio >= 10 && precio <= 15) {
      this.porcentajeConRespectoAPesoBaseValor = 45;
    } else if (precio >= 16 && precio <= 25) {
      switch (precio) {
        case 16:
          this.porcentajeConRespectoAPesoBaseValor = 39.5;
          break;
        case 17:
          this.porcentajeConRespectoAPesoBaseValor = 39;
          break;
        case 18:
          this.porcentajeConRespectoAPesoBaseValor = 38.5;
          break;
        case 19:
          this.porcentajeConRespectoAPesoBaseValor = 38;
          break;
        case 20:
          this.porcentajeConRespectoAPesoBaseValor = 37.5;
          break;
        case 21:
          this.porcentajeConRespectoAPesoBaseValor = 37;
          break;
        case 22:
          this.porcentajeConRespectoAPesoBaseValor = 36.5;
          break;
        case 23:
          this.porcentajeConRespectoAPesoBaseValor = 36;
          break;
        case 24:
          this.porcentajeConRespectoAPesoBaseValor = 35.5;
          break;
        case 25:
          this.porcentajeConRespectoAPesoBaseValor = 35;
          break;
        default:
          this.porcentajeConRespectoAPesoBaseValor = 35;
          break;
      }
    } else if (precio >= 26 && precio <= 35) {
      switch (precio) {
        case 26:
          this.porcentajeConRespectoAPesoBaseValor = 34.5;
          break;
        case 27:
          this.porcentajeConRespectoAPesoBaseValor = 34;
          break;
        case 28:
          this.porcentajeConRespectoAPesoBaseValor = 33.5;
          break;
        case 29:
          this.porcentajeConRespectoAPesoBaseValor = 33;
          break;
        case 30:
          this.porcentajeConRespectoAPesoBaseValor = 32.5;
          break;
        case 31:
          this.porcentajeConRespectoAPesoBaseValor = 32;
          break;
        case 32:
          this.porcentajeConRespectoAPesoBaseValor = 31.5;
          break;
        case 33:
          this.porcentajeConRespectoAPesoBaseValor = 31;
          break;
        case 34:
          this.porcentajeConRespectoAPesoBaseValor = 30.5;
          break;
        case 35:
          this.porcentajeConRespectoAPesoBaseValor = 30;
          break;
        default:
          this.porcentajeConRespectoAPesoBaseValor = 30;
          break;
      }
    } else if (precio >= 36 && precio <= 10000) {
      switch (precio) {
        case 36:
          this.porcentajeConRespectoAPesoBaseValor = 29.5;
          break;
        case 37:
          this.porcentajeConRespectoAPesoBaseValor = 29;
          break;
        case 38:
          this.porcentajeConRespectoAPesoBaseValor = 28.5;
          break;
        case 39:
          this.porcentajeConRespectoAPesoBaseValor = 28;
          break;
        case 40:
          this.porcentajeConRespectoAPesoBaseValor = 27.5;
          break;
        case 41:
          this.porcentajeConRespectoAPesoBaseValor = 27;
          break;
        case 42:
          this.porcentajeConRespectoAPesoBaseValor = 26.5;
          break;
        case 43:
          this.porcentajeConRespectoAPesoBaseValor = 26;
          break;
        case 44:
          this.porcentajeConRespectoAPesoBaseValor = 25.5;
          break;
        case 45:
          this.porcentajeConRespectoAPesoBaseValor = 25;
          break;
      }
    } else {
      this.porcentajeConRespectoAPesoBaseValor = 25;
    }
  }

  onSubmit(): void {
    if (this.form.get('precio')?.valid && this.form.get('pan')?.valid) {
      this.openDialog();
    } else {
      this.openSnackBar('TODOROKI ESTA DECEPCIONADO 😞');
    }
  }

  openDialog(): void {
    const selectedPan = this.panes.filter(pan => pan.value === this.pan);
    this.dialog.open(DialogComponent, {
      width: '90vw',
      data: {
        pan: selectedPan[0].viewValue,
        precio: this.precio,
        peso: this.peso
      }
    });
  }

  openSnackBar(message: string, action = 'ACEPTAR'): void {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}
