const stripe=require("stripe")("sk_test_51LMi6TKKFK8Inq32lMnO6GjkFl7GwPU7mga770q2lsblwXlkDsZBDQ7ypz2dmqKsYbSSJKcCCIsoRjXzgce1PXSz00qpisbQms")
const { v4: uuidv4 } = require('uuid');
const {custom} = require("joi");
const chargePayment=async (req,res)=>{
  try {
    const {product,token}=req.body;
    console.log("product:",product);
    console.log("price:",product.price);
    const idempontencyKey=uuidv4( );
    return stripe.customers.create({
      email:token.email,
      source:token.id

    }).then(customer=>{
      console.log("customer",customer);
      stripe.charges.create({
        amount:product.price*100,
        currency:'usd',
        customer:customer.id,
        description:product.name
      })
    }).then(result=>res.status(200).json(result  ))
        .catch(err=>console.log(err))

  }
  catch (error){
    console.log("error",error)

  }
};
module.exports={
  chargePayment

}
