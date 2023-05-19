from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        username='Demo', email='demo@aa.io', password='password')

    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')

    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    picasso = User(
        username = 'pablo',
        email = 'pablo@picasso.com',
        password = 'picassopassword',
        artist = True,
        name = 'Pablo Picasso',
        origin = 'Málaga, Spain',
        current_location = 'Vauvenargues, France',
        quote = 'Inspiration exists, but it has to find you working. -Picasso',
        bio = 'Pablo Picasso was a Spanish painter, sculptor, printmaker, ceramicist and stage designer considered one of the greatest and most influential artists of the 20th century. Picasso is credited, along with Georges Braque, with the creation of Cubism.',
        phone = '555-555-5555',
        instagram = '@museepicassoparis',
        contact_email = 'pablo@picasso.com',
        artist_image_url = 'https://www.pablopicasso.org/images/picasso.jpg'
    )

    dali = User(
        username = 'salvador',
        email = 'salvadore@dali.com',
        password = 'dalipassword',
        artist = True,
        name = 'Salvador Dali',
        origin = 'Figueres, Spain',
        current_location = 'Figueres, Spain',
        quote = 'A true artist is not one who is inspired, but one who inspires others. -Dali',
        bio = 'Salvador Dalí, in full Salvador Felipe Jacinto Dalí y Domenech, (born May 11, 1904, Figueras, Spain—died January 23, 1989, Figueras), is a Spanish Surrealist painter and printmaker, influential for his explorations of subconscious imagery.',
        phone = '555-555-5555',
        instagram = '@dalieum',
        contact_email = 'salvadore@dali.com',
        artist_image_url = 'https://content.magnumphotos.com/shop/wp-content/uploads/2020/08/NYC30954_Comp.jpg'
    )

    van_gogh = User(
        username = 'vincent',
        email = 'vincent@vangogh.com',
        password = 'vangoghpassword',
        artist = True,
        name = 'Vincent Van Gogh',
        origin = 'Zundert, Netherlands',
        current_location = 'Auvers-sur-Oise, France',
        quote = 'Great things are not done by impulse, but by a series of small things brought together. -Van Gogh',
        bio = 'Vincent van Gogh, in full Vincent Willem van Gogh, (born March 30, 1853, Zundert, Netherlands—died July 29, 1890, Auvers-sur-Oise, near Paris, France), Dutch painter, generally considered the greatest after Rembrandt van Rijn, and one of the greatest of the Post-Impressionists. The striking colour, emphatic brushwork, and contoured forms of his work powerfully influenced the current of Expressionism in modern art.',
        phone = '555-555-5555',
        instagram = '@vangoghmuseum',
        contact_email = 'vincent@vangogh.com',
        artist_image_url = 'https://www.vincentvangogh.org/images/van-gogh.jpg'
    )



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(picasso)
    db.session.add(dali)
    db.session.add(van_gogh)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
