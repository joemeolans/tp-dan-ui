"use client";
import { useState } from "react";
import Image from 'next/image';

const Sidebar = () => {
  const [activePage, setActivePage] = useState("Cliente");

  return (
    <aside>
      <div className="logo">
        <Image src="/logoUtn.png" 
              alt="Logo" 
              layout="responsive"
              width={500}
              height={300}/>
      </div>
      <nav>
        <button
          className={activePage === "Cliente" ? "active" : ""}
          onClick={() => setActivePage("Cliente")}
        >
          Cliente
        </button>
        <button
          className={activePage === "Pedidos" ? "active" : ""}
          onClick={() => setActivePage("Pedidos")}
        >
          Pedidos
        </button>
        <button
          className={activePage === "Productos" ? "active" : ""}
          onClick={() => setActivePage("Productos")}
        >
          Productos
        </button>
      </nav>
      <style jsx>{`
        aside {
          width: 200px;
          background: rgb(20, 92, 165);
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
        }
        .logo {
          margin-bottom: 20px;
          padding: 10px 0;
          width: 100%;
          text-align: center;
        }
        .logo img {
          max-width: 100%;
          height: auto;
        }
        nav {
          width: 100%;
        }
        button {
          width: 100%;
          padding: 15px;
          background: rgb(20, 92, 165);
          color: #fff;
          border: none;
          border-right: 4px solid transparent; /* Barra lateral desactivada */
          cursor: pointer;
          font-size: 16px;
          text-align: left;
          transition: all 0.3s;
        }
        button:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .active {
          background: rgba(255, 255, 255, 0.1);
          border-right: 4px solid #fff; 
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;


