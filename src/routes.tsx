import { createBrowserRouter } from "react-router-dom"

import { SignIn } from "./pages/auth/sign-in"
import { AppLayout } from "./pages/_layouts/app"
import { AuthLayout } from "./pages/_layouts/auth"
import { SignUp } from "./pages/auth/sign-up"
import { Orders } from "./pages/app/orders/orders"
import { Dashboard } from "./pages/app/dashboard/dashboard"
import { NotFound } from "./pages/404"

export const router = createBrowserRouter([
  // criando um arrey pr quando o usurário acessar barra, cair no elemento Dashboard

  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound/>, //criando um aviso ao acessar uma pagina não encontrada
    children: [
      { path: "/", element: <Dashboard/> },
      { path: "/orders", element: <Orders /> }
    ], // criando sub rota Dashboard
  },

  
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ], // criando sub rota Dashboard
  },

  //{path:'/', element: <Dashboard />},
  //{path: '/sign-in', element: <SignIn />},
])
