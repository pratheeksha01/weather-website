const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=d0ada2e93073bdba87f9e4ddf11414fd&query='+latitude+','+longitude+'&units=m'

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to internet",undefined)
        }else if(body.error){
            callback("unable to find location",undefined)
        }else{
        callback(undefined,'It is currently '+body.current.temperature+' degrees out.It feels like '+body.current.feelslike+' degrees out.');
        }
    })
}
module.exports=forecast