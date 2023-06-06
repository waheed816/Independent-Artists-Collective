import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkPostNewArtwork } from "../../store/art_pieces";


const PostArtworkForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { userId } = useParams();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [img1url, setImg1url] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async(e) => {

        e.preventDefault();

        const allErrors = {};

        if (!name.length) allErrors.name = "Title is required"
        if (name.length > 100) allErrors.name = "Title cannot be more than 100 characters"
        if (!description.length) allErrors.description = "Description is required";
        else if (description.length < 30) allErrors.description = "Description must be at least 30 characters";
        if (description.length > 1500) allErrors.description = "Description cannot exceed 1500 characters";

        if(!img1url.length){
            allErrors.img1url = "Image URL is required"
        } else if(!img1url.endsWith('.png') && !img1url.endsWith('.jpg') && !img1url.endsWith('.jpeg')){
            allErrors.img1url = "Image URL must end in .png, .jpg, or .jpeg"
        }

        if (!price){
            allErrors.price = "Price is required";
        }else if (!Number(price) && Number(price) !== 0){
            allErrors.price = "Price must be numbers only"
        }
        else if (price < 1) {
            allErrors.price = "Price must at least $1";
        }
        else if (price.includes(".")) {
            allErrors.price = "Price must be whole number such as 20, 50, 100, etc";
        }
        else if (price > 100000) {
            allErrors.price = "Price cannot exceed $100,000";
        }

        if(Object.keys(allErrors).length) return setErrors(allErrors);

        if(!Object.keys(allErrors).length)
        {
            setErrors({});

            const newArtworkDetails =
            {
                userId,
                img1url,
                name,
                description,
                price
            }




            const newArtwork = await dispatch(thunkPostNewArtwork(newArtworkDetails))




            history.push(`/art_pieces/${newArtwork.id}`)
        }

    }


    return (
        <div>
            <div className='create-spot-form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='section-inputs'>
                        <h1>Post your Artwork</h1>
                        <div className='section-inputs'>
                        <h3>Artwork Image</h3>
                        <p>
                            Submit a link to an image of your artwork.
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
                            <div className='section-inputs'>
                                {/* <div className='input-labels'> */}
                                    <h3>Title</h3>
                                    <p>
                                        Provide a title for your artwork.
                                    </p>
                                {/* </div> */}
                                <div className='input-container'>
                                    <input
                                        className='input-fields'
                                        type='text'
                                        placeholder="example: Starry Night"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <p className='create-spot-errors'>
                                        {errors.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    <div className='border-line'></div>
                    <div className='section-inputs'>
                        <h3>Description</h3>
                        <p>
                            Provide details and description of your artwork.
                        </p>
                        <textarea
                            className='create-spot-text-area'
                            placeholder=
                                {"EXAMPLE:\n\nMedium:\nsuch as oil paint, watercolor, print, sculpture, etc. \n\nDimensions: Height x Width x Depth(if applicable)\n\nOR\n\nSize: Small/Medium/Large if art is depicted on clothing \n\nDescription:\nIn this artwork, I aimed to convey [theme or concept]. Through [specific artistic techniques or elements], I sought to [desired effect or emotional response]. The use of [color palette, texture, or style] adds [specific qualities or atmosphere]. The composition [composition description, such as balanced, asymmetrical, or dynamic] guides the viewer's gaze towards [focal point or important elements]. Overall, this piece embodies [artist's intended message or artistic vision]."}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <p className='create-spot-errors'>
                            {errors.description}
                        </p>
                        <div className='border-line'></div>
                    </div>
                    <div className='section-inputs'>
                    <strong>Price</strong>
                    <p>
                        Provide a purchase price for your artwork.
                    </p>
                    <div className='input-container'>
                        <div className='price-input'>
                            <label className='dollar-sign'>$</label>
                            <input
                                className='input-fields'
                                type='text'
                                placeholder="required"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            </div>
                                <p className='create-spot-errors'>
                                    {errors.price}
                                </p>
                        </div>
                </div>
                    <div className='border-line'></div>

                    <div className='submit-button-container'>
                        <button type="submit" className='create-spot-button'>SUBMIT YOUR ARTWORK</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default PostArtworkForm;
