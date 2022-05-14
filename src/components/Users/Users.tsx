import { CircularProgress, Grid, Typography } from '@mui/material';
import { FC } from 'react';

import { useAppSelector } from 'redux/hooks';

import User from '../User/User';

export interface UsersProps {
  setCurrentId: (str: string) => void;
  handleOpen: () => void;
}
const Users: FC<UsersProps> = ({ setCurrentId, handleOpen }) => {
  const users = useAppSelector((state) => state.users.list);
  const { loading, error } = useAppSelector((state) => state.users);
  return loading ? (
    <CircularProgress />
  ) : (
    <Grid
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      container
      spacing={3}
    >
      {users.map((user) => (
        /* eslint-disable-next-line no-underscore-dangle */
        <Grid key={user._id} item>
          <User
            user={user}
            setCurrentId={setCurrentId}
            handleOpen={handleOpen}
          />
        </Grid>
      ))}
      {error && <Typography>An error occurred: {error}</Typography>}
    </Grid>
  );
};

export default Users;
