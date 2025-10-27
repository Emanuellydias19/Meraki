"use client";

import { Button } from "@/components/ui";
import Link from "next/link";
import Slider from "react-slick";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="h-screen justify-center bg-linear-to-b from-primary/20 to-background flex items-center">
        <div className="px-8 space-y-8 flex-1">
          <h1 className="text-6xl font-bold text-white">Meet Meraki</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            A platform built on Solana that connects startups and investors in a
            transparent and decentralized way.
          </p>
          <div className="flex gap-4">
            <Link href="/explore" passHref>
              <Button className="px-8 py-3 rounded-lg font-semibold bg-accent text-white hover:opacity-90 transition-opacity">
                Explorar Startups
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button className="px-8 py-3 rounded-lg font-semibold border-2 border-accent text-accent hover:bg-accent/10 transition-colors">
                Publicize your Startup
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="w-full max-w-md rounded-lg overflow-hidden">
            {/* Hard-coded demo video (YouTube embed). Troque pela sua URL se desejar. */}
            <iframe
              className="w-full h-64 md:h-80"
              src="https://www.youtube.com/embed/5t_Lec1VGOE?si=zNlSBgh_hmSHl2IT"
              title="Demo video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="h-screen p-12">
        <h2 className="text-3xl font-bold mb-8">More about Meraki</h2>
        <p>
          Meraki is a decentralized platform built on Solana that connects
          innovative startups with visionary investors through transparent smart
          contracts. Startups can showcase their projects and funding goals,
          while investors can explore opportunities across sectors like health,
          education, and sustainability, investing directly from their wallets.
        </p>
        <p>
          When an investor agrees with a startup’s funding request, they can
          connect their wallet and complete the payment through the Meraki
          platform. Once the transaction is made, the smart contract
          automatically defines the financial flow: from all revenue the startup
          generates on the Solana network, a pre-agreed percentage is
          continuously returned to the investor, while 0.5% of each transaction
          goes to Meraki as a service fee. This distribution remains active for
          the duration of the contract.
        </p>
        <p>
          Each investment also generates a unique NFT that proves contribution
          and transparently tracks fund usage on-chain, ensuring trust,
          accountability, and transparency in every transaction.
        </p>

        <div className="flex gap-4">
          <h6 className="text-3xl font-bold mb-8">Meraki</h6>
          <h6 className="text-3xl font-bold mb-8">SOLANA</h6>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#092C4C] w-full overflow-y-auto">
        <div className="mx-auto px-8 space-y-12">
          <h2 className="text-4xl font-bold text-white text-center">
            Why invest with us?
          </h2>
          <div className="grid grid-cols-4 gap-8">
            {[
              {
                icon: "🔒",
                desc: "Every investment is secured and traceable on Solana’s blockchain.",
              },
              {
                icon: "🎮",
                desc: "Discover early-stage startups building the future of Web3.",
              },
              {
                icon: "⚡",
                desc: "Transações rápidas com taxas mínimas",
              },
              {
                icon: "🤝",
                desc: "Support startups that are changing industries and creating global value.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-lg p-6 text-center space-y-4 min-w-2xs"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Why Solana*/}
      <section className="py-24 bg-[#1A1818] w-full overflow-y-auto">
        <div className="mx-auto px-8 space-y-15">
          <h2 className="text-4xl font-bold text-white text-center">
            Why Solana?
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {[
              {
                icon: "🔒",
                desc: "Solana processes thousands of transactions per second with ultra-low fees, making every investment fast and cost-efficient.",
              },
              {
                icon: "🎮",
                desc: "Unlike other blockchains, Solana’s minimal fees make investing and deploying smart contracts highly affordable.",
              },
              {
                icon: "⚡",
                desc: "Built with sustainability in mind, Solana operates with one of the lowest environmental footprints among major blockchains.",
              },
              {
                icon: "🤝",
                desc: "With advanced consensus mechanisms and a growing ecosystem, Solana ensures your transactions and data remain safe and verifiable.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-6 text-center space-y-4 min-w-2xs"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Meraki's Real Cases*/}
      <section className="py-24 bg-[#092C4C] w-full overflow-y-auto">
        <div className="mx-auto px-8 space-y-15">
          <h2 className="text-4xl font-bold text-white text-center">
            Meraki's Real Cases
          </h2>
          {/* Carrossel de relatos */}
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            className="max-w-2xl mx-auto"
          >
            {[
              {
                icon: "🔒",
                title: "Startup A",
                desc: "Meraki helped us raise funds transparently and our investors receive their share automatically.",
              },
              {
                icon: "🎮",
                title: "Startup B",
                desc: "The NFT system gave our supporters confidence and visibility on how their money is used.",
              },
              {
                icon: "⚡",
                title: "Startup C",
                desc: "Solana's speed and low fees made our fundraising process smooth and affordable.",
              },
              {
                icon: "🤝",
                title: "Investor X",
                desc: "I can track my investments and returns in real time, all on-chain. Total transparency!",
              },
            ].map((relato, idx) => (
              <div
                key={idx}
                className="bg-[#BD2EF0] p-8 text-center space-y-4 min-w-2xs"
              >
                <div className="text-4xl">{relato.icon}</div>
                <h3 className="text-lg font-bold text-black">{relato.title}</h3>
                <p className="text-black text-base">{relato.desc}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}
