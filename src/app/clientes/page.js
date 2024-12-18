"use client";
import { useState, useEffect } from 'react';
import StickyTable from '@/components/StickyTable';
import FiltroBusqueda from './components/FiltrosCliente';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { getAllClientes, getClientesByFilters, deleteCliente} from "@/lib/clientes-api";

export default function Clientes() {
    const [filters, setFilters] = useState({ cuit: '', nombre: '' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const columns = [
        { id: 'cuit', label: 'CUIT', minWidth: 170 },
        { id: 'nombre', label: 'Nombre', minWidth: 100 },
        { id: 'correoElectronico', label: 'E-Mail', minWidth: 170, align: 'right' },
        { id: 'maximoDescubierto', label: 'Max. Desc.', minWidth: 170, align: 'right' },
        { id: 'cantObrasDisponibles', label: 'Obras Disp.', minWidth: 170, align: 'right' },
    ];

    const fetchClientes = async (appliedFilters) => {
        try {
            setIsLoading(true);
            setError(null);
            const lista = await getClientesByFilters(appliedFilters);
            setResults(lista);
            setIsLoading(false);
        } catch (error) {
            console.error("Error al obtener los clientes:", error);
            setError(error.message || "Error al buscar clientes");
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
      try {
          await Promise.all(selectedIds.map(id => deleteCliente(id)));
          const updatedResults = results.filter(cliente => !selectedIds.includes(cliente.id));
          setResults(updatedResults);
          setSelectedIds([]);
      } catch (error) {
          console.error('Error al eliminar clientes:', error);
          throw error; 
      }
  };
  
    
    useEffect(() => {
        const fetchAllClientes = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const lista = await getAllClientes();
                setResults(lista);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al cargar todos los clientes:", error);
                setError(error.message || "Error al cargar clientes");
                setIsLoading(false);
            }
        };
        fetchAllClientes();
    }, []);

    const handleSearch = (appliedFilters) => {
        setFilters(appliedFilters);
        fetchClientes(appliedFilters);
    };

    const rows = results.map(cliente => ({
        cuit: cliente.cuit,
        nombre: cliente.nombre,
        correoElectronico: cliente.correoElectronico,
        maximoDescubierto: cliente.maximoDescubierto,
        cantObrasDisponibles: cliente.cantObrasDisponibles,
    }));

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <h1 style={{
                    fontFamily: 'Arial',
                    color: '#04265b'
                }}>Módulo de Clientes</h1>
                <Button variant="contained" endIcon={<HomeIcon />} href="/">
                    Volver al menú principal
                </Button>
            </div>
            <hr style={{ border: 'none', height: '3px', backgroundColor: '#04265b', marginBottom: '10px' }}></hr>
            
            <FiltroBusqueda onSearch={handleSearch} />
            
            <div style={{
                display: 'grid',
                justifyContent: 'normal',
                alignItems: 'center',
                backgroundColor: '#eafafa',
                width: '100%',
                marginTop: '20px',
                padding: '20px',
                borderRadius: '10px',
                position: 'relative', // Necesario para centrar el loader dentro del contenedor
                height: isLoading ? '200px' : 'auto', // Altura fija mientras carga
            }}>
                {isLoading && (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        backgroundColor: '#dceafc', // Fondo azul suave
                        borderRadius: '10px',
                        color: '#04265b',
                        fontWeight: 'bold',
                        height: '100%',
                        textAlign: 'center'
                    }}>
                        <CircularProgress style={{ color: '#04265b', marginRight: '10px' }} />
                        Cargando clientes...
                    </div>
                )}

                {!isLoading && (
                    <StickyTable 
                        rows={rows} 
                        columns={columns} 
                        loading={isLoading} 
                        selectedIds={selectedIds} 
                        setSelectedIds={setSelectedIds}
                        handleDelete={handleDelete}
                    />
                )}

                {error && (
                    <Alert severity="error" style={{ width: '100%', marginTop: '10px' }}>
                        {error}
                    </Alert>
                )}

                {!isLoading && results.length === 0 && (
                    <Alert severity="info" style={{ width: '100%', marginTop: '10px' }}>
                        No se encontraron clientes
                    </Alert>
                )}
            </div>
        </>
    );
}