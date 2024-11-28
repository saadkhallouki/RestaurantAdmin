export interface ReservationDTO {
    email: string;
    people: number;
    date: string;
    restaurantId: number;  // Ajouté pour identifier le restaurant
  }