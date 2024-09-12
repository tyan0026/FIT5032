<template>
    <div class="form-container">
      <h1>Sign Out</h1>
      <p><button @click="signout">Sign Out from Firebase</button></p>
    </div>
  </template>
  
  <script setup>
  import { getAuth, signOut } from "firebase/auth"
  import { useRouter } from "vue-router"
  
  const router = useRouter()
  const auth = getAuth()
  
  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully!")
        router.push("/Firelogin") 
        console.log(auth.currentUser)
      })
      .catch((error) => {
        console.log("Error signing out:", error)
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