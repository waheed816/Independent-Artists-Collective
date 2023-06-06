import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { thunkGetSingleArtPieceDetails } from "../../store/art_pieces";
import { thunkGetUserWishlistArtPieces } from "../../store/art_pieces";
import { thunkAddItemToUserWishlist } from "../../store/art_pieces";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useModal } from "../../context/Modal";
import "./SingleArtDetailsPage.css"


const SingleArtDetailsPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();


    const { closeModal } = useModal();

    const { artPieceId } = useParams();

    const user = useSelector((state) => state.session.user)
    const userWishlistItems = Object.values(useSelector((state) => state.art_pieces.allArtPieces));

    const userWishlistItemsId = userWishlistItems.map(item => item.id);

    const artPieceDetails = useSelector((state) => state.art_pieces.singleArtPiece)

    const [isLoaded, setIsLoaded] = useState(false)

    let userIsArtist = false;

    // console.log('ART PIECE DETAILS------->>', artPieceDetails)
    // console.log("USER WISHLIST ITEMS IDs", userWishlistItemsId, artPieceId)

    if(user && artPieceDetails.artist_id == user.id){
        userIsArtist = true;
    }

    let userHasItemInWishlist = false;

    if(userWishlistItemsId.includes(Number(artPieceId))){
        userHasItemInWishlist = true;
    }

    const addToWishlist = async (userId, artPieceId) => {
        await dispatch(thunkAddItemToUserWishlist(userId, Number(artPieceId)))
        history.push(`/art_pieces/wishlist/${user.id}`)

    }


    useEffect( () => {

        const fetchData = async () => {
            setIsLoaded(false);
            if(user) await dispatch(thunkGetUserWishlistArtPieces(user.id))
            await dispatch(thunkGetSingleArtPieceDetails(artPieceId));
            setIsLoaded(true);
        };

        fetchData();

    }, [dispatch]);

    return(
        (!isLoaded) ? <i className="fa-solid fa-palette art-info-loading">LOADING...</i> :
        <div>
            <div className="art-piece-details-title">
                <h1>{artPieceDetails.name}</h1>
            </div>
            <div className="art-piece-details-container">
                <div className="art-piece-details-image-container">
                    <img className="art-piece-details-image" src={artPieceDetails.art_image_url} alt={`${artPieceDetails.name}'s image unavailable`}></img>
                </div>
                <div className="art-piece-details-info-container">
                    <div>
                            <div className="landing-page-art-piece-artist-info">
                                <div className="landing-page-artist-image-container">
                                    <NavLink to={`/artist/${artPieceDetails.artist_id}`} className='landing-page-artist-navlink'>
                                        <img className="landing-page-artist-image" src={artPieceDetails.artist_image} alt={`${artPieceDetails.artist_name}'s image unavailable`}></img>
                                    </NavLink>
                                </div>
                                <div className="landing-page-artist-name">
                                    <NavLink to={`/artist/${artPieceDetails.artist_id}`} className='landing-page-artist-navlink'>
                                        <div className="landing-page-artist-name-display">{artPieceDetails.artist_name}</div>
                                    </NavLink>
                                </div>
                            </div>
                        <div className="art-piece-details-description-container">
                            <div className="art-piece-details-description">
                                {artPieceDetails.description.split('\n\n').map((paragraph, index) => (
                                    <div key={index}>
                                        {paragraph.split('\n').map((line, lineIndex) => (
                                            <React.Fragment key={lineIndex}>
                                                {line}
                                                {lineIndex !== paragraph.split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="art-piece-details-price-wishlist-container">
                        <div className="art-piece-details-price">
                            {`Price: $${artPieceDetails.price.toLocaleString()}`}
                        </div>
                        <div className="art-piece-details-wishlist-status">

                            {!user &&
                                <div>
                                    <div>
                                        <OpenModalButton
                                            buttonText="LOGIN"
                                            onItemClick={closeModal}
                                            modalComponent={<LoginFormModal />}
                                        />{' '}to add artwork to wishlist
                                    </div>
                                    <div>
                                        <OpenModalButton
                                            buttonText="SIGN UP"
                                            onItemClick={closeModal}
                                            modalComponent={<SignupFormModal />}
                                        /> {' '}to create an account
                                    </div>
                                </div>
                            }

                            {user && userIsArtist &&
                                <div>
                                    <div>
                                        <button>EDIT YOUR ARTWORK INFO</button>
                                    </div>
                                    <div>
                                        <button>DELETE YOUR ARTWORK</button>
                                    </div>
                                </div>
                            }

                            {user && !userIsArtist && userHasItemInWishlist &&
                                <div>
                                    <NavLink to={`/art_pieces/wishlist/${user.id}`}>
                                        <button>VIEW IN YOUR WISH LIST</button>
                                    </NavLink>
                                </div>
                            }

                            {user && !userIsArtist && !userHasItemInWishlist &&
                                <div>
                                    <button onClick={() => addToWishlist(user.id, artPieceId)}>
                                        ADD TO WISHLIST
                                    </button>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}


export default SingleArtDetailsPage;
