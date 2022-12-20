import React from 'react';
import Header from '../Components/Header';
// import Loading from './Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMusics: [],
      selected: true,
    };

    this.handleFavorites = this.handleFavorites.bind(this);
    this.filterFavorits = this.filterFavorits.bind(this);
  }

  componentDidMount() {
    this.handleFavorites();
  }

  async handleFavorites() {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ favoriteMusics });
  }

  filterFavorits(trackId) {
    const { favoriteMusics } = this.state;
    const filteredMusics = favoriteMusics.filter((music) => music.trackId !== trackId);
    this.setState({ favoriteMusics: filteredMusics });
  }

  render() {
    const { favoriteMusics, selected } = this.state;
    return (
      <>
        <Header />
        {(favoriteMusics.length > 0) && (
          <div data-testid="page-favorites">
            {/* {console.log(favoriteMusics)} */}
            {favoriteMusics
              .map((music) => (<MusicCard
                key={ music.trackNumber }
                checked={ selected }
                musicData={ music }
                trackId={ music.trackId }
                filterFavorits={ this.filterFavorits }
              />))}
          </div>
        )}
        {/* <div data-testid="page-favorites">
          {console.log(favoriteMusics)}
          {favoriteMusics
            .map((music) => (<MusicCard
              key={ music.trackNumber }
              checked={ selected }
              musicData={ music }
              trackId={ music.trackId }
              // handleClickMusic={ this.handleClickMusic }
            />))}
        </div> */}
      </>
    );
  }
}

export default Favorites;
