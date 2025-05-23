import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../src/components/export';
import appwriteService from "../Appwrite/conf";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-gray-300 rounded-4xl">
                <Container>
                    <div className="flex flex-col items-center justify-center px-4">
                        <h1 className="text-2xl sm:text-4xl font-bold text-indigo-400 mb-4">
                            No Posts Available
                        </h1>
                        <p className="text-lg text-gray-400 mb-6 text-center">
                            It seems there are no posts to display right now. Check back later!
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-100 bg-indigo-500 rounded-full hover:bg-indigo-700 transition duration-300"
                        >
                            Refresh
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap justify-center'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
