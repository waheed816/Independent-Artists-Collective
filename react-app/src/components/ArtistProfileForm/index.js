import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkUpdateUserArtistProfile } from "../../store/artists";
import "./ArtistProfileForm.css"

const ArtistProfileForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { userId } = useParams();

    const [name, setName] = useState('')
    const [origin, setOrigin] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [description, setDescription] = useState('');
    const [quote, setQuote] = useState('');
    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('');
    const [phone, setPhone] = useState('');
    const [img1url, setImg1url] = useState('');
    const [errors, setErrors] = useState({});

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          return true
        }
    }

    const handleSubmit = async(e) => {

        e.preventDefault();

        const allErrors = {};

        if (!name.length) allErrors.name = "Name/Alias is required"
        if (!origin.length) allErrors.origin = "Origin is required";
        if (!currentLocation.length) allErrors.currentLocation = "Current Location is required";
        if (description.length < 30) allErrors.description = "Your Story is required and needs to be a minimum of 30 characters";
        if (!quote.length) allErrors.quote = "Favorite Quote is required";
        if (!email) {
            allErrors.email = "Email address required";
        }else if(validateEmail(email)){
            allErrors.email = "Invalid email address"
        }

        if(!img1url.length){
            allErrors.img1url = "Image URL required"
        } else if(!img1url.endsWith('.png') && !img1url.endsWith('.jpg') && !img1url.endsWith('.jpeg')){
            allErrors.img1url = "Image URL must end in .png, .jpg, or .jpeg"
        }

        if(Object.keys(allErrors).length) return setErrors(allErrors);

        if(!Object.keys(allErrors).length)
        {
            setErrors({});

            const userArtistProfile =
            {
                name,
                origin,
                currentLocation,
                description,
                quote,
                email,
                instagram,
                phone,
                img1url
            }

            if(!instagram.length || !instagram) userArtistProfile.instagram = 'n/a'
            if(!phone.length || !phone) userArtistProfile.phone = 'n/a'


            const newArtistDetails = await dispatch(thunkUpdateUserArtistProfile(userId, userArtistProfile))

            console.log('NEW ARTIST DETAILS------->>>', newArtistDetails)
            console.log('USER ARTIST PROFILE------->>>', userArtistProfile)

            history.push(`/artist/${userId}`)
        }

    }

    return(
        <div>
            <div className='create-spot-form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='section-inputs'>
                        <h1>Create your Artist Profile</h1>
                        <div className='border-line'></div>
                        <h3>Complete your artist profile and start posting your artwork!</h3>
                        <p>
                            <strong>The information you provide on your profile will help convey to fellow artists and other users your unique persona and journey as an artist so that they may want to connect with you for collaboration purposes or to commision and purchase your artwork.</strong>
                        </p>
                        <div className='border-line'></div>
                        <h3>BASIC INFORMATION</h3>
                        <div className='input-labels'>
                            <strong>Name/Alias</strong>
                            <p className='create-spot-errors'>
                                {errors.name}
                            </p>
                        </div>
                        <div className='input-container'>
                            <input
                                className='input-fields'
                                type='text'
                                placeholder="examples: Fabe, Info, Nasr, Nip$ey Hu$$le, Pablo Picasso"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='input-labels'>
                            <strong>Origin</strong>
                            <p className='create-spot-errors'>
                                {errors.origin}
                            </p>
                        </div>
                        <div className='input-container'>
                            <input
                                className='input-fields'
                                type='text'
                                placeholder="City, State of birth OR place where you grew up"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                            />
                        </div>
                        <div className='input-labels'>
                            <strong>Current Location</strong>
                            <p className='create-spot-errors'>
                                {errors.currentLocation}
                            </p>
                        </div>
                        <div className='input-container'>
                            <input
                                className='input-fields'
                                type='text'
                                placeholder="City, State where you currently live"
                                value={currentLocation}
                                onChange={(e) => setCurrentLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='border-line'></div>
                    <div className='section-inputs'>
                        <h3>YOUR STORY</h3>
                        <p>
                            A brief description about you as an artist
                        </p>
                        <textarea
                            className='create-spot-text-area'
                            placeholder="Don't leave your canvas blank"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <p className='create-spot-errors'>
                            {errors.description}
                        </p>
                    </div>
                    <div className='border-line'></div>
                    <div className='section-inputs'>
                        <h3>FAVORITE QUOTE</h3>
                        <p>A quote that inspires or defines you as an artist</p>
                        <div className='input-container'>
                            <input
                                className='input-fields'
                                type='text'
                                placeholder='example: "The highest human act is to inspire" -Nipsey Hussle'
                                value={quote}
                                onChange={(e) => setQuote(e.target.value)}
                            />
                            <p className='create-spot-errors'>
                                {errors.quote}
                            </p>
                        </div>
                    </div>
                    <div className='border-line'></div>
                    <div className='section-inputs'>
                        <h3>CONTACT INFORMATION</h3>
                        <p>
                            Other artists and users will use this information to contact you for collaboration or to commision and purchase your artwork.
                        </p>
                        <div className='input-container'>
                            <div className='imput-fields'>
                                <p><strong>Email Address</strong></p>
                                <input
                                    className='input-fields'
                                    type='text'
                                    placeholder="required"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                                <p className='create-spot-errors'>
                                    {errors.email}
                                </p>
                                <div>
                                    <p><strong>Instagram</strong></p>
                                    <input
                                        className='input-fields'
                                        type='text'
                                        placeholder="optional"
                                        value={instagram}
                                        onChange={(e) => setInstagram(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p><strong>Phone Number</strong></p>
                                    <input
                                        className='input-fields'
                                        type='text'
                                        placeholder="optional"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                            </div>
                    </div>
                    <div className='border-line'></div>
                    <div className='section-inputs'>
                        <h3>YOUR PROFILE PICTURE</h3>
                        <p>
                            Submit a link to an image of you to be displayed on your artist profile page.
                        </p>
                        <div className='input-container'>
                            <input
                                className='input-fields'
                                type='text'
                                placeholder="required"
                                value={img1url}
                                onChange={(e) => setImg1url(e.target.value)}
                            />
                            <p className='create-spot-errors'>
                                {errors.img1url}
                            </p>
                        </div>
                    </div>
                    <div className='border-line'></div>
                    <div className='submit-button-container'>
                        <button type="submit" className='create-spot-button'>SUBMIT ARTIST PROFILE</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ArtistProfileForm;
