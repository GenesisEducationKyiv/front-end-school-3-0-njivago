import { ModalProvider, Modal } from "shared/ui/modal";
import { Header } from "widgets/header";
import { HomePage } from "pages/home";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./providers";
import "./styles/index.css";

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          <Header />
          <main className="flex-1">
            <HomePage />
          </main>
          <Modal />
          <ToastContainer />
        </div>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
