import mongoose from "mongoose";

function Dbconnect(){

    if(mongoose.connection >= 1){
        console.log("already connected")
        return
    }

    mongoose.connect("mongodb+srv://abc:abc@nextjs.f8zywv0.mongodb.net/Testing?retryWrites=true&w=majority&appName=Nextjs")

}


export default Dbconnect;