import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Modal,
  styled,
  Typography,
} from '@mui/material';

import Users from 'components/Users/Users';
import ModalComponent from 'components/ModalComponent/ModalComponent';
import { useAppDispatch } from 'redux/hooks';
import { fetchUsers } from 'redux/slices/user/user.slice';

const CustomAppBar = styled(AppBar)(() => ({
  display: 'flex',
  justifyContent: 'center',
  borderRadius: 15,
  margin: '30px 0',
}));

const App = () => {
  const [currentId, setCurrentId] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchUsers());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <CustomAppBar position="static" color="inherit">
        <Typography
          sx={{ color: 'rgba(0,183,255, 1)' }}
          variant="h2"
          align="center"
        >
          MERN STACK APPLICATION
          <br />
          <Button onClick={handleOpen}>Add user</Button>
        </Typography>
      </CustomAppBar>
      <Grid
        container
        spacing={3}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid item xs={12} sm={12}>
          <Users setCurrentId={setCurrentId} handleOpen={handleOpen} />
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box>
          <ModalComponent
            currentId={currentId}
            setCurrentId={setCurrentId}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default App;
