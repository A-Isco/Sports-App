const stripe=require("stripe")("sk_test_51LMaQlGTWFnAgsr5dwZFnsDCRycMLfe5Q8sisAFYuk9I1vmIHA1D5wHjmjAr3AyEZSvm2Mtry5o25EwGU8Mkcn6V00gd0RQKH6")
const { v4: uuidv4 } = require('uuid');
const {custom} = require("joi");
const chargePayment=async (req,res)=>{
  try {
    const {product,token}=req.body;
    // console.log("product:",product);
    // console.log("price:",product.price);
    // console.log(req.body)
    return stripe.customers.create({
      email:token.email,
      source:token.id

    }).then(customer=>{
      // console.log("customer",customer);
      // console.log("token",token.id)
      stripe.charges.create({
        amount:product.price*100,
        currency:'usd',
        customer:customer.id,
        description:product.name,
        receipt_email:token.email,
      })
      return customer;
    }).then(result=> {res.status(200).json(result)
      console.log("hhhhh",token.email)
            //booking
      console.log(token.id)
  })
        .catch(err=>console.log(err))

  }
  catch (error){
    console.log("error",error)

  }
};
module.exports={
  chargePayment

}
