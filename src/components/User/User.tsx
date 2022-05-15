import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  styled,
} from '@mui/material';
import { Delete, MoreHoriz } from '@mui/icons-material';
import { FC } from 'react';

import { deleteUser } from 'redux/slices/user/user.slice';
import { useAppDispatch } from 'redux/hooks';
import { UserOutput } from 'redux/slices/user/types';

const CustomCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '15px',
  height: '100%',
  position: 'relative',
  minWidth: '200px',
}));

const CustomCardActions = styled(CardActions)(() => ({
  padding: '0 5px 10px 5px',
  display: 'flex',
  justifyContent: 'space-between',
}));

const StyledCardHeader = styled('div')({
  height: '30px',
  paddingTop: '20.25%',
  backgroundColor: 'rgba(0,183,255, 1)',
});

const EditWrapper = styled('div')({
  position: 'absolute',
  top: '20px',
  right: '5px',
  color: 'white',
});

interface UserProps {
  user: UserOutput;
  setCurrentId: (str: string) => void;
  handleOpen: () => void;
}
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
const User: FC<UserProps> = ({ user, setCurrentId, handleOpen }) => {
  const dispatch = useAppDispatch();
  // console.log(user);
  function edit() {
    if (typeof user !== undefined) {
      setCurrentId(user._id);
      handleOpen();
    }
  }

  return (
    <CustomCard>
      <StyledCardHeader />
      <Typography
        variant="h6"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          zIndex: 0,
          minHeight: '60px',
        }}
      >
        User
      </Typography>
      <EditWrapper>
        <Button style={{ color: 'white' }} size="small" onClick={edit}>
          <MoreHoriz fontSize="medium" />
        </Button>
      </EditWrapper>
      <Typography
        sx={{ padding: '0 16px' }}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {user.first_name}
      </Typography>
      <Typography
        sx={{ padding: '0 16px' }}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {user.last_name}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {user.email}
        </Typography>
      </CardContent>
      <CustomCardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deleteUser(user._id))}
        >
          <Delete fontSize="small" /> Delete
        </Button>
      </CustomCardActions>
    </CustomCard>
  );
};

export default User;
