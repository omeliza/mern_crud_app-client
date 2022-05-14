import { FC, useEffect, useState } from 'react';
import {
  Button,
  createTheme,
  Paper,
  styled,
  TextField,
  Typography,
  Box,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { createUser, updateUser } from 'redux/slices/user/user.slice';

const styles = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 1,
  maxWidth: '300px',
  borderRadius: '5%',
  backgroundColor: 'white',
};

const CustomButton = styled(Button)(() => ({
  marginBottom: 10,
  marginLeft: 10,
  marginRight: 10,
}));

interface ModalProps {
  currentId: string;
  setCurrentId: (str: string) => void;
  handleClose: () => void;
}

const ModalComponent: FC<ModalProps> = ({
  currentId,
  setCurrentId,
  handleClose,
}) => {
  const [userData, setUserData] = useState({
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
  });
  const user = useAppSelector((state) =>
    /* eslint-disable-next-line no-underscore-dangle */
    currentId ? state.users.list.find((u) => u._id === currentId) : null,
  );
  const dispatch = useAppDispatch();
  const theme = createTheme();
  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);

  const clear = () => {
    setCurrentId('');
    setUserData({ _id: '', first_name: '', last_name: '', email: '' });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!currentId.length) {
      await dispatch(createUser(userData));
      clear();
    } else {
      await dispatch(updateUser(userData));
      clear();
    }
    handleClose();
  };

  return (
    <Paper
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Box
        component="form"
        autoComplete="off"
        noValidate
        className={`${styles}`}
        onSubmit={handleSubmit}
        sx={{ padding: theme.spacing(2) }}
      >
        <Typography variant="h6">
          {currentId ? 'Editing the User' : 'Creating a User'}
        </Typography>
        <TextField
          name="name"
          variant="outlined"
          label="Name"
          fullWidth
          value={userData.first_name}
          onChange={(e) =>
            setUserData({ ...userData, first_name: e.target.value })
          }
          sx={{ margin: theme.spacing(1) }}
        />
        <TextField
          name="surname"
          variant="outlined"
          label="Surname"
          fullWidth
          value={userData.last_name}
          onChange={(e) =>
            setUserData({ ...userData, last_name: e.target.value })
          }
          sx={{ margin: theme.spacing(1) }}
        />
        <TextField
          name="email"
          variant="outlined"
          label="Email"
          fullWidth
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          sx={{ margin: theme.spacing(1) }}
        />
        <CustomButton
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </CustomButton>
        <CustomButton
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </CustomButton>
      </Box>
    </Paper>
  );
};

export default ModalComponent;
