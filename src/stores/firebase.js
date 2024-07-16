import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCqaF_7VDfdtsm6KgwXph5i1Jy5fAMMMEw",
    authDomain: "price-pos.firebaseapp.com",
    projectId: "price-pos",
    storageBucket: "price-pos.appspot.com",
    messagingSenderId: "541054694770",
    appId: "1:541054694770:web:005b188cfdc438fa4a19eb"
};

import { getFirestore, collection, getDocs, deleteDoc, where, query} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

//取得品項資料
const fetchProductData = async() => {
    const productsCollection = collection(db, "products");
    try {
        const products = [];
        await getDocs(productsCollection).then((res)=>{
            res.forEach((doc) => {
                products.push(doc.data());
            });
        })
        return products;
    } catch (error) {
        console.error("Error fetching data from 'products' collection: ", error);
        throw error;
    }
}
fetchProductData();

//取得顧客資料
const fetchCusData = async () => {
    const customersCollection = collection(db,"customers");
    try {
        const customers = [];
        await getDocs(customersCollection).then((res)=>{
            res.forEach((doc) => {
                customers.push(doc.data());
            });
        })
        return customers;
    } catch (error) {
        console.error("Error fetching data from 'customers' collection: ", error);
        throw error;
    }
}

//新增品項
const addProduct = () => {
    const colRef = collection(db,"products");
    return colRef;
}

//刪除品項
async function deleteProduct(item){
    const colRef = collection(db,"products");
    const q = query(colRef, where('name', '==', item));
    console.log(q);
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}
export { app, auth, fetchCusData, addProduct, deleteProduct,fetchProductData };