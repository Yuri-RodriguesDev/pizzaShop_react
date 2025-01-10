import {api} from '@/lib/axios'

export interface GetManagedRestaurantResponse {
    id: string
    name: string
    createdAt: Date | null
    updatedAt: Date | null
    description: string | null
    managerId: string | null
}

export async function getManagedRestaurant ()  { // função que esta tipando o axios e trazendo requisições 
    const response = await api.get<GetManagedRestaurantResponse>('/managed-restaurant')
    return response.data
}