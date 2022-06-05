import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Console } from 'console';
import { concatMap, forkJoin, merge, switchMap } from 'rxjs';
import { Estacion } from 'src/app/models/estacion.model';
import { CiudadService } from 'src/app/services/ciudad.service';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { AddEstacionComponent } from './add-estacion/add-estacion.component';
import { UpdateEstacionComponent } from './update-estacion/update-estacion.component';

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrls: ['./estaciones.component.scss']
})
export class EstacionesComponent implements OnInit {

  displayedColumns:string[]=['position','nombre','topic','latitud','longitud','ciudad','departamento','estado','edit']
  dataSource!:any[];

  constructor(public dialog: MatDialog, private estacionService:EstacionService, private departamentoService:DepartamentosService,
    private ciudadService:CiudadService) { }

  ngOnInit(): void {
    this.estacionService.Get().subscribe((info:any)=>{
      this.dataSource=info.estaciones;
      console.log(info)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEstacionComponent, {
      width: '30vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    }); 
  }

  editStation(estacion:any):void{
    const dialogRef = this.dialog.open(UpdateEstacionComponent, {
      width: '30vw',
      data:estacion
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
     
  }

  changeStatus(event:MatSlideToggleChange,station:any){
    const title=event.checked?"¿Desea habilitar la estación?":"¿Desea deshabilitar la estación?";
    const onAccept=event.checked?"Habilitar":"Deshabilitar";
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '30vw',
      data:{
        title, 
        onRefuse:"Cancelar",
        onAccept
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        station.enabled=event.checked;
        this.estacionService.Actualizar(station,station.uid).subscribe(resp=>{
          this.dataSource.find(sta=>sta.uid==station.uid).enabled=event.checked;
          console.log(resp)
        })
      }else{
        console.log(event)
        event.source.writeValue(!event.checked);
      }
    });
  }





}


