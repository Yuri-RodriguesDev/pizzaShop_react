import { Outlet } from "react-router-dom"  
import {Pizza} from 'lucide-react'

// é o conteudo especifico que estou utilizando em cada pagina 
// {new Date().getFullYear()} usa JavaScript para obter o ano atual.
//new Date() cria uma nova instância de Date que representa a data e hora atuais.
//.getFullYear() retorna o ano completo dessa data, como 2024, por exemplo.

                                                                                                                                      
export function AuthLayout(){
    return (
        <div className=" grid min-h-screen grid-cols-2 antialiased">
            <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-forenground flex flex-col justify-between"> 
            <div className="flex items-center gap-3 text-lg  text-foreground">
              <Pizza className="h-5 w-5"/>
              <span className="font-semibold">pizza.shop</span>

             </div> 

            <footer className="text-sm"> 
                Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}     

            </footer>

            </div>
            
            <div className="relative flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}