const express = require('express');
const app = express();
const axios = require("axios")
const cors = require("cors")
app.use(cors())
app.use(express.json());


async function getLocationName(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'LocationTracker' } 
        });
        const { address } = response.data;
        console.log("Address:", address);
        return address;
    } catch (error) {
        console.error("Geocoding error:", error.message);
        return null;
    }
}



app.post('/log', async(req, res) => {
    console.log("Received location:", req.body);
    const {lat, lng} = req.body;
    const location = await getLocationName(lat, lng)
    console.log(location);
    
    res.sendStatus(200);
});

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Server running on port", port);
    
});