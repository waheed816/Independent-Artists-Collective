import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { thunkGetSingleArtist } from "../../store/artists";
import { thunkGetAllArtPiecesByArtist } from "../../store/art_pieces";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import DeleteProfileModal from "../DeleteProfileModal";
import "./ArtistDetailsPage.css"


const ArtistDetailsPage = () => {

    const dispatch = useDispatch();

    const { artistId } = useParams();

    const { closeModal } = useModal();

    const user = useSelector((state) => state.session.user)

    const artistDetails = useSelector((state) => state.artists.singleArtist)

    const allArtPiecesArray = Object.values(useSelector((state) => state.art_pieces.allArtPieces));

    const [isLoaded, setIsLoaded] = useState(false)

    const history = useHistory()

    useEffect( () => {

        const fetchData = async () => {
            setIsLoaded(false);
            await dispatch(thunkGetSingleArtist(artistId));
            await dispatch(thunkGetAllArtPiecesByArtist(artistId));
            setIsLoaded(true);
        };

        fetchData();

    }, [dispatch]);

    const handleEditProfile = (e) => {
        e.preventDefault();
        // history.push('/')
        history.push('/editArtistProfileForm')
    }

    return(
        (!isLoaded) ? <i className="fa-solid fa-palette art-info-loading">LOADING...</i> :
        <div className="artist-details-page-container">
            <h1>{artistDetails.name}</h1>
            <div className="artist-details-container">
                <div className="artist-details-image-container">
                    <img className="artist-details-image" src={artistDetails.artist_image_url}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://hatcherymatters.com/wp-content/uploads/2020/10/hatcherymatters_fondo-4.png"
                        }}
                        alt={`${artistDetails.name}'s image unavailable`}>

                    </img>
                </div>
                <div className="artist-details-info-container">
                    <div>origin:</div>
                    <div>{artistDetails.origin}</div>
                    <div>location:</div>
                    <div>{artistDetails.current_location}</div>
                    <div>favorite quote:</div>
                    <div>{artistDetails.quote}</div>
                    <div>about the artist:</div>
                    <div>{artistDetails.bio}</div>
                    <div>
                        <div>EMAIL: {artistDetails.contact_email}</div>
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
                        </div>
                    </div>
                    {/* <div>
                            <button>EDIT PROFILE</button>
                    </div> */}
                    {user && user.id == artistId &&
                        <div>
                            <div>
                                <button onClick={handleEditProfile}>EDIT PROFILE</button>
                            </div>
                            <div>
                                <OpenModalButton
                                    buttonText="DELETE PROFILE"
                                    onItemClick={closeModal}
                                    modalComponent={<DeleteProfileModal />}
                                />
                            </div>
                        </div>


                    }


                </div>
            </div>
            <div className='border-line'></div>
            <h2 className="artist-details-artworks-title">Artworks by {artistDetails.name}</h2>
            <div className="landing-page-container">
                {allArtPiecesArray.map(art_piece => {
                        return (
                            <div key = {art_piece.id} className="landing-page-art-piece-card">
                                <NavLink to={`/art_pieces/${art_piece.id}`}>
                                    <img title={art_piece.name} className="landing-page-art-image" src={art_piece.art_image_url}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://st3.depositphotos.com/26272052/33085/v/600/depositphotos_330852614-stock-illustration-color-delete-folder-icon-isolated.jpg"
                                    }}
                                    alt={`${art_piece.name}'s image unavailable`}></img>
                                </NavLink>
                            </div>


                        )
                    })
                }
            </div>

        </div>
    )


}

export default ArtistDetailsPage
