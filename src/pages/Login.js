import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      btnDisabled: true,
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange({ target }) {
    const name = target.value;
    const minLength = 3;
    this.setState({
      userName: name,
      btnDisabled: name.length < minLength,
    });
  }

  handleLogin() {
    const { userName } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true }, () => createUser({ name: userName })
      .then(() => history.push('/search')));
  }

  render() {
    const { btnDisabled, isLoading } = this.state;
    return !isLoading ? (
      <div data-testid="page-login">
        <form>
          <label htmlFor="input-name">
            Name
            <input
              name="input-name"
              data-testid="login-name-input"
              placeholder="Insira seu nome"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>

          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ btnDisabled }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    ) : (
      <Loading />
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
