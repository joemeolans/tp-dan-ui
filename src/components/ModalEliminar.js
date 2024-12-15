import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

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

export default function ModalEliminar({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Eliminar registros
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Estas seguro que deseas eliminar los registros seleccionados?
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button  sx={{ mt: 2 }} variant="contained" endIcon={<CheckIcon />}>
                Confirmar
            </Button>
            <Button onClick={onClose} sx={{ mt: 2 }} variant="contained" endIcon={<CloseIcon />}>
                Cerrar
            </Button>
        </div>
      </Box>
    </Modal>
  );
}
