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
      precio: ['', [Validators.required, Validators.min(1), Validators.max(45)]]
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
    console.log('diferencia: ', this.diferencia);
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
    console.log('negativo');
    return ((this.porcentajeConRespectoAPesoBase / 50) + ((this.cociente * this.diferencia) / 100)) * this.pesoBase;
  }

  set pesoBaseValor(pesoBase: number) {
    this.pesoBase = pesoBase;
  }

  setPesoBase(pan: string): void {
    console.log(pan);
    switch (pan) {
      case 'salado':
        this.pesoBaseValor = 300;
        break;
      case 'dulce':
      case 'tamal':
        this.pesoBaseValor = 280;
        break;
      case 'chapata':
        this.pesoBaseValor = 150;
        break;
      default:
        this.pesoBaseValor = 300;
        break;
    }
  }

  setPorcentajeConRespectoAPesoBase(precio: number): void {
    if (precio >= 1 && precio <= 4) {
      this.porcentajeConRespectoAPesoBaseValor = 40;
    } else if (precio >= 5 && precio <= 15) {
      this.porcentajeConRespectoAPesoBaseValor = 45;
    } else if (precio >= 16 && precio <= 25) {
      this.porcentajeConRespectoAPesoBaseValor = 40;
    } else if (precio >= 26 && precio <= 35) {
      this.porcentajeConRespectoAPesoBaseValor = 35;
    } else if (precio >= 36 && precio <= 45) {
      this.porcentajeConRespectoAPesoBaseValor = 30;
    } else {
      this.porcentajeConRespectoAPesoBaseValor = 30;
    }
  }

  onSubmit(): void {
    if (this.form.get('precio')?.valid && this.form.get('peso')?.valid) {
      this.openDialog();
    } else {
      this.openSnackBar('PURAS FALLAS CONTIGO 😞');
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
    this.snackBar.open(message, action);
  }
}
