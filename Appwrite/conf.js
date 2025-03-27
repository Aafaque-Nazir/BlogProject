import config from "../config/config";
import {Client , ID , Databases , Storage, Query} from "appwrite";

export class Service{
    client = new  Client();
    database;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }
    async createPost({title, slug,content , featuredImage, status , userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )

        } catch (error) {
            throw error
            
        }
}
    async updatePost(slug, {title,content , featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            ) 
        } catch (error) {
            throw
        }
    }
    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
                return true

        } catch (error) {
            throw error
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }
    async getPosts(queires =[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queires,
            )
        } catch (error) {
            throw error
            return false
        }
    } 
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteStorageId,
                ID.unique(),
                file,
            )
        } catch (error) {
            throw error
            return false
        }
    }
    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                config.appwriteStorageId,
                fileId
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }
    getfilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteStorageId,
            fileId
        )
    }
}


const service = new Service
export default service