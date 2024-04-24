import React, { useEffect, useState } from 'react';
import { Container, PostForm ,Spinner} from '../components';
import dbService from '../appwrite/database.js';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        if (slug) {
            dbService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        setError("Post not found");
                    }
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!post) {
        return <p>Post not found</p>;
    }

    return (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    );
}

export default EditPost;
