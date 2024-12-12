import { TronWeb } from "tronweb";
import { useWallet } from "../context/globalContext";

export const useTronBalances = () => {
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
  const { setBalances } = useWallet();
  const fetchBalances = async (address) => {
    console.log({
      message: "from fetch balances before tr catch block"
    });
    const tronWeb = new TronWeb({
      fullHost: process.env.NEXT_PUBLIC_FULL_HOST, // Tron node URL
    });
    try {
      const balanceSun = await tronWeb.trx.getBalance(address);
      const balanceTRX = tronWeb.fromSun(balanceSun);
      console.log("Fetched TRX Balance:", balanceTRX);
      const usdtContractAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
      const usdtContract = await tronWeb.contract().at(usdtContractAddress);
      const usdtBalanceRaw = await usdtContract.methods.balanceOf(address).call({from:address});
      const usdtBalance = Number(usdtBalanceRaw) / 1e6; // Convert Sun to USDT
      // await logToServer("Fetched USDT Balance:", usdtBalance);
      setBalances((prevBalances) => ({
        ...prevBalances,
        trx: balanceTRX,
        usdt: usdtBalance,
      }));
    } catch (error) {
      // await logToServer("Error fetching balances:", error);
    }
  };
  return { fetchBalances };
};
