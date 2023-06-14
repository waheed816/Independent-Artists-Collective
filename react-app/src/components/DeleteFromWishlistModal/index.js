import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useModal } from "../../context/Modal";
import { thunkDeleteItemFromUserWishlist } from "../../store/art_pieces";
import "./DeleteFromWishListModal.css"


const DeleteFromWishListModal = ({artworkDetails}) => {

    const user = useSelector((state) => state.session.user)

    const dispatch = useDispatch();

    // const [isLoaded, setIsLoaded] = useState(false)
    const { closeModal } = useModal();

    const deleteFromWishlist = async(e) => {

        e.preventDefault();

        await dispatch(thunkDeleteItemFromUserWishlist(user.id, artworkDetails.id))

        closeModal()
    }

    return (
        <div className="delete-art-modal-container">
            <div>REMOVE FROM WISHLIST?</div>
            <div className="delete-art-piece-image-container">
                <img className="delete-art-piece-image" src={artworkDetails.art_image_url} alt={`${artworkDetails.name}'s image unavailable`}></img>
            </div>
            <div>
                <button onClick={deleteFromWishlist}>YES (remove from wishlist)</button>
            </div>
            <div>
                <button onClick={closeModal}>NO (keep in wishlist)</button>
            </div>
        </div>
    )
}

export default DeleteFromWishListModal;
