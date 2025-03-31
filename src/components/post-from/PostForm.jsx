import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../export";
import appwriteService from "../../../Appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (!userData || !userData.$id) {
            alert("You must be logged in to create a post.");
            navigate("/login");
            return;
        }

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap bg-gradient-to-br from-indigo-900  to-gray-900 p-8 rounded-lg shadow-lg"
        >
            {/* Left Section */}
            <div className="w-2/3 px-4">
                {/* Title Input */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter the title"
                        className="peer w-full bg-gray-800 text-gray-300 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:border-indigo-400 transition duration-300"
                        {...register("title", { required: true })}
                    />
                    <label
                        htmlFor="title"
                        className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-sm peer-focus:text-indigo-500"
                    >
                    
                    </label>
                </div>

                {/* Slug Input */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        id="slug"
                        placeholder="Generated slug"
                        className="peer w-full bg-gray-800 text-gray-300 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:border-indigo-400 transition duration-300"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <label
                        htmlFor="slug"
                        className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-sm peer-focus:text-indigo-500"
                    >
                    
                    </label>
                </div>

              {/* Rich Text Editor */}
<div className="relative mb-6 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500">
    <RTE
        label="Content"
        name="content"
        control={control}
        defaultValue={getValues("content")}
        className="bg-gray-800 text-gray-300 border-none focus:outline-none focus:ring-0"
    />
</div>
</div>

            {/* Right Section */}
            <div className="w-1/3 px-4">
                {/* Featured Image Input */}
                <div className="relative mb-6">
                    <input
                        type="file"
                        id="image"
                        placeholder="Upload featured image"
                        className="peer w-full bg-gray-800 text-gray-300 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:border-indigo-400 transition duration-300"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    <label
                        htmlFor="image"
                        className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-sm peer-focus:text-indigo-500"
                    >
                      
                    </label>
                </div>

                {/* Image Preview */}
                {post && (
                    <div className="w-full mb-6">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                )}

                {/* Status Select */}
<div className="relative mb-6">
    <label
        htmlFor="status"
        className="block mb-2 text-sm font-medium text-gray-400"
    >
        Status
    </label>
    <select
        id="status"
        className="w-full bg-gray-800 text-gray-300 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:border-indigo-400 transition duration-300"
        {...register("status", { required: true })}
    >
        <option value="active" className="bg-gray-800 text-gray-300">
            Active
        </option>
        <option value="inactive" className="bg-gray-800 text-gray-300">
            Inactive
        </option>
    </select>
</div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-indigo-500"}
                    className="w-full py-3 
                    cursor-pointer
                    text-sm font-medium text-gray-100 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}