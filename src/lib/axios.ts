import { env } from '@/env'

import axios from 'axios'

export const api = axios.create({
    baseURL: env.VITE_API_URL,
    
    withCredentials: true,  // tornando os kokies sendo enviados automaticamente para o front e back end

    
})