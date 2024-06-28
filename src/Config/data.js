import mongoose from "mongoose";

function Dbconnect(){

    if(mongoose.connection >= 1){
        console.log("already connected")
        return
    }

    mongoose.connect("mongodb://127.0.0.1:27017/user")



}


export default Dbconnect;