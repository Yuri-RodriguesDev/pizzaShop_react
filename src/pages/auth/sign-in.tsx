// validando email na linha 20
// REGISTER lida com a parte de registro de formulario
// handlesubmit serve para lidar com sumbit de um formulario
// data: any é usada para processar os dados de login do usuário no formulario
// isSubmitting verifica o estado e retorna verdadeiro ou falso

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import {  Link, useSearchParams} from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/api/sign-in"

const signInForm = z.object({
  //quando o usuario fizer o submit, o data vai ser um objeto
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInForm>; // covertendo a estrutura do zod para o typeScript



export function SignIn() {

const [seachParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }, // estou acessando a linha 30 do form usando handle submit que vem de dentro do useform
  } = useForm<SignInForm>({
    defaultValues: {
      email: seachParams.get('email') ?? '',
    },
  }) 


  const {mutateAsync: authenticate} = useMutation({         // retornando uma ação que não é uma ação de listagem
    mutationFn: signIn,
})



  async function handleSignIn(data: SignInForm) {
    try {
      

      await authenticate({email: data.email})

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        // funciona quando o usuário recebe a autenticação, é autenticado por emeil pois não precisa de senha
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data), //parei aqui
        },
      })
    } catch {
      toast.error("Credenciais inválidas.")
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-muted-forenground text-sm">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessr Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
