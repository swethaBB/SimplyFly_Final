import { makePayment } from '../services/paymentService';

export const processPayment = async (data) => {
  return await makePayment(data);
};
