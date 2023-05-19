from app.models import db, Art_Piece, environment, SCHEMA
from sqlalchemy.sql import text


def seed_art_pieces():

    picasso1 = Art_Piece(
        name = 'Asleep, 1932',
        description = "The model of this painting, Asleeep, painted in 1932, is Picasso's mistress Marie Therese. She was resting between the two powerful polarized color blocks of red and green, which accentuate the tranquility of Marie Therese while sleeping. The solid black outline around the Marie's hands and profile is a feature of the series recalling the Fauvist's black binding of color blocks.\n\n"

        "Pay attention to Marie's hands. Her claw-like features give her an \"animalistic primitivism,\" which is a belief in the simpleness and unsophistication of life. It is a weird combination of beauty and ugliness, another theme that continually fascinated Picasso and was depicted in many of his other paintings.\n\n"
        "The Surrealists' fantasy world is hinted, yet the viewer is seeing outer materiality instead of the model's subconscious mental processes. The work is more an impression of the artist's sub-consciousness and with the sensual look, the depiction can be turned into a sexual organ.",
        price = 500000,
        art_image_url = 'https://www.pablopicasso.org/images/paintings/asleep.jpg',
        artist_id = 4
    )

    picasso2 = Art_Piece(
        name = 'Man with a Pipe, 1915',
        description = 'The year 1915 was a somber one, with the impact of World War One being felt in France and most men joining up, including Georges Braque, who was seriously injured, and fellow painter Andre Derain (1880-1954). Picasso was viewed with suspicion by contemporary society as he was young and healthy yet did not go to fight; in fact he demonstrated considerable ambivalence in his attitude to the war, especially with his obvious close connections to his main art dealer, the Paris-based German, Daniel-Henry Kahnweiler.\n\n'

        'However, this large canvas, 130 x 90 cm (52 x 36 in), has a quiet humor and feeling of composure. The use of Pointillist-style dots, with their stippled effect and the inclusion of a painted marble-effect herald Picasso\'s return to color exploration and his interest in the development of interior design processes. The incorporation of frieze-like techniques, with areas of architectural scrolling, creates a sense of movement to oppose the tension of the solid piling up of the angular blocks. These techniques also connote the curling of smoke from the pipe in the bottom right of the picture. The experimental return to Naturalism filters through in this painting with the half-figurative face, hands and waistcoat fragment, though with comic intent. The artist\'s sense of humor is apparent in the jigsaw compilations of the face, whose bizarre, textured overlays create the nose, mustache and mouth so that a bird-shape appears. Picasso was moving away from Cubism, as seen in Man with a Guitar (1911). Surrealism was beckoning.',
        price = 1000000,
        art_image_url = 'https://www.pablopicasso.org/images/paintings/man-with-a-pipe.jpg',
        artist_id = 4
    )

    picasso3 = Art_Piece(
        name = 'Bullfight Scene, 1960',
        description = "Bullfight Scene, 1960 is taken from a bullfighting collection produced for a Spanish publication called La Tauromaquia (The Art of Bullfighting) which came out in late 1959, with a sequel in 1961.\n\n"

        "Picasso worked on the project regularly during this period, beautifully recreating animated scenes from his lifelong passion of bullfighting. The publication also enabled him to re-examine a variety of engraving print methods, including etching, dry-point and aquatints, as well as pen and ink. Dry-point etching is the use of a steel stylus on unpolished copper plate so that ink is caught in the scratched copper 'burrs' to create a characteristic bloom to the line. Aquatint uses acid in the etching combined with stopping techniques so that darkening degrees of tone can be achieved.\n\n",
        price = 1500000,
        art_image_url = 'https://www.pablopicasso.org/images/paintings/bullfight-scene.jpg',
        artist_id = 4
    )

    dali1 = Art_Piece(
        name = 'Average Atmospherocephalic Bureaucrat in the Act of Milking a Cranial Harp',
        description = "This exquisite miniature is an attack on Dalí's father who is presented in the strange act of “milking” the skull-harp. Both the distorted, anamorphic skull and the crutch are Dalínian symbols of impotency used repeatedly in his early surrealist works. Their meaning is conveyed through the skull's flaccid state, requiring a crutch for support. The enigmatic bureaucrat in his nightshirt and gartered socks refers to Dalí’s estranged father, who is implicated in this humiliating act of “milking.”",
        price = 500000,
        art_image_url = 'https://archive.thedali.org/MWEBimages/Collection%20Images/OILS_images%20saved%20for%20Web/2007.5_Average%20Atmos%20Bureaucrat_web.jpg',
        artist_id = 5
    )

    dali2 = Art_Piece(
        name = 'Gala Contemplating the Mediterranean Sea which at Twenty Meters Becomes the Portrait of Abraham Lincoln-Homage to Rothko (Second Version)',
        description = '''Gala Contemplating the Mediterranean Sea... demonstrates a fascination with perception and the mystery of identity. Dalí layers multiple optical scales to create two paintings in one. This painting is based on a photograph that Dalí first saw in the November, 1973 issue of Scientific American. Vol. 229. No.5. The article, "The Recognition of Faces" by Leon D. Harmon, featured a reproduced low resolution (252 pixels) monochromatic photograph of the face of Abraham Lincoln from an American $5 bill. Harmon's computer-generated "coarse-scale" portrait demonstrated the low quantity of information needed to represent a recognizable individual face. The concept awakens Dalí's old fascination with paranoia – specifically, how much of the reading of an image is from the viewer as distinct from the thing viewed. By squinting slightly and so flattening the depth of field, the portrait of Lincoln snaps into view, displacing the figure of Gala. Once seen, the image appears at each return.

        Gala's figure is framed by the cruciform windows through which the viewer is led to a crucifixion painted in heavy impasto. The figure of Jesus on the cross, reminiscent of Dalí's 1951 painting titled Christ of St. John of the Cross, (St. Mungo Museum of Religious Life and Art, Glasgow, Scotland), appears in the clouds. The earlier painting by Dalí is inspired by a 16th-century drawing by the Carmelite Friar St. John of the Cross (1542-1591) where Christ is viewed from above. The top of Christ's head glows, representing the rising morning sun, a new element Dalí created as he developed this work on canvas. Yet, in spite of the masterful and expressive use of paint, Dalí plays with the ambiguity of medium. The ironic use of paint to recreate the effects of photography on one level is made more resonant by the collage of small printed reproductions of the Harmon photo onto the canvas.''',
        price = 1000000,
        art_image_url = 'https://archive.thedali.org/MWEBimages/Collection%20Images/OILS_images%20saved%20for%20Web/2004.1_Gala%20Contemplating_after%20conservation_2016_web.jpg',
        artist_id = 5
    )

    dali3 = Art_Piece(
        name = 'The Weaning of Furniture-Nutrition',
        description = '''The provocatively titled "The Weaning of Furniture-Nutrition" is a surreal meditation on the word "weaning." The woman is Dalí's childhood nurse, Llucia, who "weaned" the young Dalí from his mother. Dalí has metaphorically "weaned" Llucia out of her familiar environment, for she is no longer a nurse in his childhood Figueres. Instead, Dalí has posed her as a "net mender" in Port Lligat. In this fishing village, the women mend the torn fishing nets.

        Dalí takes the "weaning" metaphor one step further. As a child, Dalí associated his night table and bottle with his nurse and saw them as an intrinsic part of her being. So in this work, he "weaned" them physically out of her body, suggesting that his nurse and these inanimate objects were two parts of the same identity, the furniture fitting in a rectangular hole carved in her back. Their removal creates a void that requires a crutch, Dalí's symbol of death and impotence. In this painting, the crutch takes on a new meaning and becomes a symbol of solemnity rather than a prop of any kind.''',
        price = 1500000,
        art_image_url = 'https://archive.thedali.org/MWEBimages/Collection%20Images/OILS_images%20saved%20for%20Web/2007.29_The%20Weaning%20of%20Furniture%20Nutrition_web.jpg' ,
        artist_id = 5
    )

    van_gogh1 = Art_Piece(
        name = 'The Starry Night Over The Rhone, 1888',
        description = '''Ever since Van Gogh arrived in Arles, he was constantly preoccupied with the representation of "night effects". In April 1888, he wrote to his brother Theo: "I need a starry night with cypresses or maybe above a field of ripe wheat." In June, he confided to the painter Emile Bernard: "But when shall I ever paint the Starry Sky, this painting that keeps haunting me?"

        "Starry Night Over the Rhone" (September 1888) was one of three paintings made during the same month that incorporate the night sky and stars as fundamentally symbolic elements. He also painted "Cafe Terrace at Night" and a portrait of his friend Eugene Boch, which was perhaps the most symbolic of the three.

        "Starry Night Over the Rhone" was painted at a spot on the banks of the river which was only a minute or two's walk from the The Yellow House on the Place Lamartine, which Van Gogh was renting at the time. The night sky and the effects of light at night provided the subject for some of his more famous paintings, including "The Starry Night," the most famous Van Gogh night stars painting.

        The challenge of painting at night intrigued Van Gogh. The vantage point he chose for "Starry Night Over the Rhone" allowed him to capture the reflections of the gas lighting in Arles across the glimmering blue water of the Rhone. In the foreground, two lovers stroll by the banks of the river. Here his stars glow with a luminescence, shining from the dark, blue, and velvety night sky. Dotted along the banks of the Rhone, houses also radiate a light that reflects in the water and adds to the mysterious atmosphere of the painting.''',
        price = 500000,
        art_image_url = 'https://www.vincentvangogh.org/images/paintings/the-starry-night-over-the-rhone.jpg',
        artist_id = 6
    )

    van_gogh2 = Art_Piece(
        name = 'A Pair of Shoes, 1886',
        description = '''This painting of a pair of down-at-heel shoes prompts speculation on a variety of psychological questions. They have been seen as symbolizing Van Gogh's difficult passage through life.

        A fellow student in Paris reported that Vincent bought these workman's boots at a flea market, intending to use them in a still life. Finding them still a little too smart, however, he wore them on a long and rainy walk. Only then were they fit to be painted.

        Van Gogh made a number of still lives with old shoes. To him, as to several of his contemporaries, they may have been symbolic of the hard yet picturesque life of the laborer.''',
        price = 1000000,
        art_image_url = 'https://www.vincentvangogh.org/images/paintings/a-pair-of-shoes.jpg',
        artist_id = 6
    )

    van_gogh3 = Art_Piece(
        name = 'Almond Blossom, 1890',
        description = '''Almond Blossom was painted immediately before one of his attacks; "My work was going well," he informed his brother, "the last canvas of branches in blossom - you will see that it is perhaps the best, the most patiently worked thing I had done, painted with calm and with greater firmness of touch. And the next day, down like a brute." Poised between lucidity and desperation, this lacework of light and color is kept aloft by the confidence Van Gogh had acquired in the previous two or three years and the sheer technical finesse now at his command.

        During the course of his career, Vincent would copy a few Japanese paintings and were deeply influenced by his admiration for Japanese art. At the back of his mind may well have been a blossom study from a Japanese print, such as the work by Kunisada acquired at some point by the two brothers for their collection. In the "firmness of touch" of Almond Blossom, we see the culmination of years of intensive, questioning draftsmanship; and in the openness and buoyancy of the design, we sense the optimism that the artist - despite his insurmountable condition - could magnificently, magically translate into paint.''',
        price = 1500000,
        art_image_url = 'https://www.vincentvangogh.org/images/paintings/almond-blossom.jpg',
        artist_id = 6
    )

    db.session.add(picasso1)
    db.session.add(picasso2)
    db.session.add(picasso3)
    db.session.add(dali1)
    db.session.add(dali2)
    db.session.add(dali3)
    db.session.add(van_gogh1)
    db.session.add(van_gogh2)
    db.session.add(van_gogh3)
    db.session.commit()

def undo_art_pieces():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM art_pieces"))

    db.session.commit()
