'use client';
import { useState } from 'react';

import Link from 'next/link';

export default function Pedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  
  const handleSearch = async () => {
    const lista = await buscarPedido('abc');
    console.log(lista);
    // Simulate a search by filtering some dummy data
    const dummyData = [
      { id: 1, name: 'Pedido 1' },
      { id: 2, name: 'Pedido 2' },
    ];
    setResults(dummyData.filter(pedido => pedido.name.includes(searchTerm) || pedido.id.toString() === searchTerm));
  };

  return (
    <>
      <a href='/'>
        Volver atras
      </a>
      <h1>Pedidos Page</h1>
      <input 
        type="text" 
        placeholder="Buscar por número o nombre de pedido" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearch}>Buscar</button>
      <Link href="/pedidos/new">
        <button>Crear nuevo pedido</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {results.map(pedido => (
            <tr key={pedido.id}>
              <td>
                <Link href={`/pedidos/${pedido.id}`}>{pedido.id}</Link>
              </td>
              <td>{pedido.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
