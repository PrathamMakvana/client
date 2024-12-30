import React, { useContext, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ClientsContext } from "../context/clientContext";

export default function ClientDtails() {
  const [filterType, setFilterType] = useState("All");

  const { clients, getAllClients } = useContext(ClientsContext);
  console.log("🚀clients --->", clients);

  const filteredData = useMemo(() => {
    console.log("🚀filterType --->", filterType);
    const data =
      filterType !== "All"
        ? clients.filter(
            (interaction) => interaction.interactionType === filterType
          )
        : clients;

    console.log("🚀filteredData length --->", data.length);
    return data;
  }, [filterType, clients]);

  console.log("🚀filteredData --->", filteredData);

  useEffect(() => {
    getAllClients();
  }, []);

  const columns = [
    { field: "clientName", headerName: "Client Name", flex: 1 },
    { field: "interactionType", headerName: "Interaction Type", flex: 1 },
    { field: "interactionDate", headerName: "Interaction Date", flex: 1 },
    { field: "notes", headerName: "Notes", flex: 2 },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center">Client Interactions</h2>

      <FormControl fullWidth className="mb-4">
        <InputLabel id="filter-label">Filter by Interaction Type</InputLabel>
        <Select
          labelId="filter-label"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          label="Filter by Interaction Type"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Call">Call</MenuItem>
          <MenuItem value="Email">Email</MenuItem>
          <MenuItem value="Meeting">Meeting</MenuItem>
        </Select>
      </FormControl>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredData.map((row) => ({ ...row, id: row._id }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
