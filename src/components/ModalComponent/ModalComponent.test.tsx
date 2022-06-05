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
          setCurrentId={() => {
            return '';
          }}
          handleClose={() => {
            return false;
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
          setCurrentId={() => {
            return '';
          }}
          handleClose={() => {
            return false;
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

  it('should check if submit enables on correct inputs && check for clear button work', async () => {
    const { getByLabelText, getAllByRole, getByTestId } = render(
      <Provider store={store}>
        <ModalComponent
          currentId=""
          setCurrentId={() => {
            return '';
          }}
          handleClose={() => {
            return false;
          }}
        />
        ,
      </Provider>,
    );
    const nameTextField = getByLabelText('Name');
    const surnameTextField = getByLabelText('Surname');
    const emailTextField = getByLabelText('Email');

    const name = 'Name';
    const surname = 'Surname';
    const email = 'email@email.com';

    userEvent.type(nameTextField, name);
    userEvent.type(surnameTextField, surname);
    userEvent.type(emailTextField, email);
    const inputs = getAllByRole('textbox');
    inputs.forEach((i) => {
      i.focus();
      i.blur();
    });

    await waitFor(() => {
      expect(nameTextField).toHaveDisplayValue(name);
      expect(surnameTextField).toHaveDisplayValue(surname);
      expect(emailTextField).toHaveDisplayValue(email);
      expect(getByTestId(/submit/i)).not.toBeDisabled();
    });

    userEvent.click(getByTestId(/clear/i));
    nameTextField.focus();
    nameTextField.blur();

    await waitFor(() => {
      expect(nameTextField).toHaveValue('');
      expect(surnameTextField).toHaveValue('');
      expect(emailTextField).toHaveValue('');
      expect(getByTestId(/submit/i)).toBeDisabled();
    });
  });
});
