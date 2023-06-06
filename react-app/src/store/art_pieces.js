const GET_ALL_ART_PIECES = 'artPieces/GET_ALL_ART_PIECES'
const GET_SINGLE_ART_PIECE_DETAILS = 'artPieces/const GET_SINGLE_ART_PIECE_DETAILS'
// const GET_ALL_ART_PIECES_BY_ARTIST = 'artPieces/GET_ALL_ART_PIECES_BY_ARTIST'

//ACTIONS

export const actionGetAllArtPieces = (allArtPieces) => {
    return{
        type: GET_ALL_ART_PIECES,
        allArtPieces
    }
}

export const actionGetSingleArtPieceDetails = (singleArtPieceDetails) => {
    return{
        type: GET_SINGLE_ART_PIECE_DETAILS,
        singleArtPieceDetails
    }
}


//NORMALIZATION FUNCTIONS

const normalizeAllArtPieces = (all_art_pieces) => {
    const normalizedArtPieces = {};
    all_art_pieces.forEach(art_piece => {
        normalizedArtPieces[art_piece.id] = art_piece;
    })

    return normalizedArtPieces;
}

//THUNKS

export const thunkPostNewArtwork = (newArtwork) => async (dispatch) => {

	const response = await fetch(`/api/art_pieces/postNewArtwork`, {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtwork)
	})
    if(response.ok){
        const single_art_piece_details = await response.json();
        dispatch(thunkGetSingleArtPieceDetails(single_art_piece_details.id))
        return single_art_piece_details;
    }
}

export const thunkEditArtworkDetails = (artworkId, editedArtworkDetails) => async (dispatch) => {

	const response = await fetch(`/api/art_pieces/editArtworkDetails/${artworkId}`, {
		method: 'PATCH',
		headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedArtworkDetails)
	})
    if(response.ok){
        const single_art_piece_details = await response.json();
        dispatch(thunkGetSingleArtPieceDetails(single_art_piece_details.id))
        return single_art_piece_details;
    }
}


export const thunkGetAllArtPieces = () => async (dispatch) => {
    const response = await fetch('/api/art_pieces/')

    if(response.ok) {
        const art_pieces = await response.json();
        const normalizedArtPieces = normalizeAllArtPieces(art_pieces)
        dispatch(actionGetAllArtPieces(normalizedArtPieces))
        return normalizedArtPieces
    }
}

export const thunkGetSingleArtPieceDetails = (art_piece_id) => async (dispatch) => {
    // console.log("THUNK ART PIECE ID ------>>>>", art_piece_id)
    const response = await fetch(`/api/art_pieces/${art_piece_id}`)

    if(response.ok){
        const single_art_piece_details = await response.json();
        dispatch(actionGetSingleArtPieceDetails(single_art_piece_details))
        return single_art_piece_details;
    }
}

export const thunkGetAllArtPiecesByArtist = (artist_id) => async (dispatch) => {
    const response = await fetch(`/api/art_pieces/artist/${artist_id}`)

    if(response.ok) {
        const art_pieces = await response.json();
        const normalizedArtPieces = normalizeAllArtPieces(art_pieces)
        dispatch(actionGetAllArtPieces(normalizedArtPieces))
        return normalizedArtPieces
    }
}

export const thunkGetUserWishlistArtPieces = (userId) => async (dispatch) => {
    const response = await fetch(`/api/art_pieces/wishlist/${userId}`)

    if(response.ok) {
        const art_pieces = await response.json();
        const normalizedArtPieces = normalizeAllArtPieces(art_pieces)
        dispatch(actionGetAllArtPieces(normalizedArtPieces))
        return normalizedArtPieces
    }
}

export const thunkDeleteItemFromUserWishlist = (userId, artPieceId) => async (dispatch) => {
    const response = await fetch(`/api/art_pieces/wishlist/${userId}/${artPieceId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.ok){
        dispatch(thunkGetUserWishlistArtPieces(userId))
    }
}

export const thunkAddItemToUserWishlist = (userId, artPieceId) => async (dispatch) => {

    // console.log('ADD TO WISHLIST -------->>>', userId, artPieceId)

    const response = await fetch(`/api/art_pieces/add_to_wishlist/${userId}/${artPieceId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.ok){
        dispatch(thunkGetUserWishlistArtPieces(userId))
    }
}


const initialState = { allArtPieces: {}, singleArtPiece: {}}

//REDUCER

const allArtPiecesReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_ART_PIECES:{
            const newState = { ...state };
            newState.allArtPieces = action.allArtPieces
            return newState
        }
        case GET_SINGLE_ART_PIECE_DETAILS:{
            const newState = { ...state };
            newState.singleArtPiece = action.singleArtPieceDetails
            return newState
        }

        default: return state
    }
}

export default allArtPiecesReducer;
