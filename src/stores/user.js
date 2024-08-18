import { defineStore } from "pinia";
import { auth } from '@/stores/firebase.js';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';

export const useUserStore = defineStore('user',()=>{
    const user = ref(null);
    
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
            console.log(user.value);
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
            if (error.code === 'auth/email-already-in-use') {
                console.log('This email is already in use.');
                throw new Error('This email is already registered. Please use a different email.');
            } else {
                console.log(error);
                throw error;
            }
        }
    }

    const checkAuthState = () => {
        console.log('auth');
        onAuthStateChanged(auth,(userInfo)=>{
            if(userInfo){
                user.value = userInfo;
                console.log(user.value);
            }else{
                user.value = null;
            }
        })
    }
    
    return{
        user,
        login,
        logout,
        register,
        checkAuthState
    }
})