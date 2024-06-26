import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/database";
import { Button, Container, Spinner } from "../components";
import storageService from "../appwrite/storage";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        setLoading(true); 
        if (slug) {
            dbService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching post:", error);
                    navigate("/"); 
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        dbService.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    storageService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
            });
    };

    return (
        <>
            {loading ? (
                <Spinner /> 
            ) : post ? (
                <div className="py-8">
                    <Container>
                        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                            <img
                                src={storageService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl"
                            />

                            {isAuthor && (
                                <div className="absolute right-6 top-6">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-green-500" className="mr-3">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button bgColor="bg-red-500" onClick={deletePost}>
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="w-full mb-6">
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                        </div>
                        <div className="browser-css">
                            {parse(post.content)}
                        </div>
                    </Container>
                </div>
            ) : null}
        </>
    );
}
