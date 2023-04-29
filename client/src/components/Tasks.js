import React from 'react';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";


const TaskCard = ({ id, title, description, onDelete }) => {
  const handleDeleteReview = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:8800/deleteTask/${id}`);
      console.log(data);
      if (data?.status) {
        onDelete(id);
        window.alert("Task Deleted");
      }
    } catch (error) {
      window.alert(error);
    }
  };

  return (
   <> 
  <div className="flex ">
    <div className=" min-w-mt border-2 border-black rounded-md bg-yellow-200 shadow-md m-2 p-4 py-5">
      <div className=" d-flex justify-content-between  py-2">
        <div>
          <h2 className="text-lg font-semibold py-2">{title}</h2>
        </div>
        <div>
          <h2 className="mt-2 py-2">{description}</h2>
        </div>
        <button className="bg-red-500 text-white py-1 px-2 rounded-md" onClick={handleDeleteReview}>Delete</button>
      </div>
      
    </div>
    
  </div>
</>


  );
};

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:8800/allTask");
      console.log(data.data)
      if (data?.status) {
        setTasks(data.data);
      }
    } catch (error) {
      window.alert(error);
    }
  };

  const handleDeleteTask = (id) => {
    const newTasks = {};
    for (const key in tasks) {
      if (tasks[key].id !== id) {
        newTasks[key] = tasks[key];
      }
    }
    setTasks(newTasks);
  }

  React.useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className='max-w-700 flex justify-center gap-5'>
       {Object.values(tasks).map(task => (
        <Card variant="outlined">
          <TaskCard
            id={task.id}
            title={task.title}
            description={task.description}
            onDelete={handleDeleteTask}
          />
        </Card>
      ))}
    </div>
  );
};

export default Tasks;
