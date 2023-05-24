from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Art_Piece, Wishlist_Item, db

art_pieces_routes = Blueprint('art_pieces', __name__)

@art_pieces_routes.route('/')
def get_all_art_pieces():

    all_art_pieces = Art_Piece.query.all()

    response = [art_piece.to_dict() for art_piece in all_art_pieces]

    for art_piece in response:
        artist_id = art_piece['artist_id']
        artist_info = User.query.get(artist_id)
        artist = artist_info.to_dict()
        # print ('ARTIST---------------->>>', artist)
        art_piece['artist_name'] = artist['name']
        art_piece['artist_image'] = artist['artist_image_url']

    return response



@art_pieces_routes.route('/<int:art_piece_id>')
def get_art_piece_details(art_piece_id):


    # print("ART PIECE ID------------>>>>", art_piece_id)

    single_art_piece_details = Art_Piece.query.get(art_piece_id)

    response = single_art_piece_details.to_dict()

    artist_id = response['artist_id']

    artist_info = User.query.get(artist_id)

    artist = artist_info.to_dict()

    response['artist_name'] = artist['name']

    response['artist_image'] = artist['artist_image_url']

    return response



@art_pieces_routes.route('/artist/<int:artist_id>')
def get_all_art_pieces_by_artist(artist_id):

    all_art_pieces_by_artist = Art_Piece.query.filter(Art_Piece.artist_id == artist_id).all()

    response = [art_piece_by_artist.to_dict() for art_piece_by_artist in all_art_pieces_by_artist]

    return response



@art_pieces_routes.route('/wishlist/<int:userId>')
@login_required
def get_all_user_wishlist_art_pieces(userId):

    wishlist_user = User.query.get(userId)

    wishlist_user_object = wishlist_user.to_dict()

    wishlist_items_array = wishlist_user_object['wishlist_items']

    for art_piece in wishlist_items_array:
        artist_id = art_piece['artist_id']
        artist_info = User.query.get(artist_id)
        artist = artist_info.to_dict()
        # print ('ARTIST---------------->>>', artist)
        art_piece['artist_name'] = artist['name']
        art_piece['artist_image'] = artist['artist_image_url']

    return wishlist_items_array



@art_pieces_routes.route('/wishlist/<int:userId>/<int:artPieceId>', methods=['DELETE'])
@login_required
def delete_wishlist_item(userId, artPieceId):

    db.session.query(Wishlist_Item).filter_by(wishlist_user_id=userId, wishlist_item_id=artPieceId).delete()
    db.session.commit()

    return {'message': 'successfully deleted'}


@art_pieces_routes.route('/add_to_wishlist/<int:userId>/<int:artPieceId>', methods=['POST'])
@login_required
def add_item_to_user_wishlist(userId, artPieceId):

    # print('ADD TO USER WISHLIST------>>>>>>>>>>>', userId, artPieceId)

    # wishlist_item = Wishlist_Item(wishlist_user_id=userId, wishlist_item_id=artPieceId)

    wishlist_item = Wishlist_Item.insert().values(wishlist_user_id=userId, wishlist_item_id=artPieceId)

    db.session.execute(wishlist_item)
    db.session.commit()


    return {'message': 'added successfully'}
