<template>
    <div class="form-container">
      <h1>Create an Account</h1>
      <p><input type="text" placeholder="Email" v-model="email"/></p>
      <p><input type="password" placeholder="Password" v-model="password"/></p>
      <p><button @click="register">Save to Firebase</button></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
  import { useRouter } from "vue-router"
  const email = ref("")
  const password = ref("")
  const router = useRouter()
  const auth = getAuth()
  const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        console.log("Firebase Register Successful!")
        router.push("/FireLogin")
      }).catch((error) => {
        console.log(error.code)
      })
  }
  </script>
  
  <style scoped>
  
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center; 
  }
  
  input {
    margin: 10px;
    padding: 10px;
    width: 200px; 
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369b6e;
  }
  </style>
  