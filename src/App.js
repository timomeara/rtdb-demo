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



  const createNotification = () => {
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
      <h3>Firebase Realtime Database (fbrtdb) Demo</h3>
      <p>
        This demo shows a react web application connecting to a fbrtdb and getting data updates in real time.
        <br/>All the "Notifications" shown below are coming from a <a href={"https://firebase.google.com/docs/database"}>fbrtdb</a>.
        <br/>The page starts an <a href={"https://firebase.google.com/docs/reference/js/database?authuser=0#onvalue_3"}>onValue</a> listener that connects to a reference node in the db and responds to any changes below that node.
        <br/>Put some text in the input box and click "createNotification" to add a new "notification".
        <br/>Use "delete" to delete one.
        <br/>View the source here: <a href={"https://github.com/timomeara/rtdb-demo"}>https://github.com/timomeara/rtdb-demo</a>
      </p>
    <div>
      <button onClick={createNotification} disabled={!value}>createNotification</button>
      <input onChange={(e)=>{setValue(e.target.value)}}/>
    </div>
      <div>
      {messages &&
          <div><h4>notifications:</h4> {
            Object.entries(messages[userId]).map(e => {
              return <p>{JSON.stringify(e[1])} --
                <button onClick={() => {
                  removeMessage(e[0])
                }}>delete
                </button>
              </p>
            })


          }</div>
      }
      </div>
    </div>
  );
}

export default App;
