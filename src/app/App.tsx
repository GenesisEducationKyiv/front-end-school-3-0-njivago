import { ModalProvider, Modal } from "shared/ui/modal";
import { Header } from "widgets/header";
import { HomePage } from "pages/home";
import { ToastContainer } from "react-toastify";
import "./styles/index.css";

function App() {
  return (
    <ModalProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <HomePage />
        </main>
        <Modal />
        <ToastContainer />
      </div>
    </ModalProvider>
  );
}

export default App;
