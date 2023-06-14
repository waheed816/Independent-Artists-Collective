from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Art_Piece, Wishlist_Item, db

art_pieces_routes = Blueprint('art_pieces', __name__)

@art_pieces_routes.route('/postNewArtwork', methods=['POST'])
@login_required
def post_new_artwork():

    new_artwork = request.get_json()

    # print("NEW ARTWORK------>>>", new_artwork)

    create_new_artwork = Art_Piece(
        artist_id = new_artwork['userId'],
        name = new_artwork['name'],
        description = new_artwork['description'],
        price = new_artwork['price'],
        art_image_url = new_artwork['img1url']
    )

    db.session.add(create_new_artwork)
    db.session.commit()

    return create_new_artwork.to_dict()

@art_pieces_routes.route('/editArtworkDetails/<int:artworkId>', methods=['PATCH'])
@login_required
def edit_artwork_details(artworkId):

    art_piece_details = Art_Piece.query.get(artworkId)

    edited_artwork_details = request.get_json()

    art_piece_details.name = edited_artwork_details['name']
    art_piece_details.description = edited_artwork_details['description']
    art_piece_details.price = edited_artwork_details['price']
    art_piece_details.art_image_url = edited_artwork_details['img1url']

    db.session.commit()

    return art_piece_details.to_dict()

@art_pieces_routes.route('/deleteArtpiece/<int:artworkId>', methods=['DELETE'])
@login_required
def delete_artpiece(artworkId):

    art_piece = Art_Piece.query.get(artworkId)

    db.session.delete(art_piece)
    db.session.commit()

    return {'message': 'Artpiece Successfully Deleted'}


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

    print('GET USER WISHLIST------>>>>>>>>>>>', userId)

    wishlist_user = User.query.get(userId)

    wishlist_user_object = wishlist_user.to_dict()

    wishlist_items_array = wishlist_user_object['wishlist_items']

    # print('WISHLIST ITEMS ARRAY--->>>', wishlist_items_array)

    for art_piece in wishlist_items_array:
        wishlist_item_info = db.session.query(Wishlist_Item).filter_by(wishlist_user_id=userId, wishlist_item_id=art_piece['id']).first()
        # print('WISHLIST ITEMS INFO----------------->>>', wishlist_item_info.wishlist_id)
        #  = wishlist_item_info.wishlist_id
        # print('ART PIECE------------>>>>>', art_piece)
        art_piece['wishlist_id'] = wishlist_item_info.wishlist_id
        artist_id = art_piece['artist_id']
        artist_info = User.query.get(artist_id)
        artist = artist_info.to_dict()
        # print ('ARTIST---------------->>>', artist)
        art_piece['artist_name'] = artist['name']
        art_piece['artist_image'] = artist['artist_image_url']


    # print('WISHLIST ITEMS ARRAY----------------->>>', wishlist_items_array['wishlist_item_id'])

    return wishlist_items_array



@art_pieces_routes.route('/wishlist/<int:userId>/<int:artPieceId>', methods=['DELETE'])
@login_required
def delete_wishlist_item(userId, artPieceId):

    print('DELETE USER WISHLIST------>>>>>>>>>>>', userId, artPieceId)

    db.session.query(Wishlist_Item).filter_by(wishlist_user_id=userId, wishlist_item_id=artPieceId).delete()
    db.session.commit()

    return {'message': 'successfully deleted'}


@art_pieces_routes.route('/add_to_wishlist/<int:userId>/<int:artPieceId>', methods=['POST'])
@login_required
def add_item_to_user_wishlist(userId, artPieceId):

    print('ADD TO USER WISHLIST------>>>>>>>>>>>', userId, artPieceId)

    # wishlist_item = Wishlist_Item(wishlist_user_id=userId, wishlist_item_id=artPieceId)

    wishlist_item = Wishlist_Item.insert().values(wishlist_user_id=userId, wishlist_item_id=artPieceId)

    db.session.execute(wishlist_item)
    db.session.commit()


    return {'message': 'added successfully'}
