/* eslint-disable @typescript-eslint/no-unused-vars */
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
          setCurrentId={(str: string): void => {
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
});
