import { Building, ChevronDown, LogOut } from "lucide-react" // Certifique-se de que lucide-react está corretamente instalado
import { Button } from "./ui/button" // Certifique-se de que o caminho para o componente Button está correto
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu" // Caminho correto para o dropdown
import { useMutation, useQuery } from "@tanstack/react-query" // Certifique-se de que @tanstack/react-query está instalado
import { getProfile } from "@/api/get-profile" // Certifique-se de que o caminho está correto para a API de perfil
import { getManagedRestaurant } from "@/api/get-managed-restaurant" // Verifique se o caminho da API está correto
import { Skeleton } from "./ui/skeleton" // Certifique-se de que o caminho de Skeleton está correto
 // Verifique se Radix UI está corretamente instalado
import { StoreProfileDialog } from "./store-profile-dialog" // Caminho para o modal de perfil da loja
import {  Dialog, DialogTrigger } from "./ui/dialog" // Certifique-se de que o caminho está correto
import { signOut } from "@/api/sign-out" // Caminho correto para a função de logout
import { useNavigate } from "react-router-dom" // Certifique-se de que o react-router-dom está instalado corretamente

export function AccountMenu() {
  const navigate = useNavigate()

  // Consultas para buscar o perfil e o restaurante
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  // Mutação para o logout
  const { mutateAsync: signOutFN, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in", { replace: true }) // Redireciona para a página de login após o logout
    },
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {/* Exibe o nome do restaurante ou um esqueleto de carregamento */}
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}

            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Modal para editar o perfil da loja */}
          <DialogTrigger>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          {/* Botão de logout */}
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
          >
            <button className="w-full" onClick={() => signOutFN()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog para editar perfil da loja */}
      <StoreProfileDialog />
    </Dialog>
  )
}
