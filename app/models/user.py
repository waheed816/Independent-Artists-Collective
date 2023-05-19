from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    artist = db.Column(db.Boolean, nullable=False, default=False)
    name = db.Column(db.String(100), nullable=True)
    origin = db.Column(db.String(100), nullable=True)
    current_location = db.Column(db.String(100), nullable=True)
    quote = db.Column(db.String(500), nullable=True)
    bio = db.Column(db.String(1000), nullable=True)
    phone = db.Column(db.String(12), nullable=True)
    instagram = db.Column(db.String(40), nullable=True)
    contact_email = db.Column(db.String(40), nullable=True)
    artist_image_url = db.Column(db.String(500), nullable=True)

    art_pieces = db.relationship("Art_Piece", cascade="all, delete-orphan", back_populates="artist")

    wishlist_user = db.relationship('Art_Piece', secondary='wishlist_items', back_populates='wishlist_art_piece')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'artist': self.artist,
            'origin': self.origin,
            'current_location': self.current_location,
            'quote': self.quote,
            'bio': self.bio,
            'phone': self.phone,
            'instagram': self.instagram,
            'contact_email': self.contact_email,
            'artist_image_url': self.artist_image_url
        }
