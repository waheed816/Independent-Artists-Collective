import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { thunkGetSingleArtist } from "../../store/artists";
import { thunkGetAllArtPiecesByArtist } from "../../store/art_pieces";
import "./ManageProfileAndArt.css"

const ManageProfileAndArtPage = () => {

    const dispatch = useDispatch();

    const { artistId } = useParams();

    const history = useHistory();

    const artistDetails = useSelector((state) => state.artists.singleArtist)

    const artPieceDetails = Object.values(useSelector((state) => state.art_pieces.allArtPieces));

    // console.log("ART PIECE DETAILS---->>>", artPieceDetails)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect( () => {

        const fetchData = async () => {
            setIsLoaded(false);
            await dispatch(thunkGetSingleArtist(artistId));
            await dispatch(thunkGetAllArtPiecesByArtist(artistId));
            setIsLoaded(true);
        };

        fetchData();

    }, [dispatch]);




    return (
        (!isLoaded) ? <i className="fa-solid fa-palette art-info-loading">LOADING...</i> :
        <div className="artist-details-page-container">
            <h1 className="edit-profile">EDIT PROFILE</h1>
            <div className="edit-artist-details-container-parent">
                <h1>{artistDetails.name}</h1>
                <div className="edit-artist-details-container">
                    <div className="artist-details-image-container">
                        <img className="artist-details-image" src={artistDetails.artist_image_url} alt={`${artistDetails.name}'s image unavailable`}></img>
                    </div>
                    <div className="edit-artist-details-info-container">
                        <div>origin:</div>
                        <div>{artistDetails.origin}</div>
                        <div>location:</div>
                        <div>{artistDetails.current_location}</div>
                        <div>favorite quote:</div>
                        <div>{artistDetails.quote}</div>
                        <div>about the artist:</div>
                        <div>{artistDetails.bio}</div>
                        <div>
                            <div>EMAIL: {artistDetails.email}</div>
                            <div className="artist-details-contact-info-container">
                                {artistDetails.instagram &&
                                    <div>
                                        <div>INSTAGRAM: {artistDetails.instagram}</div>
                                    </div>
                                }
                                {artistDetails.phone &&
                                    <div>
                                        <div>PHONE: {artistDetails.phone}</div>
                                    </div>
                                }
                                <button >EDIT YOUR PROFILE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="edit-title">EDIT ART</h1>
            <div className="landing-page-contain">
                {artPieceDetails.map(artPieceDetails => {
                        return (
                            <div className="edit-artworks-parent">

                                <div className=".edit-artworks-container">
                                    <div className="art-piece-details-title">
                                        <h2>{artPieceDetails.name}</h2>
                                        </div>
                                        <div className="edit-piece-details-container">
                                            <div className="art-piece-details-image-container">
                                                <img className="art-piece-details-image" src={artPieceDetails.art_image_url} alt={`${artPieceDetails.name}'s image unavailable`}></img>
                                            </div>
                                            <div className="edit-piece-details-info-container">
                                                <div>
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
                                                <div className="art-piece-details-price">
                                                    {`Price: $${artPieceDetails.price.toLocaleString()}`}
                                                </div>
                                                <NavLink to = {`/editArtworkForm/${artPieceDetails.id}`}>
                                                    <button>EDIT ARTWORK DETAILS</button>
                                                </NavLink>
                                                <br></br>
                                                <button>DELETE ARTWORK</button>
                                            </div>
                                    </div>
                                </div>

                            </div>


                        )
                    })
                }
            </div>

        </div>
    )
}

export default ManageProfileAndArtPage;
