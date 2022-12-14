import React from 'react';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Album from '../Components/Album';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      btnDisabled: true,
      albunsList: [],
      isLoading: false,
      searched: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const artist = target.value;
    const minLength = 2;
    this.setState({
      artist,
      btnDisabled: artist.length < minLength,
    });
  }

  handleClick() {
    const { artist } = this.state;
    this.setState({ isLoading: true }, () => searchAlbumsAPI(artist)
      .then((result) => this.setState({
        isLoading: false,
        albunsList: result,
        searched: artist,
        artist: '',
      })));
  }

  render() {
    const {
      artist,
      searched,
      btnDisabled,
      albunsList,
      isLoading,
      resultShow } = this.state;
    return (
      <>
        <Header />
        {isLoading ? (<Loading />) : (
          <div data-testid="page-search">
            <form>
              <input
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                value={ artist }
                onChange={ (event) => this.handleChange(event) }
              />

              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ btnDisabled }
                onClick={ this.handleClick }
              >
                Procurar
              </button>
            </form>

            <main>
              {albunsList.length ? <p>{`Resultado de álbuns de: ${searched}`}</p> : null}
              {/* {console.log(albunsList)} */}
              {/* {console.log(this.state)} */}
              {(!albunsList.length && searched) ? (
                <p hidden={ resultShow }>Nenhum álbum foi encontrado</p>
              ) : (
                albunsList
                  .map((album) => (
                    <Album key={ album.collectionId } albunsList={ album } />))
              )}
            </main>
          </div>
        )}
      </>
    );
  }
}

export default Search;
