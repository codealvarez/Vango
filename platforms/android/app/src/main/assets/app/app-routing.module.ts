import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "disponibles", loadChildren: "./disponibles/disponibles.module#DisponiblesModule" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "registro", loadChildren: "./registro/registro.module#RegistroModule" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "perfil", loadChildren: "./perfil/perfil.module#PerfilModule" },
    { path: "ayuda", loadChildren: "./ayuda/ayuda.module#AyudaModule" },
    { path: "reservas", loadChildren: "./reservas/reservas.module#ReservasModule" },
    { path: "ruta", loadChildren: "./ruta/ruta.module#RutaModule" },
    { path: "ruta/:idruta/:idviaje/:precio/:nombre", loadChildren: "./ruta/ruta.module#RutaModule" },
    { path: "reservar", loadChildren: "./reservar/reservar.module#ReservarModule" },
    { path: "viaje", loadChildren: "./viaje/viaje.module#ViajeModule" },
    { path: "viaje/:idruta/:idviaje", loadChildren: "./viaje/viaje.module#ViajeModule" },
    { path: "viaje/:idruta/:idviaje/:placa", loadChildren: "./viaje/viaje.module#ViajeModule" },
    { path: "viaje/:idruta/:idviaje/:placa/:idconductor", loadChildren: "./viaje/viaje.module#ViajeModule" },
    { path: "historial", loadChildren: "./historial/historial.module#HistorialModule" },
    { path: "tarjetas", loadChildren: "./tarjetas/tarjetas.module#TarjetasModule" },
    { path: "agregarTarjeta", loadChildren: "./agregarTarjeta/agregarTarjeta.module#AgregarTarjetaModule" },
    { path: "horarios", loadChildren: "./horarios/horarios.module#HorariosModule" },
    { path: "horarios/:idruta/:nombreruta", loadChildren: "./horarios/horarios.module#HorariosModule" },
    { path: "recorrido", loadChildren: "./recorrido/recorrido.module#RecorridoModule" },
    { path: "recorrido/:idruta/:idviaje", loadChildren: "./recorrido/recorrido.module#RecorridoModule" },
    { path: "recorrido/:idruta/:idviaje/:nombreruta", loadChildren: "./recorrido/recorrido.module#RecorridoModule" },
    { path: "calificar/:idruta/:idviaje/:placa/:idconductor", loadChildren: "./calificar/calificar.module#CalificarModule" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
