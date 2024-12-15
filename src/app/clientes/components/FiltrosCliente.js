import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const FiltroBusqueda = ({ onSearch }) => {
    const [filterCuit, setFilterCuit] = useState('');
    const [filterNombre, setFilterNombre] = useState('');

    const limpiarFiltros = () => {
        setFilterCuit('');
        setFilterNombre('');
        onSearch({ cuit: '', nombre: '' }); // Envía filtros vacíos
    };

    const handleBuscar = () => {
        onSearch({ cuit: filterCuit, nombre: filterNombre }); // Envía los filtros actuales
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#eafafa',
                padding: '20px',
                borderRadius: '10px',
            }}
        >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    gap: '16px',
                    flexGrow: 1,
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="filterCuit"
                    label="CUIT"
                    variant="outlined"
                    size="small"
                    value={filterCuit}
                    onChange={(e) => setFilterCuit(e.target.value)}
                />
                <TextField
                    id="filterNombre"
                    label="Nombre"
                    variant="outlined"
                    size="small"
                    value={filterNombre}
                    onChange={(e) => setFilterNombre(e.target.value)}
                />
            </Box>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    marginLeft: 'auto',
                }}
            >
                <Button variant="contained" endIcon={<FilterAltOffIcon />} onClick={limpiarFiltros}>
                    Limpiar filtros
                </Button>
                <Button variant="contained" endIcon={<SearchIcon />} onClick={handleBuscar}>
                    Buscar
                </Button>
            </Stack>
        </div>
    );
};

export default FiltroBusqueda;
