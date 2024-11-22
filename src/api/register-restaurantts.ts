import { api } from "@/lib/axios";

export interface RegisterRestaurantBody {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  email,
  phone,
}: RegisterRestaurantBody) {
  // função que esta tipando o axios e trazendo requisições
  await api.post('/restaurants', {
    restaurantName,
    managerName,
    email,
    phone,
  });
}
