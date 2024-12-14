'use client';
import { useState } from 'react';

import Link from 'next/link';
import { buscarProducto } from "@/lib/productos-api";

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  
  const handleSearch = async () => {
    const lista = await buscarProducto('abc');
    console.log(lista);
    // Simulate a search by filtering some dummy data
    const dummyData = [
      { numeroPedido: 1, estado: 'Product 1' , cliente: 'Client 1', total: 100},
      { numeroPedido: 2, estado: 'Product 2' , cliente: 'Client 2', total: 200},
      { numeroPedido: 3, estado: 'Product 3' , cliente: 'Client 3', total: 300},
      { numeroPedido: 4, estado: 'Product 4' , cliente: 'Client 4', total: 400},
      { numeroPedido: 5, estado: 'Product 5' , cliente: 'Client 5', total: 500},
      { numeroPedido: 6, estado: 'Product 6' , cliente: 'Client 6', total: 600},
    ];
    setResults(dummyData);
  };

  return (
    <>
      <a href='/'>
        Volver atras
      </a>
      <h1>Productos Page</h1>
      <input 
        type="text" 
        placeholder="Buscar por número o nombre de producto" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearch}>Buscar</button>
      <Link href="/productos/new">
        <button>Crear nuevo producto</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Numero Pedido</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map(product => (
            <tr key={product.numeroPedido}>
              <td>
                <Link href={`/productos/${product.id}`}>{product.id}</Link>
              </td>
              <td>{product.estado}</td>
              <td>{product.cliente}</td>
              <td>{product.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
