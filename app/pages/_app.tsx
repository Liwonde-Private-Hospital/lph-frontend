import { AppProps } from "next/dist/pages/_app";
import { AuthProvider } from "../context/AuthContext";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
