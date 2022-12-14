import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import ProfileEdit from '../pages/ProfileEdit';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Loading from '../pages/Loading';
// import Header from './Header';

class Content extends React.Component {
  render() {
    // const { userName } = this.props
    return (
      <main>
        {/* <Header /> */}
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/loading" component={ Loading } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
