import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { thunkGetUserWishlistArtPieces } from "../../store/art_pieces";
import { authenticate } from "../../store/session";
import { thunkDeleteItemFromUserWishlist } from "../../store/art_pieces";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import DeleteFromWishListModal from "../DeleteFromWishlistModal";
import './WishlistItemsPage.css'


const WishlistItemsPage = () => {
    const dispatch = useDispatch();
    const allArtPiecesArray = Object.values(useSelector((state) => state.art_pieces.allArtPieces)).reverse();
    const user = useSelector((state) => state.session.user)

    const [isLoaded, setIsLoaded] = useState(false)

    const { closeModal } = useModal();

    // console.log("USER ID ----->>>>>", user.id)

    useEffect( () => {

        const fetchData = async () => {
            setIsLoaded(false);
            await dispatch(authenticate());
            await dispatch(thunkGetUserWishlistArtPieces(user.id));
            setIsLoaded(true);
        };

        fetchData();

    }, [dispatch]);

    return (
        (!isLoaded) ? <i className="fa-solid fa-palette art-info-loading">LOADING...</i> :
        <div className="landing-page-justification">
            <h1 className = "all-artists-page-title wishlist-page-title">Wishlist Gallery</h1>
            <div className="landing-page-container wishlist-page-container">
                {allArtPiecesArray.map(art_piece => {
                    return (
                        <div key = {art_piece.id} className="landing-page-art-piece-card">
                            <div className="wishlist-options-container">
                                <div className="landing-page-art-piece-artist-info wishlist-artist-info">
                                    <div className="landing-page-artist-image-container">
                                        <NavLink to={`/artist/${art_piece.artist_id}`} className='landing-page-artist-navlink'>
                                            <img className="landing-page-artist-image" src={art_piece.artist_image} alt={`${art_piece.artist_name}'s image unavailable`}></img>
                                        </NavLink>
                                    </div>
                                    <div className="landing-page-artist-name">
                                        <NavLink to={`/artist/${art_piece.artist_id}`} className='landing-page-artist-navlink'>
                                            <div className="landing-page-artist-name-display">{art_piece.artist_name}</div>
                                        </NavLink>
                                        {/* <button className="contact-artist-button">CONTACT ARTIST</button> */}
                                    </div>
                                </div>
                            </div>
                            <NavLink to={`/art_pieces/${art_piece.id}`}>
                                {/* <div className="landing-page-art-name">{`${art_piece.name}`}</div> */}
                                <img title={art_piece.name} className="landing-page-art-image" src={art_piece.art_image_url} alt={`${art_piece.name}'s image unavailable`}></img>
                            </NavLink>
                            <div className="remove-from-wishlist-button">
                                <OpenModalButton
                                    buttonText="REMOVE FROM WISHLIST"
                                    onItemClick={closeModal}
                                    modalComponent={<DeleteFromWishListModal artworkDetails={art_piece}/>}
                                />
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )

}

export default WishlistItemsPage;
