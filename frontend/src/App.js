import Layout from "./components/Layout/Layout";
import  {PayPalScriptProvider} from "@paypal/react-paypal-js";

function App() {
    return(
        <PayPalScriptProvider options={{"client-id" : process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
    <Layout />
        </PayPalScriptProvider>
    )}

export default App;
