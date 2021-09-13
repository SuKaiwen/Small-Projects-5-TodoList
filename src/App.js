import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import _ from "lodash";

const item = {
    id:"13012",
    name: "nxxxx",
}

const item2 = {
    id:"123",
    name: "pepe",
}

const item3 = {
    id:"12324",
    name: "pepe33",
}

function App() {
  const [text, setText] = useState();
  const [assigned, setAssigned] = useState();
  const [assignedBy, setAssignedBy] = useState();
  const [group, setGroup] = useState();

  const [state, setState] = useState({
    "todo":{
        title: "Todo",
        items: [item, item3]
    },
    "in-progress":{
        title:"In Progress",
        items: [item2]
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

  const handleDragEnd = ({destination, source}) => {
    if(!destination){
        return;
    }
    if(destination.index === source.index && destination.droppableId === source.droppableId){
        return;
    }

    const copy = {...state[source.droppableId].items[source.index]};
    setState(prev => {
        prev={...prev};
        prev[source.droppableId].items.splice(source.index, 1);
        prev[destination.droppableId].items.splice(destination.index, 0, copy);
        return prev;
    })
  }

  const addItem = () => {
    setState(prev => {
        return {
            ...prev,
            todo: {
                title:"title",
                items:[
                {
                    id:"1234",
                    name: text
                },
                ...prev.todo.items]
            }
        }
    })

    setText("");
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
          <input type="text" placeholder="Name..." value={text} onChange={(e) => setText(e.target.value)} />
          <input type="text" placeholder="To..." value={text} onChange={(e) => setAssigned(e.target.value)} />
          <input type="text" placeholder="From..." value={text} onChange={(e) => setAssignedBy(e.target.value)} />
          <input type="text" placeholder="Group..." value={text} onChange={(e) => setGroup(e.target.value)} />
          <button onClick={addItem}>Add</button>
        </div>
      <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
            return (
                <div key = {key} className="column">
                    <h3>{data.title}</h3>
                    <Droppable droppableId={key}>
                        {(provided)=>{
                            return(
                                <div ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={"droppable-col"}
                                >
                                    {data.items.map((x, index) => {
                                        return (
                                            <Draggable key={x.id} index={index} draggableId={x.id}>
                                                {(provided) => {
                                                    return(
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="item"
                                                        >
                                                            <p>{x.name}</p>
                                                        </div>

                                                    )
                                                }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                </div>
            )
        })}
      </DragDropContext>
      </div>
    </div>
  );
}

export default App;
