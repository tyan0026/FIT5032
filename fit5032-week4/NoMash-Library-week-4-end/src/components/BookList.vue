<template>
    <div>
        <h1>
            Books with ISBN > 1000
        </h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}

                <button @click="deleteBook(book.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id));  
        books.value = books.value.filter(book => book.id !== id);  
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting books: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      deleteBook
    };
  }
};
</script>
