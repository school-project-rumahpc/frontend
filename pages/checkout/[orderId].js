import { useRouter } from "next/router";
import { useEffect } from "react";
// TODO: Details page
const OrderDetails = () => {
    const checkoutDetails = useCheckOutDetails()
    return (
        <div>
            Enter
        </div>
    );
}

export default OrderDetails;

const useCheckOutDetails=()=>{
    const router = useRouter()
    useEffect(() => {
    if(!router.isReady)return;
    console.log(router.query.orderId)
    }, [router.isReady])
    
}