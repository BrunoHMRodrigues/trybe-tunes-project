import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../Components/MusicCard';
// import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      artworkUrl100: '',
      collectionName: '',
      isLoading: false,
      // favIsLoading: false,
      // selected: false,
    };
    this.fetchMusics = this.fetchMusics.bind(this);
    // this.handleClickMusic = this.handleClickMusic.bind(this);
  }

  componentDidMount() {
    this.fetchMusics();
  }

  // handleClickMusic() {
  //   this.setState({ isLoading: true }, () => addSong(this.props)
  //     .then(this.setState({ isLoading: false })));
  //   // this.setState((previousState) => ({ isLoading: true, selected: !previousState.selected }), () => addSong(this.props).then(this.setState({ isLoading: false })));
  // }

  async fetchMusics() {
    const { match: { params: { collectionId } } } = this.props;
    const musics = await getMusics(collectionId);
    this.setState({
      isLoading: true,
      musics,
      artistName: musics[0].artistName,
      artworkUrl100: musics[0].artworkUrl100,
      collectionName: musics[0].collectionName,
    }, () => this.setState({ isLoading: false }));
  }

  render() {
    // const { match: { params: { collectionId } } } = this.props;
    const { isLoading, musics, artistName, artworkUrl100, collectionName } = this.state;
    // const { artistName, artworkUrl100, collectionName } = musics;
    // const { artistName,
    //   collectionName,
    //   artworkUrl100 } = musics.musicData[0];
    //   console.log(artistName);
    return (
      <>
        <Header />
        {(isLoading) ? (<Loading />) : (
          // console.log(isLoading)
          (musics.length) && (
            <div data-testid="page-album">
              <div>
                <img src={ artworkUrl100 } alt="Capa Album" />
                <h3 data-testid="album-name">{collectionName}</h3>
                <p data-testid="artist-name">{artistName}</p>
              </div>
              {musics
                .map((music) => (<MusicCard
                  key={ music.trackNumber }
                  musicData={ music }
                  trackId={ music.trackId }
                  // handleClickMusic={ this.handleClickMusic }
                />))}
            </div>
          )
        )}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      collectionId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
