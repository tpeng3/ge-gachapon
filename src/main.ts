import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "./index.css";
import Counter from "./Counter";
import { initializeApp } from "firebase/app";
import Listeners from "./Listeners";

const firebaseConfig = {
  apiKey: "AIzaSyCYA0M1UST2OhzV2Ftc5srchy_6khARJWs",
  authDomain: "gachapon-81649.firebaseapp.com",
  projectId: "gachapon-81649",
  storageBucket: "gachapon-81649.appspot.com",
  messagingSenderId: "23044919854",
  appId: "1:23044919854:web:1848c94c3536da4acdc5bf",
  databaseURL: "https://gachapon-81649-default-rtdb.firebaseio.com",
};

initializeApp(firebaseConfig);
createApp(App).mount('#app')
