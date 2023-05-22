from app.models import db, Wishlist_Item, environment, SCHEMA
from sqlalchemy.sql import text


def seed_wishlist_items():

    wishlist_items_data = [
        {'wishlist_user_id': 2, 'wishlist_item_id': 4},
        {'wishlist_user_id': 2, 'wishlist_item_id': 5},
        {'wishlist_user_id': 2, 'wishlist_item_id': 6},
        {'wishlist_user_id': 3, 'wishlist_item_id': 7},
        {'wishlist_user_id': 3, 'wishlist_item_id': 8},
        {'wishlist_user_id': 3, 'wishlist_item_id': 9},
        {'wishlist_user_id': 4, 'wishlist_item_id': 4},
        {'wishlist_user_id': 4, 'wishlist_item_id': 5},
        {'wishlist_user_id': 4, 'wishlist_item_id': 6},
        {'wishlist_user_id': 5, 'wishlist_item_id': 7},
        {'wishlist_user_id': 5, 'wishlist_item_id': 8},
        {'wishlist_user_id': 5, 'wishlist_item_id': 9},
        {'wishlist_user_id': 6, 'wishlist_item_id': 3},
        {'wishlist_user_id': 6, 'wishlist_item_id': 2},
        {'wishlist_user_id': 6, 'wishlist_item_id': 1}
    ]

    wishlist_items_rows=[]
    for wishlist_data in wishlist_items_data:
        wishlist_items_rows.append(wishlist_data)

    db.session.execute(Wishlist_Item.insert().values(wishlist_items_rows))

    db.session.commit()


def undo_wishlist_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlist_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wishlist_items"))

    db.session.commit()
