import config from "../config/config";
import {Client , Account , ID} from "appwrite";
import { v4 as uuidv4 } from 'uuid';

export class AuthService{
    client = new  Client();
    account;

    constructer(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount ({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if (userAccount){  
                return this.login({email,password})
            }
            else{
                return userAccount
            }
            
        } catch (error) {
            throw error
            
        }
    }

    async login({email,password}){
    try {
        return await this.account.createsession(email,password)
        
    } catch (error) {
        throw error
    }
}
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
        return null;
    }
    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authservice = new AuthService ()
export default authservice