import { IChildren } from "@/Types/Types";
import Footer from "../Footer/Footer";
import Header from "../Header/header";

const Layout :React.FC<IChildren> = ({children}) => {
    return ( 
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <Header/>
            {children}
            <Footer/>
        </div>
     );
}
 
export default Layout ;