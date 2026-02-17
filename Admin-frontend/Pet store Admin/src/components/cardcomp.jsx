import React, { useEffect, useState } from "react";
import "./cardcomp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheckCircle,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

function Cardcomp({ onClick, name, photoURLs, id, onQuickEdit, status }) {
  const [copied, setCopied] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (photoURLs && photoURLs.data) {
      const base64String = btoa(
        new Uint8Array(photoURLs.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImageUrl(`data:image/png;base64,${base64String}`);
    }
  }, [photoURLs]);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="cardcomp" onClick={onClick}>
      <div className="image-wrapper">
        {imageUrl ? (
          <img className="catimage" src={imageUrl} alt={name} />
        ) : (
          <p className="no-image">No image available</p>
        )}
      </div>

      <div className="card-content">
        <h3 className="pet-name">{name}</h3>

        <div className="id-row">
          <span className="pet-id">{id}</span>
          <FontAwesomeIcon
            icon={faCopy}
            className="copy-icon"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
          />
          {copied && <span className="copied-text">Copied</span>}
        </div>

        <button
          className="orderbtn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickEdit();
          }}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          <span>{status}</span>
        </button>

        <button className="orderbtn">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>Place Order</span>
        </button>
      </div>
    </div>
  );
}

export default Cardcomp;
