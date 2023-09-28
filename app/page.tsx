"use client";

import { useEffect } from "react";

import { WalletClient, useAccount, useWalletClient } from "wagmi";
import { providers } from "ethers";

import { useWalletLogin } from "@lens-protocol/react-web";

function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

export default function Home() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { execute: login } = useWalletLogin();

  useEffect(() => {
    if (isConnected && walletClient && address) {
      console.log("Wallet connected. Loggin in to Lens...");
      const signer = walletClientToSigner(walletClient);
      login(signer)
        .then((result) => {
          console.log("Logged as:", result?.value?.handle);
        })
        .catch(() => {
          console.log("Error loggin in");
        });
    }
  }, [isConnected, address, walletClient]);

  return (
    <div>
      <w3m-button />
    </div>
  );
}
