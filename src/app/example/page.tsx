'use client'
import NewProductForm from "@/components/AddProductForm/AddProductForm";
import axios from "axios";
import { useEffect } from "react";
import LoadingApika from "../loading";
const Example = () => {
    useEffect(()=>{ 
        axios.get("https://apika.ir/apitak/get_products.php")
.then(res=>{
            console.log(res.data);
        })
    },[])
    return ( 
        <div className="">
            <NewProductForm/>
            {/* <NewestProduct/> */}
            <LoadingApika/>
           
        </div>
     );
}
 
export default Example;