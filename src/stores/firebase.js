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

import { getFirestore, collection, getDocs, deleteDoc, where, query, doc} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const colPro = collection(db,"products");
const colCus = collection(db,"customers");

//取得品項資料
const fetchProductData = async() => {
    // const productsCollection = collection(db, "products");
    try {
        const products = [];
        await getDocs(colPro).then((res)=>{
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
// fetchProductData();

//取得顧客資料
const fetchCusData = async () => {
    // const customersCollection = collection(db,"customers");
    try {
        const customers = [];
        await getDocs(colCus).then((res)=>{
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


//刪除品項
async function deleteProduct(item){
    // const colRef = collection(db,"products");
    const q = query(colPro, where('name', '==', item));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}

//刪除顧客
async function deleteCustomer(num){
    const q = query(colCus, where('phone', '==', num));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}

//取得id
async function getID(item){
    // const colRef = collection(db,"products");
    const q = query(colPro, where('name', '==', item));
    const querySnapshot = await getDocs(q);
    let id = '';
    querySnapshot.forEach((doc) => {
        console.log(doc.ref.id);
        id = doc.ref.id;
    });
    return id;
}

//更新資料庫
function updateData(id){
    const docPro = doc(db,'products',id);
    console.log(docPro);
    return docPro;
};
export { app, auth, fetchCusData , deleteProduct, deleteCustomer, fetchProductData, getID, colPro, colCus, updateData };