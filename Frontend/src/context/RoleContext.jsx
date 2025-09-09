import { createContext, useContext } from 'react';

export const RoleContext = createContext('USER');
export const useRole = () => useContext(RoleContext);
