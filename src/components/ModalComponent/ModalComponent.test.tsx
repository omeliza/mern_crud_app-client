import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { store } from 'redux/store';
import ModalComponent from 'components/ModalComponent/ModalComponent';
import '@testing-library/jest-dom';

describe('ModalComnent', () => {
  it('should display errors on empty fields', async () => {
    const { getAllByRole, getByText, getByTestId } = render(
      <Provider store={store}>
        <ModalComponent
          currentId=""
          setCurrentId={(): void => {
            throw new Error('Function not implemented.');
          }}
          handleClose={(): void => {
            throw new Error('Function not implemented.');
          }}
        />
        ,
      </Provider>,
    );
    const inputs = getAllByRole('textbox');
    inputs.forEach((i) => {
      i.focus();
      i.blur();
    });
    await waitFor(() => {
      getByText('Name is required');
      getByText('Surname is required');
      getByText('Email is required');
      expect(getByTestId(/submit/i)).toBeDisabled();
    });
  });
  it('should display errors on incorrect fields', async () => {
    const { getByLabelText, getAllByRole, getByText, getByTestId } = render(
      <Provider store={store}>
        <ModalComponent
          currentId=""
          setCurrentId={(): void => {
            throw new Error('Function not implemented.');
          }}
          handleClose={(): void => {
            throw new Error('Function not implemented.');
          }}
        />
        ,
      </Provider>,
    );
    const nameTextField = getByLabelText('Name');
    const surnameTextField = getByLabelText('Surname');
    const emailTextField = getByLabelText('Email');

    const name = 'test';
    const surname = 'Here should be too long surname';
    const email = 'email@com';

    userEvent.type(nameTextField, name);
    userEvent.type(surnameTextField, surname);
    userEvent.type(emailTextField, email);
    const inputs = getAllByRole('textbox');
    inputs.forEach((i) => {
      i.focus();
      i.blur();
    });

    await waitFor(() => {
      getByText('Should be less than 15 symbols');
      getByText('Email is not correct!');
      expect(getByTestId(/submit/i)).toBeDisabled();
    });
  });
});
