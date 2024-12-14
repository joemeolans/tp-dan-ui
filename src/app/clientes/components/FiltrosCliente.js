import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


const FiltroBusqueda = () => (
    <div style={{   display: 'flex', 
                    justifyContent : 'space-between',
                    alignItems: 'center', 
                    backgroundColor: '#eafafa', 
                    padding: '20px', 
                    borderRadius: '10px' }}>
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
            <TextField id="filterCuit" label="CUIT" variant="outlined" size="small"/>
            <TextField id="filterNombre" label="Nombre" variant="outlined" size="small" />
        </Box>
        <Stack 
            direction="row" 
            spacing={2}
            sx={{
                marginLeft: 'auto',
            }}
            >
            <Button variant="contained" endIcon={<FilterAltOffIcon />}>
                Limpiar filtros
            </Button>
            <Button variant="contained" endIcon={<SearchIcon />}>
                Buscar
            </Button>
            
        </Stack>
    </div>
  
);
  
export default FiltroBusqueda;


  