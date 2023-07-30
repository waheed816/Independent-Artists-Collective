import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllArtists } from "../../store/artists";
import { useEffect, useState } from "react";
import "./AllArtistsPage.css"


const AllArtistsPage = () => {

    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false)

    const allAtistsArray = Object.values(useSelector((state) => state.artists.allArtists)).reverse()

    useEffect( () => {

        const fetchData = async () => {
            setIsLoaded(false);
            await dispatch(thunkGetAllArtists());
            setIsLoaded(true);
        };

        fetchData();

    }, [dispatch]);


    return(
        (!isLoaded) ? <i className="fa-solid fa-palette art-info-loading">LOADING...</i> :
        <div>
            <h2 className="all-artists-page-title">UNITED ARTISTS OF WORCESTER</h2>
            <div className="landing-page-container">
                {allAtistsArray.map(artist => {
                    return(
                        <div key={artist.id} title={artist.name} className="landing-page-art-piece-card">
                            <NavLink to={`/artist/${artist.id}`}>
                                <div className="all-artists-artist image container">
                                    <img className="landing-page-art-image" src={artist.artist_image_url}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://hatcherymatters.com/wp-content/uploads/2020/10/hatcherymatters_fondo-4.png"
                                        }}
                                        alt="{`${artist.name}'s image unavailable`}">

                                    </img>
                                </div>
                            </NavLink>
                            <div className="all-artists-page-artist-details">
                                <div>{artist.name}</div>
                                <div>origin:<br />{artist.origin}</div>
                                <div>favorite quote:<br />{artist.quote}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default AllArtistsPage;
