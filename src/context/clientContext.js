import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import { createInteraction, getInteraction } from "../utils/api";

export const ClientsContext = createContext();

const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  const addClientIntraction = async (client) => {
    const res = await createInteraction(client);
    if (res.status === "success") {
      toast.success(res.message);
      getAllClients();
    } else {
      toast.error(res.message);
    }
  };

  const getAllClients = async () => {
    const res = await getInteraction();
    if (res.status === "success") {
      setClients(res.data);
    } else {
      setClients([]);
      toast.error(res.message);
    }
  };

  return (
    <ClientsContext.Provider
      value={{
        clients,
        setClients,
        addClientIntraction,
        getAllClients,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export default ClientsProvider;
