import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { thunkGetSingleArtPieceDetails } from "../../store/art_pieces";
import "./SingleArtDetailsPage.css"


const SingleArtDetailsPage = () => {

    const dispatch = useDispatch();

    const { artPieceId } = useParams();

    const artPieceDetails = useSelector((state) => state.art_pieces.singleArtPiece)


    const [isLoaded, setIsLoaded] = useState(false)

    // console.log("ART PIECE DETAILS------->>>>", artPieceId, artPieceDetails)


    useEffect( () => {

        const fetchData = async () => {
            setIsLoaded(false);
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
                        <NavLink to={`/artist/${artPieceDetails.artist_id}`} className='landing-page-artist-navlink'>
                            <div className="landing-page-art-piece-artist-info">
                                <div className="landing-page-artist-image-container">
                                    <img className="landing-page-artist-image" src={artPieceDetails.artist_image} alt={`${artPieceDetails.artist_name}'s image unavailable`}></img>
                                </div>
                                <div className="landing-page-artist-name">
                                    <div className="landing-page-artist-name-display">{artPieceDetails.artist_name}</div>
                                </div>
                            </div>
                        </NavLink>
                        <div className="art-piece-details-description-container">
                            <div className="art-piece-details-description">{artPieceDetails.description}</div>
                        </div>
                    </div>
                    <div className="art-piece-details-price-wishlist-container">
                        <div className="art-piece-details-price">
                            ${artPieceDetails.price.toLocaleString()}
                        </div>
                        <div className="art-piece-details-wishlist-status">
                            <button>ADD TO WISHLIST</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}


export default SingleArtDetailsPage;
