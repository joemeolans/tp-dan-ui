'use client';

import Sidebar from "@/components/Sidebar";
import styles from "./page.module.css";

export default function ClienteLayout({ children }) {
  return (
    <div className={styles.main}>
      <div className="container">
        <Sidebar/>
        <main>{children}</main>
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        main {
          flex: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
