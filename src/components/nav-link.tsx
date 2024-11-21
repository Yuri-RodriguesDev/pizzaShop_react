
import {Link, LinkProps,  useLocation } from "react-router-dom"

export type NavLinkProps = LinkProps// eu quero que ele extenda todas as propriedades de um link

export function Navlink(props: NavLinkProps) {
     
const {pathname} = useLocation()

    return ( 
        
    <Link
      data-current={pathname == props.to}  // se a rota que eu estou é igual a rota de endereço do link então continua
    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground "
     {...props} />
        
 )
}