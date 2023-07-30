import React from "react";
import "./ArtworkDescriptionModal.css"

const ArtworkDescriptionModal = ({artworkDetails}) => {
    return(
        <div className="artwork-description-modal">
            <div >
                <img className="artwork-description-image" src={artworkDetails.art_image_url}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://st3.depositphotos.com/26272052/33085/v/600/depositphotos_330852614-stock-illustration-color-delete-folder-icon-isolated.jpg"
                    }}
                    alt={`${artworkDetails.name}'s image unavailable`}>

                </img>
            </div>
            {/* <div>
                <h4>{artworkDetails.name}</h4>
            </div> */}
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
