from .db import db, environment, SCHEMA, add_prefix_for_prod


class Art_Piece(db.Model):
    __tablename__ = 'art_pieces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    art_image_url = db.Column(db.String(500), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    artist = db.relationship("User", back_populates="art_pieces")
    # wishlist_art_piece = db.relationship("Wishlist_Item", cascade="all, delete-orphan", back_populates="art_piece")
    # user = db.relationship("User", back_populates="wishlist_user")
    wishlist_user = db.relationship('User', secondary='wishlist_items', back_populates='wishlist_items')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'art_image_url': self.art_image_url,
            'artist_id': self.artist_id
        }
