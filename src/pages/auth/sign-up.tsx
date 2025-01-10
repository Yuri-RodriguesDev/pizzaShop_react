// linha 54 estou colocando todo o componente do botão e colocando por volta do link
// validando email na linha 20
// REGISTER lida com a parte de registro de formulario
// handlesubmit serve para lidar com sumbit de um formulario
// data: any é usada para processar os dados de login do usuário no formulario
// isSubmitting verifica o estado e retorna verdadeiro ou falso

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

const signUpForm = z.object({
  //quando o usuario fizer o submit, o data vai ser um objeto
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>; // covertendo a estrutura do zod para o typeScript

export function SignUp() {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>(); // estou acessando a linha  do form usando handle submit que vem de dentro do useform


const {mutateAsync: registerRestaurantFn} = useMutation({
    mutationFn: registerRestaurant,
})


  async function handleSignUp(data: SignUpForm) {
    try {
     
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })
     

      toast.success('Restaurante cadastrado com sucesso!', {
        // funciona quando o usuário recebe a autenticação, é autenticado por emeil pois não precisa de senha
        action: {
          label: 'Login', // ao clicar va pra pagina de login
          onClick: () => navigate(`/sign-in?email=${data.email}`), // quando não houver link, use o navigate para jogar para outra pagin
        },
      })
    } catch {
      toast.error('Erro ao cadastrar restaurante.');
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-muted-forenground text-sm">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome </Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <a className="underlineerline underline" href="">
                termos de serviço
              </a>{" "}
              e {""}
              <a className="underlinene underline" href="">
                politicas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
