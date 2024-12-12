import { WalletProvider } from "@/app/context/globalContext";
import Wrapper from "@/app/walletcheck/WrapperComponent";
import AmlCheckPassed from "./AmlCheckPassed";

export default function WalletCheckPage() {
  return (
    <WalletProvider>
      <Wrapper />
      
    </WalletProvider>
  );
}
