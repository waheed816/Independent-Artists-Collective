import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { thunkGetAllArtPiecesByArtist } from "../../store/art_pieces";
import { useHistory } from "react-router-dom";
import { thunkDeleteAllArtpiecesByArtist } from "../../store/art_pieces";
import { thunkCreateUserArtistProfile } from "../../store/artists";
import "./DeleteProfileModal.css"

const DeleteProfileModal = () => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const history = useHistory();

    const user = useSelector((state) => state.session.user)

    const allArtPiecesArray = Object.values(useSelector((state) => state.art_pieces.allArtPieces));

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect( () => {

        const fetchData = async () => {
            setIsLoaded(false);
            await dispatch(thunkGetAllArtPiecesByArtist(user.id));
            setIsLoaded(true);
        };

        fetchData();

    }, [dispatch]);

    const allArtPiecesIds = allArtPiecesArray.map(artPiece => artPiece.id)

    // console.log("jkhfkjdshfkdsjh", allArtPiecesIds)

    const handleDeleteProfile = async (e) => {
        e.preventDefault();
        // history.push('/')
        // history.push('/editArtistProfileForm')
        await dispatch(thunkDeleteAllArtpiecesByArtist(allArtPiecesIds));

        const userArtistProfile =
            {
                artist: false,
                name: '',
                origin: '',
                currentLocation: '',
                description: '',
                quote: '',
                email: '',
                instagram: '',
                phone: '',
                img1url: ''
            }

        const newArtistDetails = await dispatch(thunkCreateUserArtistProfile(user.id, userArtistProfile))

        history.push('/')
        closeModal();

    }

    return(
        <div className="delete-art-modal-container">
            <strong>
                THIS WILL ALSO DELETE ALL YOUR ARTWORK.
            </strong>
            <div>
                Are you sure you want to delete your profile?
            </div>
            <button onClick={handleDeleteProfile}>DELETE</button>
        </div>
    )
}


export default DeleteProfileModal;
