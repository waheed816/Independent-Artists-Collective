from flask import Blueprint, session, request, jsonify
from app.models import User, Art_Piece, db
from flask_login import login_required

artists_routes = Blueprint('artists', __name__)

@artists_routes.route('/')
def get_all_artists():

    all_artists = User.query.filter(User.artist == True).all()

    response = [artist.to_dict() for artist in all_artists]

    # print('RESPONSE------------>>>>', response)

    return response



@artists_routes.route('/<int:artist_id>')
def get_artist_details(artist_id):

    single_artist_details = User.query.get(artist_id)

    # print("SINGLE ARTIST DETAILS-------->", single_artist_details)

    response = single_artist_details.to_dict()

    return response

@artists_routes.route('/<int:artist_id>/UpdateUserArtistProfile', methods=['PUT'])
@login_required
def update_user_artist_profile(artist_id):

    single_artist_details = User.query.get(artist_id)

    # print('ARTIST DETAILS OBJECT ----->>>', single_artist_details)

    new_artist_profile = request.get_json()

    single_artist_details.artist = new_artist_profile['artist']
    single_artist_details.bio = new_artist_profile['description']
    single_artist_details.contact_email = new_artist_profile['email']
    single_artist_details.current_location = new_artist_profile['currentLocation']
    single_artist_details.instagram = new_artist_profile['instagram']
    single_artist_details.name = new_artist_profile['name']
    single_artist_details.origin = new_artist_profile['origin']
    single_artist_details.phone = new_artist_profile['phone']
    single_artist_details.quote = new_artist_profile['quote']
    single_artist_details.artist_image_url = new_artist_profile['img1url']

    # print('NEW ARTIST PROFILE-------->>>', new_artist_profile)

    db.session.commit()

    # print('SINGLE ARTIST DETAILS----->>', single_artist_details.artist)
    return single_artist_details.to_dict()
