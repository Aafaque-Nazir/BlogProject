import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/conf";
import { Button, Container } from "../src/components/export";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-6 px-4 md:px-8">
            <Container>
                {/* Image Section */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-auto rounded-xl object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex flex-col md:flex-row gap-2 md:gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Title Section */}
                <div className="w-full mb-4 text-center md:text-left">
                    <h1 className="text-xl md:text-2xl font-bold">{post.title}</h1>
                </div>

                {/* Content Section */}
                <div className="browser-css text-gray-300 text-sm md:text-base">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
