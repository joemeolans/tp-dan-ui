'use client';
/*
import { useState, useEffect } from 'react';
import { getAllClientes, getClientesByFilters } from "@/lib/clientes-api";
import StickyTable from '@/components/StickyTable';
import FiltroBusqueda from './components/FiltrosCliente';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const columns = [
    { id: 'cuit', label: 'CUIT', minWidth: 170 },
    { id: 'nombre', label: 'Nombre', minWidth: 100 },
    { id: 'correoElectronico', label: 'E-Mail', minWidth: 170, align: 'right'},
    { id: 'maximoDescubierto', label: 'Max. Desc.', minWidth: 170, align: 'right'},
    { id: 'cantObrasDisponibles', label: 'Obras Disp.', minWidth: 170, align: 'right'},
  ];

  const rows = [
    createData('20-42-33', 'Colo', 'c@frs,.com', 310, 2),
    createData('20-43-33', 'Joe', 'j@frsf.com', 20, 3),
    createData('20-44-33', 'Santi', 's@frsf.com', 30, 4),
    createData('20-45-33', 'Tuti', 't@frsf.com', 40, 5),
    createData('20-46-33', 'Lalo', 'l@frsf.com', 50, 6),
    createData('20-47-33', 'Lolo', 'l@frsf.com', 60, 7),
    createData('20-48-33', 'Lulu', 'l@frsf.com', 70, 8),
  ];

  function createRows() {
    const rows = [];
    for (let i = 0; i < results.length; i++) {for (let i = 0; i < results.length; i++) {
      rows.push(createData(results[i].cuit, results[i].nombre, results[i].correoElectronico, results[i].maximoDescubierto, results[i].cantObrasDisponibles));
    }
    }
    return rows;
  }
  
  
  function createData(cuit, nombre, correoElectronico, maximoDescubierto, cantObrasDisponibles, ) {
    return { cuit, nombre, correoElectronico, maximoDescubierto, cantObrasDisponibles};
  }

  
  useEffect(() => {
    const fetchAllClientes = async () => {
      try {
        const lista = await getAllClientes();
        setResults(lista);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };
    createRows();
    fetchAllClientes();
  }, []);
  
  
  const handleSearch = async () => {
    const lista = await getClientesByFilters();
    console.log(lista);
    // Simulate a search by filtering some dummy data
    const dummyData = [
      { cuit: '20-42-33', nombre: 'Colo', correoElectronico: 'c@frs,.com', maximoDescubierto: 310, cantObrasDisponibles: 2 },
      { cuit: '20-43-33', nombre: 'Joe', correoElectronico: 'j@frsf.com', maximoDescubierto: 20, cantObrasDisponibles: 3 },
      { cuit: '20-44-33', nombre: 'Santi', correoElectronico: 's@frsf.com', maximoDescubierto: 30, cantObrasDisponibles: 4 },
      { cuit: '20-45-33', nombre: 'Tuti', correoElectronico: 't@frsf.com', maximoDescubierto: 40, cantObrasDisponibles: 5 },
      { cuit: '20-46-33', nombre: 'Lalo', correoElectronico: 'l@frsf.com', maximoDescubierto: 50, cantObrasDisponibles: 6 },
      { cuit: '20-47-33', nombre: 'Lolo', correoElectronico: 'l@frsf.com', maximoDescubierto: 60, cantObrasDisponibles: 7 },

    ];
    setResults(dummyData);
    createRows();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
        <h1 style={{fontFamily: 'Arial', 
                    color: '#04265b'
                    }}>Módulo de Clientes</h1>
        <Button variant="contained" endIcon={<HomeIcon />}>
              Volver al menu principal
        </Button>
      </div>
      <hr style={{ border: 'none', height: '3px', backgroundColor: '#04265b', marginBottom: '10px'}}></hr>
      <FiltroBusqueda onSearch={handleSearch} />
      <div style={{ display: 'grid', 
                    justifyContent : 'normal',
                    alignItems: 'center', 
                    backgroundColor: '#eafafa',
                    width: '100%',
                    marginTop: '20px', 
                    padding: '20px', 
                    borderRadius: '10px' }}>
        <StickyTable rows={rows} columns={columns} />
      </div>
    </>
  );
};
*/


import { useState, useEffect } from 'react';
import { getClientesByFilters } from "@/lib/clientes-api";
import StickyTable from '@/components/StickyTable';
import FiltroBusqueda from './components/FiltrosCliente';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';

export default function Clientes() {
    const [filters, setFilters] = useState({ cuit: '', nombre: '' });
    const [results, setResults] = useState([]);

    const columns = [
        { id: 'cuit', label: 'CUIT', minWidth: 170 },
        { id: 'nombre', label: 'Nombre', minWidth: 100 },
        { id: 'correoElectronico', label: 'E-Mail', minWidth: 170, align: 'right' },
        { id: 'maximoDescubierto', label: 'Max. Desc.', minWidth: 170, align: 'right' },
        { id: 'cantObrasDisponibles', label: 'Obras Disp.', minWidth: 170, align: 'right' },
    ];

    const fetchClientes = async (appliedFilters) => {
        try {
            const lista = await getClientesByFilters(appliedFilters);
            setResults(lista);
        } catch (error) {
            console.error("Error al obtener los clientes:", error);
        }
    };

    const handleSearch = (appliedFilters) => {
        setFilters(appliedFilters); // Actualiza los filtros
        fetchClientes(appliedFilters); // Llama al backend
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
                <Button variant="contained" endIcon={<HomeIcon />}>
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
                borderRadius: '10px'
            }}>
                <StickyTable rows={rows} columns={columns} />
            </div>
        </>
    );
}
