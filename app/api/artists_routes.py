from flask import Blueprint, jsonify
from app.models import User, Art_Piece

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
