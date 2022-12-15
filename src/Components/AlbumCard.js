import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { albunsList: {
      artistName,
      collectionName,
      artworkUrl100,
      collectionId } } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt="Capa Album" />
        <h3>{collectionName}</h3>
        <p>{artistName}</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Acessar Album

        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albunsList: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
  }).isRequired,
};

export default AlbumCard;
