require('dotenv').config();
const express = require('express');
const cors = require('cors');
var app = express();

app.use(cors({
    origin: "*"
}))

var dataObject = [];

function FormulateImgElement(pd) {
    dataObject.push({name: pd.name, html_url: pd.html_url, description: pd.description})
}
   
app.get('/', (req, res) => {
    
    fetch('https://api.github.com/users/nedlarry/repos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github+json',
            'Authorization': process.env.hub_token,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).then(response => response.json()).then(data => {
        data.forEach(FormulateImgElement)
        res.send(dataObject);
    }).catch(error => console.error('Error:', error));

})

app.listen(process.env.port || 3000, () => console.log("app is live"));