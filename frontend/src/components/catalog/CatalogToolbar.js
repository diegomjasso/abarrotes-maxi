import React from "react";
import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CatalogToolbar = ({ search, setSearch, onAdd }) => {
  return (
    <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
      <TextField
        label="Buscar por nombre, marca o código"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        Agregar
      </Button>
    </Box>
  );
};

export default CatalogToolbar;