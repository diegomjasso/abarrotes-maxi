import React, { useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BluetoothSearchingIcon from "@mui/icons-material/BluetoothSearching";
import SearchIcon from "@mui/icons-material/Search";

import BarcodeScanner from "../shared/BarcodeScanner";

import "../Components.scss";

const CatalogToolbar = ({ search, setSearch, onAdd, onSearch }) => {
  const barcodeInputRef = useRef(null);
  const [openScanner, setOpenScanner] = useState(false);

  /* ========================= */
  /* ACTIVAR MODO LECTOR */
  /* ========================= */
  const activateScannerMode = () => {
    barcodeInputRef.current?.focus();
  };

  /* ========================= */
  /* ENTER = BUSCAR */
  /* ========================= */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(search);
    }
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const label = isMobile ? "Buscar ..."
    : "Buscar por nombre, marca o código (Enter para buscar)";
  const buttonToAdd = isMobile ? (<Button className="button-add-mobile-icon"><AddIcon /></Button>)
    : (<Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          Agregar
        </Button>);
  return (
    <>
      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          label={label}
          fullWidth
          value={search}
          inputRef={barcodeInputRef}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <>
                {/* 🔍 Buscar manual */}
                <Tooltip title="Buscar">
                  <IconButton onClick={() => onSearch(search)}>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>

                {/* 📷 Cámara */}
                <Tooltip title="Escanear con cámara" className="catalog-camara-icon">
                  <IconButton onClick={() => setOpenScanner(true)}>
                    <CameraAltIcon />
                  </IconButton>
                </Tooltip>

                {/* 📡 Lector Bluetooth */}
                <Tooltip title="Usar lector Bluetooth" className="catalog-lector-icon">
                  <IconButton onClick={activateScannerMode}>
                    <BluetoothSearchingIcon />
                  </IconButton>
                </Tooltip>
              </>
            ),
          }}
        />

        {buttonToAdd}
      </Box>

      {/* ========================= */}
      {/* SCANNER (MISMO QUE PRODUCTMODAL) */}
      {/* ========================= */}
      <Dialog
        open={openScanner}
        onClose={() => setOpenScanner(false)}
        fullWidth
      >
        <DialogTitle>Escanear Código</DialogTitle>
        <DialogContent>
          <BarcodeScanner
            onDetected={(code) => {
              setSearch(code);
              onSearch(code); // 🔥 búsqueda automática
              setOpenScanner(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CatalogToolbar;