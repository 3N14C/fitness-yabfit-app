import { AuthContextProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { MenuProvider } from "react-native-popup-menu";
import { ModalPortal } from "react-native-modals";

const Layout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <MenuProvider>
          <Slot />
        </MenuProvider>
        <ModalPortal />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;
