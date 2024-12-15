import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


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

export default function ModalNuevoCliente({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
            Alta de Cliente
            </Typography>
        <hr style={{ margin: '16px 0' }}/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px'}}>
            <TextField required id="filterCuit" label="CUIT" variant="outlined" size="small"/>
            <TextField required id="filterNombre" label="Nombre" variant="outlined" size="small" />
            <TextField required id="filterCorreoElectronico" label="Correo Electronico" variant="outlined" size="small" />
            <TextField required id="filterMaximoDescubierto" label="Max. descubierto" variant="outlined" size="small" />
            <TextField required id="filterCantMaxObras" label="Cant. maxima de obras" variant="outlined" size="small" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button  sx={{ mt: 2 }} variant="contained" endIcon={<SaveIcon />}>
                Guardar
            </Button>
            <Button onClick={onClose} sx={{ mt: 2 }} variant="contained" endIcon={<CloseIcon />}>
                Cerrar
            </Button>
        </div>
      </Box>
    </Modal>
  );
}
