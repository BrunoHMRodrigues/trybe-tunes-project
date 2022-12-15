import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      // favIsLoading: false,
      isLoading: false,
      selected: false,
    };
    // const { handleClickMusic } = this.props;
    this.handleClickMusic = this.handleClickMusic.bind(this);
    this.favoriteMusics = this.favoriteMusics.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.favoriteMusics();
  }

  async handleClickMusic() {
    // const { selected } = this.state;
    // this.setState({ isLoading: true }, () => addSong(this.props)
    //   .then(this.setState({ isLoading: false })));
    this.setState(
      (previousState) => ({ isLoading: true, selected: !previousState.selected }),
      async () => {
        await addSong(this.props);
        this.setState({ isLoading: false });
      },
    );
  }
  // handleClick() {
  //   this.setState((previousState) => ({ selected: !previousState.selected }));
  // }

  async favoriteMusics() {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    // console.log('entrou');
    console.log(favoriteSongs);
    this.setState({ selected: favoriteSongs.some((music) => music.trackId === trackId) });
  }

  render() {
    const { musicData: {
      trackId,
      trackName,
      previewUrl } } = this.props;
    const { isLoading, selected } = this.state;
    return (
      (trackName) && (
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <p>{ trackName }</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="check-favorite">
                <input
                  type="checkbox"
                  checked={ selected }
                  name="check-favorite"
                  data-testid={ `checkbox-music-${trackId}` }
                  // onClick={ this.handleClick }
                  // onChange={ this.props.handleClickMusic }
                  onChange={ this.handleClickMusic }
                />
                Favorita
                {/* {((favIsLoading) && <Loading />)} */}
              </label>
            </>
          )}
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  musicData: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackViewUrl: PropTypes.string.isRequired,
  }).isRequired,
  // handleClickMusic: PropTypes.func.isRequired,
};

export default MusicCard;
