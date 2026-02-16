require('dotenv').config();
const express = require('express');

var app = express();

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
            'Authorization': process.env.github_token,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).then(response => response.json()).then(data => {
        data.forEach(FormulateImgElement)
        res.send(dataObject);
    }).catch(error => console.error('Error:', error));

})

app.listen(3000, () => console.log("app is live"));