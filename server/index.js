const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'task2',
  insecureAuth : true,
});

////////////////----- create api-----/////////////////////////////////////////////
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
// console.log(req.body)
  
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const q = 'INSERT INTO task2Table (title, description) VALUES (?, ?)';
  const values = [title, description];

  db.query(q, values, (err, data) => {
    if (err) {
      // console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
    return res.status(200).json({status:true, data: data, message: 'task added successfully' });
  });
});

/////////////////////////////////----- get all task api-----/////////////////////////////////////////////
app.get("/allTask", async function (req, res) {

  try {
// console.log("lollllalalaalalala")
      const findTask = `SELECT * FROM task2Table`;
      // console.log(findTask)
      let taskDetails = await new Promise((resolve, reject) => {
          db.query(findTask, (err, result) => {
              if (err) reject(err)

              if (result.length === 0)
                  return res.status(404).send({ status: false, message: "This task is not found Please provide a correct Id", });
              resolve({ ...result })
          })
      });

      if (taskDetails.length === 0) return res.status(404).send({ status: false, message: "task not found" })

      return res.status(200).send({ status: true, message: "Success", data: taskDetails })

  } catch (error) {
      return res.status(500).send({ status: false, message: error.message })

  }
})



/////////////////////////////////----- delete your task api-----/////////////////////////////////////////////
app.delete("/deleteTask/:Id", async function (req, res) {
  try {
    const taskId = req.params.Id;
    const findTask = `SELECT * FROM task2Table WHERE id = '${taskId}'`;

    let taskDetails = await new Promise((resolve, reject) => {
      db.query(findTask, (err, result) => {
        if (err) reject(err);

        if (result.length === 0) {
          return res.status(404).send({
            status: false,
            message: "This task is not found. Please provide a correct Id.",
          });
        }

        resolve({ ...result[0] });
      });
    });

    const deleteTaskQuery = `DELETE FROM task2Table WHERE id = ${taskId}`;

    db.query(deleteTaskQuery, (err, result) => {
      if (err) throw err;

      if (result.affectedRows === 0) {
        return res.status(404).send({
          status: false,
          message: "Task not found.",
        });
      }

      return res.status(200).send({
        status: true,
        message: "Task deleted successfully.",
      });
    });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
});




app.listen(8800, () => {
  console.log('Server listening on port 8800');
});
