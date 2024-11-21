import { Header } from "@/components/header"
import { Outlet } from "react-router-dom"  // é o conteudo especifico que estou utilizando em cada pagina

export function AppLayout(){
    return(
        <div className="flex min-h-screen flex-col antialiased">
          <Header/>

            <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
                <Outlet/>
            </div>
        </div>
    )
}