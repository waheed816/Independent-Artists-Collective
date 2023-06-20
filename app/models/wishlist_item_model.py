from .db import db, environment, SCHEMA, add_prefix_for_prod

Wishlist_Item = db.Table('wishlist_items',

    db.Column('wishlist_id', db.Integer, primary_key=True),
    db.Column('wishlist_user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('wishlist_item_id', db.Integer, db.ForeignKey(add_prefix_for_prod('art_pieces.id')))

    # art_piece = db.relationship("Art_Piece", back_populates="wishlist_art_piece")
    # user = db.relationship("User", back_populates="wishlist_user")
)

if environment == "production":
    Wishlist_Item.schema = SCHEMA



# def to_dict(self):
#     return{
#         'wishlist_id': self.wishlist_id,
#         'artist_id': self.artist_id,
#         'art_piece_id': self.art_piece_id
#     }
