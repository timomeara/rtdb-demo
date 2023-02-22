import {useState, useEffect} from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";


import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyDCjrP9MUcP_32ec_BycK753XtR0g4InwY",
  authDomain: "eb-demo-b042c.firebaseapp.com",
  databaseURL: "https://eb-demo-b042c-default-rtdb.firebaseio.com",
  projectId: "eb-demo-b042c",
  storageBucket: "eb-demo-b042c.appspot.com",
  messagingSenderId: "1044929899930",
  appId: "1:1044929899930:web:6752869f94c694dab7de23"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userId = 'e2092bcd-87c9-4bf6-8f2d-b00c64d23874';


function App() {

  const [messages, setMessages] = useState();
  const [value, setValue] = useState();

  useEffect(()=>{
    getData();
  },[])


  const getData = () => {
    const notificationsRef = ref(db, `notifications`);
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(data);
    });
  };



  const createUserMessage = () => {
    const db = getDatabase();
    push(ref(db, `notifications/${userId}/`), {
      id: Date.now(),
      message: value,
    });
  }

  const removeMessage = (id) => {
    remove(ref(db, `notifications/${userId}/${id}/`));
  };



  return (
    <div className="App">
    <div>
      <button onClick={getData}>getData</button>
      <button onClick={createUserMessage}>createUserMessage</button>
      <input onChange={(e)=>{setValue(e.target.value)}}/>
    </div>
      {messages &&
          <div>messages: {
            Object.entries(messages[userId]).map(e => {
              return <p>{JSON.stringify(e[1])}
                <button onClick={() => {
                  removeMessage(e[0])
                }}>delete
                </button>
              </p>
            })


          }</div>
      }
    </div>
  );
}

export default App;
