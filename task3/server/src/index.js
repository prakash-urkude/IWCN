const express = require('express');
const cors = require('cors');
const axios = require('axios')
const app = express();
app.use(cors());
app.use(express.json());


////////////////----- create api-----/////////////////////////////////////////////

app.post('/task3', (req, res) => {
const url = 'https://chimpu.xyz/api/post.php';
const {phonenumber} = req.body;
console.log(phonenumber)
axios.post(url, { phonenumber })
.then(response => {
  console.log("mast h")
    // console.log(response.headers)
    return res.status(200).send({status:true,headerData: response.headers.phoneorigen,date: response.headers.date, data:response.data.msg});       //
})
.catch(error => {
    console.log("error h")
    return res.status(500).send({error: error});    
});
})



app.listen(3005, () => {
  console.log('Server listening on port 3005');
});
