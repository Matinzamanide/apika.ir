import { IChildren } from "@/Types/Types";

const Container :React.FC<IChildren> = ({children}) => {
    return ( 
        <div className="mx-auto w-[90%]">
            {children}
        </div>
     );
}
 
export default Container;