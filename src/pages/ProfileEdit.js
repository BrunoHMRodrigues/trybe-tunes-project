import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
// import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      // isLoading: false,
      profile: {},
      name: '',
      image: '',
      email: '',
      description: '',
      disabled: true,
    };
    this.handleUser = this.handleUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  async handleUser() {
    // this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      // isLoading: false,
      profile: user,
      name: user.name,
      image: user.image,
      email: user.email,
      description: user.description,
    });
  }

  handleChange({ target }) {
    const nameElement = target.name;
    const textElement = target.value;
    // this.setState({ profile: { [nameElement]: textElement } }, () => {
    //   const { profile: { name, description, email, image }, isLoading } = this.state;
    //   // if (email.lenght !== '' && !email.includes('*@*.com')) {
    //   //   this.setState({ disabled: true });
    //   // }
    //   // if (name.lenght === '' && description.lenght === '' && image.lenght === '') {
    //   //   this.setState({ disabled: true });
    //   // }
    // });

    this.setState({ [nameElement]: textElement }, () => {
      const { name, image, email, description } = this.state;
      this.setState({ profile: {
        name,
        image,
        email,
        description,
      } }, () => {
        if (email === '' || !this.validateEmail(email) || name === ''
          || description === '' || image === '') {
          this.setState({ disabled: true });
        } else {
          this.setState({ disabled: false });
        }
      });
    });
  }

  validateEmail(email) {
    const validRegex = /^.*@.*\.com$/i;
    return validRegex.test(email);
  }

  render() {
    const {
      profile: { name, description, email, image }, disabled } = this.state;
    const { profile } = this.state;
    console.log(profile);
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <form>
            <img src={ image } alt="Foto perfil" />
            <input
              name="image"
              data-testid="edit-input-image"
              placeholder="Insira endereço de imagem"
              value={ image }
              onChange={ (event) => this.handleChange(event) }
            />

            <input
              name="name"
              data-testid="edit-input-name"
              placeholder="Insira seu nome"
              value={ name }
              onChange={ (event) => this.handleChange(event) }
            />

            <input
              name="email"
              data-testid="edit-input-email"
              placeholder="Insira seu email"
              value={ email }
              onChange={ (event) => this.handleChange(event) }
            />

            <textarea
              name="description"
              data-testid="edit-input-description"
              placeholder="Insira sua descrição"
              value={ description }
              onChange={ (event) => this.handleChange(event) }
            />

            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ disabled }
              // onClick={ updateUser(profile) }
            >
              Salvar
            </button>
          </form>
        </div>
      </>
    );
  }
}

// ProfileEdit.propTypes = {
//   validateEmail: PropTypes.func.isRequired,
// };

export default ProfileEdit;
