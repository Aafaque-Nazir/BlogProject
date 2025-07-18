import React, { useEffect, useState } from 'react';
import appwriteService from "../Appwrite/conf";
import { Container, PostCard } from '../src/components/export';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.userData);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-gray-900 text-gray-300 rounded-lg">
                <Container>
                    <div className="flex flex-col items-center justify-center px-4">
                        <h1 className="text-xl sm:text-2xl font-bold hover:text-gray-500 transition">
                            No Post Available
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <h1 className='mx-auto text-3xl font-bold my-6 '>Image Preview Not Available!</h1>
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

export default Home;
