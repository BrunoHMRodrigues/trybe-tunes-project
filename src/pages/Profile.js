import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      profile: [],
    };
    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  async handleUser() {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ isLoading: false, profile: user });
  }

  render() {
    const { profile: { name, description, email, image }, isLoading } = this.state;
    return (
      <>
        <Header />
        {(isLoading) ? (
          <Loading />
        ) : (
          <div data-testid="page-profile">
            <img data-testid="profile-image" alt="Foto Perfil" src={ image } />

            <Link to="/profile/edit">Editar perfil</Link>

            <label htmlFor="profile-name">
              Nome:
              <p id="profile-name">{ name }</p>
            </label>

            <label htmlFor="profile-email">
              Email:
              <p id="profile-email">{ email }</p>
            </label>

            <label htmlFor="profile-description">
              Descrição:
              <p id="profile-description">{ description }</p>
            </label>
          </div>
        )}
      </>
    );
  }
}

export default Profile;
