import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import _ from "lodash";

const item = {
    id:"13012",
    name: "nxxxx",
    desc: "desc",
    assignedTo: "Mark",
    assignedBy: "John"
}

const item2 = {
    id:"123",
    name: "pepe",
    desc: "esc",
    assignedTo:"peter",
    assignedBy: "John",
}

const item3 = {
    id:"12324",
    name: "pepe33",
    desc: "esc",
    assignedTo:"peter",
    assignedBy: "John",
}

function App() {
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

  return (
    <div>
      <h1>Todo List</h1>
      <div className="App">
      <DragDropContext onDragEnd={e => console.log(e)}>
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
                                                            <h1>{x.name}</h1>
                                                            <p>{x.desc}</p>
                                                            <p>Assigned to: {x.assignedTo}</p>
                                                            <p>Assigned by: {x.assignedBy}</p>
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
