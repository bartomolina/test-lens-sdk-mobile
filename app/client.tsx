"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

import {
  development,
  LensProvider,
  type LensConfig,
} from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [polygonMumbai];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
};

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <LensProvider config={lensConfig}>{children}</LensProvider>
    </WagmiConfig>
  );
}
