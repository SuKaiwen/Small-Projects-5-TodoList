import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {
  const {state, setState} = useState({
    "todo":{
        title: "Todo",
        items: []
    },
    "in-progress":{
        title:"In Progress",
        items: []
    },
    "on-hold":{
        title:"On Hold",
        items:[]
    },
    "finished":{
        title:"Finished",
        items: []
    },
    "questions":{
        title:"Questions",
        items:[]
    }
  });

  return (
    <div className="App">
      <h1>Todo List</h1>
    </div>
  );
}

export default App;
