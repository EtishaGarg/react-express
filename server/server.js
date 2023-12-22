const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./utils/db")
const Series = require("./models/seriesModel")

app.use(cors());
app.use(express.json())

connectDB();


app.get('/api/youtube', (req,res) => {
    res.json({like: "Like the video", subscribe: "Subscribe to Etisha Garg channel for more such videos"});
})

app.post('/api/series', async(req, res)=> {
    // console.log(req.body)
    try {
        const series = await Series.create(req.body)

        res.status(200).json({
            success:true,
            series
        })

    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.get('/api/series', async(req, res)=> {
    try {
        const series = await Series.find()

        res.status(200).json({
            success:true,
            series
        })

    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.get('/api/series/:id', async(req, res)=> {
    try {
        const series = await Series.findById(req.params.id)

        if(!series){
            return res.status(404).json({message: `Series with the ID: ${req.params.id} doesn't exist`})
        }

        res.status(200).json({
            success:true,
            series
        })

    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.patch('/api/series/:id', async(req, res)=> {
    try {
        const series = await Series.findByIdAndUpdate(req.params.id,req.body)

        if(!series){
            return res.status(404).json({message: `Series with the ID: ${req.params.id} doesn't exist`})
        }

        const updatedSeries = await Series.findById(req.params.id)

        res.status(200).json({
            success:true,
            updatedSeries
        })

    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.delete('/api/series/:id', async(req, res)=> {
    try {
        const series = await Series.findByIdAndDelete(req.params.id)

        if(!series){
            return res.status(404).json({message: `Series with the ID: ${req.params.id} doesn't exist`})
        }

        res.status(200).json({
            success:true
        })

    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})



const port = 8000

app.listen(port, () => console.log(`Server started on the port ${port}`))