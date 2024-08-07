import { defineStore } from "pinia";
import { auth } from '@/stores/firebase.js';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';

export const useUserStore = defineStore('user',()=>{
    const user = ref(null);
    // const isAuthenticated = ref(false);
    // const roles = ref([]);
    
    //登入
    const login = async(email,password) => {
        try{
            const userDetail = await signInWithEmailAndPassword(auth,email,password);
            user.value = userDetail.user;
        }catch(error){
            console.log(error);
            throw error;
        }
    };

    //登出
    const logout = async() => {
        try{
            await signOut(auth);
            user.value = null;
        }catch(error){
            console.log(error);
        }
    };

    //註冊
    const register = async(email,password) => {
        try{
            const regDetail = await createUserWithEmailAndPassword(auth,email,password);
            console.log(regDetail);
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    return{
        login,
        logout,
        register
    }
})