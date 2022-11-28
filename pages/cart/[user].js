import { useRouter } from "next/router";

const Cart = () => {
    const router = useRouter()
    return (
        <div>
            &nbsp;id: {router.query.user}
        </div>
    );
}

export default Cart;