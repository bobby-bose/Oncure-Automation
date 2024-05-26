import React from 'react';
import './logo.css';

const Avatar = ({ src, alt }) => {
  return (
 <div className="avatar-wrapper">
      <img src={src} alt={alt} className="avatar" />
    </div>
  );
};

export default Avatar;
