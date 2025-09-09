import { createBooking } from '../services/bookingService';

export const bookFlight = async (data) => {
  return await createBooking(data);
};
