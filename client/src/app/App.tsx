import { Suspense } from "react";
import { ModalProvider, Modal } from "shared/ui/modal";
import { Header } from "widgets/header";
import { HomePage } from "pages/home";
import { ToastContainer } from "react-toastify";
import { UrqlProvider } from "./providers";
import "./styles/index.css";

function App() {
  return (
    <UrqlProvider>
      <ModalProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  Loading...
                </div>
              }
            >
              <HomePage />
            </Suspense>
          </main>
          <Modal />
          <ToastContainer />
        </div>
      </ModalProvider>
    </UrqlProvider>
  );
}

export default App;
