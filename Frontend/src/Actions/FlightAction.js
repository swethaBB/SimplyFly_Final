import { searchFlights } from '../services/flightService';

export const fetchFlights = async (origin, destination) => {
  return await searchFlights(origin, destination);
};
