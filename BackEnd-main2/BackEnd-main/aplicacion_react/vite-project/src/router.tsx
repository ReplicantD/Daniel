import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./views/Home";
import Arriendos,{loader as loaderArriendos} from "./views/Arriendos";
import NuevoArriendo from "./views/NuevoArriendo";
import DevolucionArriendo,{loader as loaderDevolucion} from "./views/DevolucionArriendo";
import ActivoArriendo from "./views/ActivoArriendo";
import TerminadoArriendo from "./views/TerminadoArriendo";
import EstadisticaArriendo from "./views/EstadisticaArriendo";
import Login, {action as loginAction} from "./views/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import CrearCuenta, { action as crearCuentaAction } from "./views/CrearCuenta";
export const router = createBrowserRouter([
    {
        path:'/usuarios/crear',
        element:<CrearCuenta/>,
        action:crearCuentaAction
    },
    
    {
        path:'/login',
        element:<Login/>,
        action:loginAction,
    },
    {
        path:'/',
        element:<Layout />,
        children:[
            {
                element:<PrivateRoute/>,
                children:[
                    {
                index:true,
                element: <Home/>
            },
            {
                path:'arriendos/borrar',
                element: <Arriendos/>,
                loader: loaderArriendos,
            },
            {
                path:'arriendos/crear',
                element: <NuevoArriendo/>
            },
            {
                path:'arriendos/devolucion',
                element: <DevolucionArriendo/>,
                loader: loaderDevolucion,
            },
            {
                path:'arriendos/activos',
                element: <ActivoArriendo/>
            },
            {
                path:'arriendos/terminados',
                element: <TerminadoArriendo/>
            },
            {
                path:'arriendos/estadisticas',
                element: <EstadisticaArriendo/>
            },
                ]
            }
            
        ],
    },
])