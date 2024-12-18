import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalNuevoCliente from '@/app/clientes/components/ModalNuevoCliente';
import ModalModificarCliente from '@/app/clientes/components/ModalModificarCliente';
import ModalEliminar from './ModalEliminar';

export default function StickyTable({ rows, columns, loading, selectedIds, setSelectedIds, handleDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openModalNuevo, setOpenModalNuevo] = useState(false);
  const [openModalModificar, setOpenModalModificar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (row) => {
    setSelectedRows((prev) => {
      if (prev.some((selected) => selected.cuit === row.cuit)) {
        return prev.filter((selected) => selected.cuit !== row.cuit);
      }
      return [...prev, row];
    });
  };

  const handleOpenModalNuevo = () => setOpenModalNuevo(true);
  const handleCloseModalNuevo = () => setOpenModalNuevo(false);
  const handleOpenModalModificar = () => setOpenModalModificar(true);
  const handleCloseModalModificar = () => setOpenModalModificar(false);
  const handleOpenModalEliminar = () => setOpenModalEliminar(true);
  const handleCloseModalEliminar = () => setOpenModalEliminar(false);


  if (loading) {
    return (
      <div style={{ height: '300px', width: '100%' }}>
                {/* La carga se manejará en el componente padre */}
            </div>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            onClick={handleOpenModalModificar}
            disabled={selectedRows.length !== 1}
          >
            Modificar cliente
          </Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={handleOpenModalEliminar}
            disabled={selectedRows.length === 0}
          >
            Eliminar cliente/s
          </Button>
        </Box>
        <Button variant="contained" endIcon={<PersonAddIcon />} onClick={handleOpenModalNuevo}>
          Agregar nuevo cliente
        </Button>
      </Box>

      {/* Modal */}
      <ModalNuevoCliente open={openModalNuevo} onClose={handleCloseModalNuevo} />
      <ModalModificarCliente open={openModalModificar} onClose={handleCloseModalModificar} data={selectedRows.at(0)}/>
      <ModalEliminar open={openModalEliminar} 
                      onClose={handleCloseModalEliminar} 
                      data={selectedRows} 
                      handleDelete={handleDelete} 
                      ids={selectedIds} 
                      setIds ={setSelectedIds}/>

      {/* Tabla */}
      <Paper
        sx={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TableContainer sx={{ flex: 1, overflowY: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isSelected = selectedRows.some(
                    (selected) => selected.cuit === row.cuit
                  );
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.cuit}
                      onClick={() => handleRowClick(row)}
                      selected={isSelected}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: isSelected
                          ? '#81BFDA !important'
                          : 'inherit',
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}