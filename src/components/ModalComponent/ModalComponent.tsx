/* eslint-disable react/jsx-props-no-spreading */
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
import { useForm } from 'react-hook-form';

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
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);

  const clear = () => {
    setCurrentId('');
    setUserData({ _id: '', first_name: '', last_name: '', email: '' });
  };
  const onSubmit = async () => {
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
        onSubmit={handleSubmit(onSubmit)}
        sx={{ padding: theme.spacing(2) }}
      >
        <Typography variant="h6">
          {currentId ? 'Editing the User' : 'Creating a User'}
        </Typography>
        <TextField
          {...register('name', {
            required: 'Name is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Alphabetical characters only',
            },
            maxLength: {
              value: 15,
              message: 'Should be less than 15 symbols',
            },
          })}
          name="name"
          variant="outlined"
          label="Name"
          helperText={errors?.name?.message}
          error={Boolean(errors?.name)}
          fullWidth
          value={userData.first_name}
          onChange={(e) =>
            setUserData({ ...userData, first_name: e.target.value })
          }
          sx={{ margin: theme.spacing(1) }}
        />
        <TextField
          {...register('surname', {
            required: 'Name is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Alphabetical characters only',
            },
            maxLength: {
              value: 15,
              message: 'Should be less than 15 symbols',
            },
          })}
          name="surname"
          variant="outlined"
          label="Surname"
          helperText={errors?.surname?.message}
          error={Boolean(errors?.surname)}
          fullWidth
          value={userData.last_name}
          onChange={(e) =>
            setUserData({ ...userData, last_name: e.target.value })
          }
          sx={{ margin: theme.spacing(1) }}
        />
        <TextField
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Email is not correct!',
            },
          })}
          name="email"
          variant="outlined"
          label="Email"
          error={Boolean(errors?.email)}
          helperText={errors?.email?.message}
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
          disabled={!isValid}
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
