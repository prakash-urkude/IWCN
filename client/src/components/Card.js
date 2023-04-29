import React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";

const handleDeleteReview = async () => {
  
  try {
    const { data } = await axios.get(`http://localhost:8800/deleteTask/${id}`);
    console.log(data.data)
    if (data?.status) {
      window.alert("Task Deleted");
    }
  } catch (error) {
    window.alert(error);
  }
};

const TaskCard = ({ id, title, description, date, time }) => (
  <React.Fragment>
  <div className=" w-60 border-2 border-black rounded-md bg-yellow-200 shadow-md m-2 p-4">
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {date} {time}
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={handleDeleteReview} size="small">Delete</Button>
    </CardActions>
  </div>
</React.Fragment>

);

export default TaskCard;
