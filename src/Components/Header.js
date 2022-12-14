import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      logedUser: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => getUser().then(({ name }) => this
      .setState({ logedUser: name, isLoading: false })));
    // getUser().then(({ name }) => this.setState({ logedUser: name }));
  }

  render() {
    const { logedUser, isLoading } = this.state;
    return (
      !isLoading ? (
        <header
          data-testid="header-component"
        >
          <div data-testid="header-user-name">
            Header
            <p>{ logedUser }</p>
          </div>
          <nav>
            <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>

          </nav>
        </header>
      ) : (
        <Loading />
      )
    );
  }
}

export default Header;
