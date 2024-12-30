import "./App.css";
import ClientDtails from "./components/ClientDtails";
import ClientsForm from "./components/ClientsForm";
import { ToastContainer } from "react-toastify";
import ClientsProvider from "./context/clientContext";

function App() {
  return (
    <ClientsProvider>
      <div className="container">
        <div className="row">
          <div className="col">
            <ClientsForm />
          </div>
          <div className="col">
            <ClientDtails />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ClientsProvider>
  );
}

export default App;
