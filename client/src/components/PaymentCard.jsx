import React, {useEffect, useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

let PaymentCard=({
     product,childToParent
                 })=>{
    // const [product,setProduct] = useState({
    //     name:"",
    //     price:10,
    //     prooductBy:"ELMALAAB"
    // });
    const [output,setOutput]=useState("")

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
            .then((data)=>{
                // console.log(data);
                childToParent(token)
            })
            .catch((err)=>{
                console.log(err)
            })



    }

    useEffect(()=>{


    })


    return (
        <div>
            <StripeCheckout
                token={makePayment}
                stripeKey="pk_test_51LMaQlGTWFnAgsr5Ajkh5kgPLm1KLYAkXKm40JYiZs8pX5y9JgdrJ2MlcLtLlWrCVPve1bzbc4Gd130X71WcMprg00TK0rcQtK"
                name="Buy"
                amount={product.price*0.0528853*100}
            >

               <button   className="btn-lg btn-primary p-2 "> Buy </button>

            </StripeCheckout>
        </div>
    );
}


export default PaymentCard;
