<template>
    <div>
      <h1>Books with ISBN > 1000</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          <div v-if="editingBook === book.id">
            <input v-model="updatedName" placeholder="Update Name" />
            <input v-model="updatedIsbn" placeholder="Update ISBN" />
            <button @click="updateBook(book.id)">Save</button>
          </div>
          <div v-else>
            {{ book.name }} - ISBN: {{ book.isbn }}
            <button @click="startEdit(book)">Edit</button>
            <button @click="deleteBook(book.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import db from '../firebase/init.js';
  import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
  
  export default {
    setup() {
      const books = ref([]);
      const editingBook = ref(null);
      const updatedName = ref('');
      const updatedIsbn = ref('');
  
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
          console.error('Error deleting book: ', error);
        }
      };
  
      const startEdit = (book) => {
        editingBook.value = book.id;
        updatedName.value = book.name;
        updatedIsbn.value = book.isbn;
      };
  
      const updateBook = async (id) => {

        const bookRef = doc(db, 'books', id);
        try {
          await updateDoc(bookRef, {
            name: updatedName.value,
            isbn: Number(updatedIsbn.value)
          });
          alert('Book updated successfully!');
        } catch (error) {
          console.error('Error updating book: ', error);
        }
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
        editingBook,
        updatedName,
        updatedIsbn,
        deleteBook,
        startEdit,
        updateBook
      };
    }
  };
  </script>
  