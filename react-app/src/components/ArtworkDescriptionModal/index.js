import React from "react";
import "./ArtworkDescriptionModal.css"

const ArtworkDescriptionModal = ({artworkDetails}) => {
    return(
        <div className="artwork-description-modal">
            <div>
                <h2>{artworkDetails.name}</h2>
            </div>
            <div >
                <img className="artwork-description-image" src={artworkDetails.art_image_url} alt={`${artworkDetails.name}'s image unavailable`}></img>
            </div>
            <div className="art-piece-details-description-container">
                <div className="art-piece-details-description">
                    {artworkDetails.description.split('\n\n').map((paragraph, index) => (
                        <p key={index}>
                            {paragraph.split('\n').map((line, lineIndex) => (
                                <React.Fragment key={lineIndex}>
                                    {line}
                                    {lineIndex !== paragraph.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ArtworkDescriptionModal;
