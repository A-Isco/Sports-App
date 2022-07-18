import React, {useEffect, useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

let PaymentCard=({
    // product
                 })=>{
    const [product,setProduct] = useState({
        name:"",
        price:10,
        prooductBy:"ELMALAAB"
    });

    const makePayment=token=>{
        const body ={
            token,
            product
        }
        const headers={
            "content-Type":"application/json"
        }
        return  axios.post("http://localhost:4000/charge/",JSON.stringify(body),{headers}).then((response)=>{
            console.log("response",response)
            const {status}=response;
            console.log("status",status);

        })
            .then((data)=>{console.log(data);})
            .catch((err)=>{
                console.log(err)
            })



    }

    useEffect(()=>{


    })


    return (
        <div>
            <a
                className="App-link"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
            >
               Pay
            </a>
            <StripeCheckout
                token={makePayment}
                stripeKey="pk_test_51LMi6TKKFK8Inq32cekQ9ASjQgnbQEvoIGyW8G6tbM0J8fCOKyH9BrLuMYm4P7tYL5tWTmn2wquRlvGJMDj8q38b00olnPxdvt"
                name="Buy"
                amount={product.price*100}
            >

               <button   className="btn-lg btn-primary "> Buy </button>

            </StripeCheckout>
        </div>
    );
}


export default PaymentCard;
