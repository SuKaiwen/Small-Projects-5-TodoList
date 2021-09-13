import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import _ from "lodash";
import {v4 as uuidv4} from 'uuid';
import background from './images/background.jpg';

const item = {
    id:uuidv4(),
    name: "Finish designs",
    desc: "Finish all user page UX UI designs for the new up and coming Android App...",
    to: "John",
    from: "Mark",
    group:"Design",
}

const item2 = {
    id:uuidv4(),
    name: "Code landing page",
    desc: "Create landing page for the new website, ensure you follow the UI/UX of the designs!",
    to: "James",
    from: "Willhem",
    group:"Frontend",
}

const item3 = {
    id:uuidv4(),
    name: "Code home page",
    desc: "Finish programming homepage and all link/router interactions...",
    to: "William",
    from: "Mark",
    group:"Frontend",
}

const item4 = {
    id:uuidv4(),
    name: "Code user interactions",
    desc: "Finish all user interactions including changing user details, viewing a profile and following another user",
    to: "John",
    from: "Mark",
    group:"Backend",
}

function App() {
  const [name, setName] = useState();
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
        title:"To Review",
        items: [item4]
    },
    "questions":{
        title:"Finished",
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
    if(!text || text.trim().length === 0 ||
       !name || name.trim().length === 0 ||
       !assigned || assigned.trim().length === 0 ||
       !assignedBy || assignedBy.trim().length === 0 ||
       !group || group.trim().length === 0){
        return
    }
    setState(prev => {
        return {
            ...prev,
            todo: {
                title:"title",
                items:[
                {
                    id:uuidv4(),
                    name: name,
                    desc: text,
                    to: assigned,
                    from: assignedBy,
                    group: group,
                },
                ...prev.todo.items]
            }
        }
    })

    setText("");
    setName("");
    setGroup("");
    setAssigned("");
    setAssignedBy("");
  }

  return (
    <div >
      <img src = {background} style = {{width:"100%", height:"100vh"}}alt = "title" />

      <div style={{position:"absolute", top:"0%", left:"0%", display:"flex", justifyContent:"space-between", width:"100%", padding:"8px"}}>
          <h5 style={{color:"white"}}>Todo Lists</h5>
          <div>
              <input type="text" placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder="Description" value={text} onChange={(e) => setText(e.target.value)} />
              <input type="text" placeholder="To..." value={assigned} onChange={(e) => setAssigned(e.target.value)} />
              <input type="text" placeholder="From..." value={assignedBy} onChange={(e) => setAssignedBy(e.target.value)} />
              <input type="text" placeholder="Group..." value={group} onChange={(e) => setGroup(e.target.value)} />
              <button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={addItem}>Add</button>
          </div>
      </div>
      <div className="App" style={{position:"absolute", top:"15%", left:"0%"}}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
            return (
                <div key = {key} className="column">
                    <h5>{data.title}</h5>
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
                                                            <div class="card">
                                                              <h5 class="card-header"><p>{x.name}</p></h5>
                                                              <h5 class="card-title badge badge-warning" style={{color:"white"}}>{x.group}</h5>
                                                              <div class="card-body">
                                                                <h5 class="card-title badge badge-primary">Assigned to {x.to}</h5>
                                                                <h5 class="card-title badge badge-success"> by {x.from}</h5>
                                                                <p class="card-text">{x.desc}</p>
                                                              </div>
                                                            </div>
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
