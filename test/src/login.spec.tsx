import { BrowserRouter as Router } from 'react-router-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react';
import { expect } from 'chai';
import Login from '../../src/login';
import { SinonStub } from 'sinon';

const sinon = require('sinon');

describe(Login.name, () => {
  let fetchStub: SinonStub;

  const mockOnLogin = sinon.stub();

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    sinon.restore();
  });

  function renderComponent() {
    return render(
      <Router>
        <Login onLogin={mockOnLogin}/>
      </Router>
    );
  }

  it('should render input for email and button to log in', async () => {
    renderComponent();

    const emailInput = screen.getByTestId('email-input');
    const loginButton = screen.getByTestId('login-button');

    expect(emailInput).to.exist;
    expect(loginButton).to.exist
  });

  it('should render error message if there is an error fetching the token', async () => {
    fetchStub.rejects();
    renderComponent();

    submitForm('test@email.com');

    await waitFor(() => {
      const errorText = screen.getByText('There was an issue logging in, please try again later.');
      expect(errorText).to.exist;
    });
  });

  // TODO
  it('should redirect to /game after successfully fetching the token');
  it('should set token in sessionStorage after successfully fetching the token');
  it('should not get token if email inputted is invalid');
  it('should display loading button while fetching token');

  const submitForm = async (email: string) => {
    const emailInput = screen.getByTestId('email-input').querySelector('input');
    fireEvent.change(emailInput!, { target: { value: email } });

    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);
  }
});
