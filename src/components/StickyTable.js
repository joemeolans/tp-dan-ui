import * as React from 'react';
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


export default function StickyTable({ rows, columns, onEdit, onDelete, onAdd }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (row) => {
    setSelectedRows((prev) => {
      // Si la fila ya está seleccionada, la eliminamos
      if (prev.some((selected) => selected.cuit === row.cuit)) {
        return prev.filter((selected) => selected.cuit !== row.cuit);
      }
      return [...prev, row];
    });
  };

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
            onClick={() => onEdit(selectedRows[0])}
            disabled={selectedRows.length !== 1}
          >
            Modificar cliente
          </Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={() => onDelete(selectedRows)}
            disabled={selectedRows.length === 0}
          >
            Eliminar cliente/s
          </Button>
        </Box>

        {/* Botón de agregar */}
        <Button
          variant="contained"
          endIcon={<PersonAddIcon />}
          onClick={onAdd}
        >
          Agregar nuevo cliente
        </Button>
      </Box>

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
                        backgroundColor: isSelected ? '#81BFDA !important' : 'inherit',
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
