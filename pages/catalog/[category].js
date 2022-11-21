import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore } from "../../components/storeContext";

const Category = () => {
    const router = useRouter()
    const {category} = router.query
    const store = useStore()
    store.allData.filter((e)=>e.category_name == category)
    return (
        <div>
            {}
        </div>
    );
}

export default observer(Category);