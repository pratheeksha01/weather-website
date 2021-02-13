const path=require('path')
const express=require('express')
const hbs=require('hbs')
const { title } = require('process')
const geocode = require('../../weatherapp/utils/geocode')
const forecast = require('../../weatherapp/utils/forecast')

const app= express()
const port= process.env.PORT||3000

//define paths for express config
const PublicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//set up static directory to serve
app.use(express.static(PublicDirectoryPath))
//set up handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        name:'pratheeksha',
        title:'weather app'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'pratheeksha',
        title:'weather app'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'some helpful text',
        title:'help',
        name:'pratheeksha'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an addess'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })

    })
  
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:'pratheeksha',
        title:'error page',
        errormessage:'page not found'
    })
})

app.listen(port,()=>{
    console.log('server is starting')
})