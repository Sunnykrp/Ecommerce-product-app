import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import store from "@/redux/store";
import { Provider } from "react-redux";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-6 flex-1">
          <Component {...pageProps} />
        </main>
      </div>
    </Provider>
  );
}