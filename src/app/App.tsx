import "./styles/index.css";
import { ModalProvider, Modal } from "shared/ui/modal";
import { Header } from "widgets/header";
import { HomePage } from "pages/home";

function App() {
  return (
    <ModalProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <HomePage />
        </main>
        <Modal />
      </div>
    </ModalProvider>
  );
}

export default App;
