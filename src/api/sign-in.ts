import {api} from "@/lib/axios";

export interface SignInBody {
    email: string
}

export async function signIn({email}: SignInBody) { // função que esta tipando o axios e trazendo requisições 
    await api.post('/authenticate', {email})
}