import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SingleArtDetailsPage from "./components/SingleArtDetailsPage";
import ArtistDetailsPage from "./components/ArtistDetailsPage";
import AllArtistsPage from "./components/AllArtistsPage";
import WishlistItemsPage from "./components/WishlistItemsPage";
import ArtistProfileForm from "./components/ArtistProfileForm";
import PostArtworkForm from "./components/PostArtworkForm";
import ManageProfileAndArtPage from "./components/ManageProfileAndArtPage";
import EditArtworkForm from "./components/EditArtworkForm";
import EditArtistProfileForm from "./components/EditArtistProfileForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/artistProfileForm/:userId">
            <ArtistProfileForm />
          </Route>
          <Route path="/art_pieces/wishlist/:userId">
            <WishlistItemsPage />
          </Route>
          <Route path="/postArtworkForm/:userId">
            <PostArtworkForm />
          </Route>
          <Route path="/editArtworkForm/:artworkId">
            <EditArtworkForm />
          </Route>
          <Route path="/art_pieces/:artPieceId">
            <SingleArtDetailsPage />
          </Route>
          <Route path="/artist/:artistId/manageProfileAndArt">
            <ManageProfileAndArtPage />
          </Route>
          <Route path="/editArtistProfileForm">
            <EditArtistProfileForm/>
          </Route>
          <Route path="/artist/:artistId">
            <ArtistDetailsPage />
          </Route>
          <Route path="/allArtists">
            <AllArtistsPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
