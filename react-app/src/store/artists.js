import { authenticate } from "./session"

const GET_ALL_ARTISTS = 'artists/GET_ALL_ARTISTS'
const GET_SINGLE_ARTIST = 'artists/GET_SINGLE_ARTIST'


//ACTIONS

export const actionGetAllArtists = (getAllArtists) => {
    return{
        type: GET_ALL_ARTISTS,
        getAllArtists
    }
}

export const actionGetSingleArtist = (singleArtist) => {
    return{
        type: GET_SINGLE_ARTIST,
        singleArtist
    }
}

//NORMALIZATION FUNCTIONS

const normalizeAllArtists = (allArtists) => {
    const normalizedArtists = {};
    // console.log("ALL ARTISTS NORMALIZATION-------->", allArtists)
    allArtists.forEach(artist => {
        // console.log("ARTIST NORMALIZATION-------->", artist)
        normalizedArtists[artist.id] = artist;
    })

    return normalizedArtists;
}


//THUNKS

export const thunkGetAllArtists = () => async (dispatch) => {

    const response = await fetch('/api/artists/')

    // console.log("RESPONSE GET ALL ARTISTS-------->", response)

    if(response.ok){
        const artists = await response.json();
        const normalizedArtists = normalizeAllArtists(artists);

        // console.log("NORMALIZED ARTISTS-------->", normalizedArtists)

        dispatch(actionGetAllArtists(normalizedArtists))


        return normalizedArtists
    }

}

export const thunkGetSingleArtist = (artist_id) => async (dispatch) => {

    // console.log("ARTIST_ID-------->>>", artist_id)

    const response = await fetch(`/api/artists/${artist_id}`)

    if(response.ok){
        const singleArtist = await response.json();
        dispatch(actionGetSingleArtist(singleArtist))
        return singleArtist
    }

}

export const thunkCreateUserArtistProfile = (userId, userArtistProfile) => async (dispatch) => {
	const response = await fetch(`/api/artists/${userId}/UpdateUserArtistProfile`, {
		method: 'PUT',
		headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userArtistProfile)
	})

    if(response.ok){
        const newArtistProfileDetails = await response.json();
        // console.log("NEW ARTIST PROFILE DETAILS THUNK---->>", newArtistProfileDetails)
        dispatch(thunkGetSingleArtist(userId))
        dispatch(authenticate())
        return newArtistProfileDetails
    }
}


// export const thunkEditUserArtistProfile = (userId, userArtistProfile) => async (dispatch) => {
// 	const response = await fetch(`/api/artists/${userId}/UpdateUserArtistProfile`, {
// 		method: 'PUT',
// 		headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userArtistProfile)
// 	})

//     if(response.ok){
//         const newArtistProfileDetails = await response.json();
//         // console.log("NEW ARTIST PROFILE DETAILS THUNK---->>", newArtistProfileDetails)
//         dispatch(thunkGetSingleArtist(userId))
//         dispatch(authenticate())
//         return newArtistProfileDetails
//     }
// }




const initialState = { allArtists: {}, singleArtist: {} }

//REDUCER

const allArtistsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_ARTISTS:{
            const newState = { ...state };
            newState.allArtists = action.getAllArtists
            return newState
        }
        case GET_SINGLE_ARTIST:{
            const newState = { ...state }
            newState.singleArtist = action.singleArtist
            return newState
        }
        default: return state
    }
}

export default allArtistsReducer;
