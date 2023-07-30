import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { thunkGetAllArtPieces } from "../../store/art_pieces";
import "./LandingPage.css"


const LandingPage = () => {
    const dispatch = useDispatch();
    const allArtPiecesArray = Object.values(useSelector((state) => state.art_pieces.allArtPieces)).reverse();

    const [isLoaded, setIsLoaded] = useState(false)

    // console.log("ALL ART PIECES ----->>>>>", allArtPiecesArray)

    useEffect( () => {

        const fetchData = async () => {
            setIsLoaded(false);
            await dispatch(thunkGetAllArtPieces());
            setIsLoaded(true);
        };

        fetchData();

    }, [dispatch]);

    return (
        (!isLoaded) ? <i className="fa-solid fa-palette art-info-loading">LOADING...</i> :
        // <div className="landing-page-justification">
            <div className="landing-page-container">
                {allArtPiecesArray.map(art_piece => {
                    return (
                        <div key = {art_piece.id} className="landing-page-art-piece-card">
                                <div className="landing-page-art-image-container">
                                    <NavLink to={`/art_pieces/${art_piece.id}`}>
                                        <img title={art_piece.name} className="landing-page-art-image" src={art_piece.art_image_url}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://st3.depositphotos.com/26272052/33085/v/600/depositphotos_330852614-stock-illustration-color-delete-folder-icon-isolated.jpg"
                                            }}
                                            alt={`${art_piece.name}'s image unavailable`}>
                                        </img>
                                    </NavLink>
                                </div>
                                <div className="landing-page-art-piece-artist-info">
                                    <div className="landing-page-artist-image-container">
                                        <NavLink to={`/artist/${art_piece.artist_id}`} className='landing-page-artist-navlink'>
                                            <img className="landing-page-artist-image" src={art_piece.artist_image}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://hatcherymatters.com/wp-content/uploads/2020/10/hatcherymatters_fondo-4.png"
                                                }}
                                                alt={`${art_piece.artist_name}'s image unavailable`}>
                                            </img>
                                        </NavLink>
                                    </div>
                                    <div className="landing-page-artist-name">
                                        <NavLink to={`/artist/${art_piece.artist_id}`} className='landing-page-artist-navlink'>
                                            <div className="landing-page-artist-name-display">{art_piece.artist_name}</div>
                                        </NavLink>
                                    </div>
                                </div>
                        </div>
                        )
                    })
                }
            </div>
        // </div>
    )

}

export default LandingPage;
