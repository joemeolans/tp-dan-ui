import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  color: 'black',
  boxShadow: 24,
  p: 4,
};

export default function ModalEliminar({ open, onClose, ids, entityName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Realiza las solicitudes DELETE para cada ID
      for (const id of ids) {
        
        
        const url = `http://localhost/${entityName}/api/${entityName}/${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });

        if (!response.ok) {
          throw new Error(`Error al eliminar el registro con ID: ${id}`);
        }
        
      }

      setIsLoading(false);
      onClose(); // Cierra el modal después de la confirmación
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Error al eliminar los registros.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Eliminar {entityName}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ¿Estás seguro que deseas eliminar este/estos registros seleccionados?
        </Typography>
        {isLoading ? (
          <CircularProgress style={{ marginTop: '20px', marginBottom: '20px' }} />
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                id="button-confirmar"
                sx={{ mt: 2 }}
                variant="contained"
                endIcon={<CheckIcon />}
                onClick={handleConfirm}
                disabled={isLoading}
              >
                Confirmar
              </Button>
              <Button
                onClick={onClose}
                sx={{ mt: 2 }}
                variant="contained"
                endIcon={<CloseIcon />}
              >
                Cerrar
              </Button>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
}
