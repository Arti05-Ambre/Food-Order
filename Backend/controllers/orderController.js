import orderModel from "../models/orderModel.js";
import UserModel from "../models/UserModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//placing user order from frontend
const placeOrder =  async (req,res) =>{

    try {
        const newOrder =  new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
         await newOrder.save();
         await UserModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

         const line_items = req.body.item.map(()=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },

quantity:item.quantity
         }))


         line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1


         })
    } catch (error) {
        
    }

}

export{placeOrder}