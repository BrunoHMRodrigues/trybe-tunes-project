import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      // artist: '',
      btnDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const artist = target.value;
    const minLength = 2;
    this.setState({
      // artist,
      btnDisabled: artist.length < minLength,
    });
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              onChange={ (event) => this.handleChange(event) }
            />

            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ btnDisabled }
            >
              Procurar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
