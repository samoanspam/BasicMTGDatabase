import {initializeApp} from "/firebase/app";
import {getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc} from "/firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAPhlkCtcp2IIvEcHJQIce5Wp_rB5BXO5M",
    authDomain: "simple-cloud-database.firebaseapp.com",
    projectId: "simple-cloud-database",
    storageBucket: "simple-cloud-database.appspot.com",
    messagingSenderId: "967713993934",
    appId: "1:967713993934:web:69bab2e158ee88d655cc9f",
    measurementId: "G-PYRZTZL2D4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add Card Function
document.getElementById('addCard').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const manaCost = document.getElementById('manaCost').value;
    const power = document.getElementById('power').value;
    const toughness = document.getElementById('toughness').value;
    const type = document.getElementById('type').value;
    const subtype = document.getElementById('subtype').value;
    const set = document.getElementById('set').value;
    const rarity = document.getElementById('rarity').value;
    const text = document.getElementById('text').value;


    try {
        const docRef = await addDoc(collection(db, "Cards"), {
            name,
            manaCost,
            power,
            toughness,
            type,
            subtype,
            set,
            rarity,
            text

        });
        console.log("Document written with ID: ", docRef.id);
        
        loadCards(); // Refresh the card list

    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Update Card Function
document.getElementById('updateCard').addEventListener('click', async () => {
    const id = document.getElementById('updateId').value;

    const newName = document.getElementById('updateName').value;

    const cardRef = doc(db, "Cards", id);

    await updateDoc(cardRef, {
        name: newName
    });

    loadCards(); // Refresh the card list
});

// Delete Card Function
document.getElementById('deleteCard').addEventListener('click', async () => {
    const id = document.getElementById('deleteId').value;

    await deleteDoc(doc(db, "Cards", id));

    loadCards(); // Refresh the card list
});

// Load Cards Function
async function loadCards() {
    const cardList = document.getElementById('cardList');
    
    cardList.innerHTML = ""; // Clear the list

    const querySnapshot = await getDocs(collection(db, "Cards"));
    
    querySnapshot.forEach((doc) => {
        const li = document.createElement('li');
        li.textContent = `${doc.id}: ${doc.data().name}`;
        cardList.appendChild(li);
    });
}

// Initial Load
loadCards();