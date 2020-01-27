import React from 'react';
import 'materialize-css'

const LinkCard = ({link}) => {
    return (
        <div>
            <h2>Link</h2>
            <p>Shortened link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Original link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks total: <strong>{link.clicks}</strong></p>
            <p>Created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    );
};

export default LinkCard;