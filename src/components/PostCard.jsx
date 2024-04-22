import React from 'react';
import { Link } from 'react-router-dom';
import storageService from '../appwrite/storage';

const PostCard = ({ $id, title, featuredImage }) => {
  const imageUrl = featuredImage ? storageService.getFilePreview(featuredImage) : '';

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={imageUrl} alt={title} className='rounded-xl'/>
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
