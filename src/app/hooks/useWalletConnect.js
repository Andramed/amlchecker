"use client";

import { WalletConnectWallet, WalletConnectChainID } from "@tronweb3/walletconnect-tron";
import { useWallet } from "../context/globalContext";

// Helper pentru detectarea dispozitivelor mobile
const isMobileDevice = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Funcție pentru log-uri către server
// const logToServer = async (message) => {
//   try {
//     await fetch(`${process.env.NEXT_PUBLIC_API_ADRESS}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ log: message }),
//     });
//   } catch (error) {
//     console.error("Failed to send log to server:", error);
//   }
// };


export const useWalletConnect = () => {
  const { setWalletAddress } = useWallet();
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  // logToServer("This is a test log from the client.");

  const connectWallet = async () => {
    const wallet = new WalletConnectWallet({
      network: WalletConnectChainID.Mainnet,
      relayUrl: `wss://relay.walletconnect.com/?projectId=${projectId || "default_project_id"}`,
      options: {
        relayUrl: "wss://relay.walletconnect.com",
        projectId: projectId || "default_project_id",
        metadata: {
          name: "Tron",
          description: "Tron WalletConnect",
          url: window.location.origin,
          icons: ["https://app.justlend.org/mainLogo.svg"],
        },
        
      },
      web3ModalConfig: {
        themeMode: "dark",
        themeVariables: {
          "--w3m-z-index": 1000
        },
        explorerRecommendedWalletIds: [
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
            '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
            '0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150', // SafePal
            '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662', // BitGet
            'c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a'  // Uniswap
        ]
      }
    });

    try {
      const startMessage = "Attempting to connect wallet on desktop...";
  
      // await logToServer(startMessage);

      // await logToServer(await wallet.checkConnectStatus());

      const data = await wallet.connect();
      const successMessage = `Wallet connect response: ${JSON.stringify(data)}`;
      // await logToServer(successMessage);
      // await logToServer(data)

      const address = data.address;
      if (!address) throw new Error("Wallet address not found");

      setWalletAddress(address);
      return { wallet, address };
    } catch (error) {
      const errorMessage = `Error during wallet connection: ${error.message}`;
     
      // console.error(errorMessage);
      // await logToServer(errorMessage);
      // throw error;
    }
  };

  return { connectWallet };
};
