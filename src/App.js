import { FormControl, IconButton, Input, InputLabel } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

function App() {

  const [input, setInput] = useState(''); //it will remember the input field
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  
  console.log(input);
  console.log(messages);

  // useState = variable in react. like a short term memory, can change the data without refreshing.
  // useEffect = run code based on a condition.

  useEffect(() => {
    // run code here...
    // if its blank inside [], this code runs ONCE when the app component loads or page loads.
    // if we have a variable like input, it runs everytime input changes.

    // const username = prompt('Please enter your name'); or 
    setUsername(prompt('Please enter your name'));
  }, []) // condition

  useEffect(() => {
    // pulling the data from firebase firestore
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])

  const sendMessage = (event) => {
    //all the logic to send a message
    event.preventDefault();

    // pushing the data in firebase
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setMessages([
    //   ...messages, {username: username, text: input}
    // ]);  //will add the 'input' message at the end of the array, without '...message', array will over write by the input.
    setInput('');
  }

  return (
    <div className="App">
      <img src = "https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" 
        alt = ""
      />
      <h1>Hello React</h1>
      <h2>Welcome {username}</h2>

      {/* to make work the enter button use form and button type 'submit', but it will refresh the page for every enter hit. use 'event.preventDefault()' in sendMessage to stop the page from refreshing */}
      {/* disabled = {!input} in button is used to avoid the empty input like hitting 'space' */}
      <form className = "app__form">
        <FormControl className = "app__formControl">
          <InputLabel>Enter a message...</InputLabel>
          <Input className = "app__input" placeholder = 'Enter a message...' value = {input} onChange = {event => setInput(event.target.value)} />
          <IconButton className = "app__iconButton" disabled = {!input} variant = 'contained' color = 'primary' type = 'submit' onClick = {sendMessage}>  
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      
      {/* messages themselves  */}
      {/* using key for react-flip-move, so that changes only made in current message without effecting the previous messages. */}
      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key = {id} username = {username} message = {message} />
          ))
        }
      </FlipMove>
      
    </div>
  );
}

export default App;
