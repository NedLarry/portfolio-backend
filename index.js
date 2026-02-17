require('dotenv').config();
const express = require('express');
const cors = require('cors');
var app = express();

app.use(cors({
    origin: "*"
}))



function FormulateImgElement(pd) {
    dataObject = [];
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
        var dataObject = [];
        for(let i = 0; i < data.length; i++){
            if(data[i].id == '1012905963' || data[i].id == '1158540099' || data[i].id == '1159488241') continue;
            dataObject.push({Id: data[i].id, name: data[i].name, html_url: data[i].html_url, description: data[i].description});
        }
        res.send(dataObject);
    }).catch(error => console.error('Error:', error));

})

module.exports = {app}

//app.listen(process.env.port || 3000, () => console.log("app is live"));