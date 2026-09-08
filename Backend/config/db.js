import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://artiambre23_db_user:arti2305@cluster0.ho79weo.mongodb.net/Food-Order').then(()=>console.log("DB Connected"));
    
}