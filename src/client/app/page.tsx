"use client";

import { Button } from "../components/ui";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="h-screen justify-center bg-linear-to-b from-primary/0 to-background flex items-center">
        <div className="px-8 space-y-8 flex-">
          <h className="text-6xl font-bold text-white">Meet Meraki</h>
          <p className="text-xl text-gray-00 max-w-xl">
            A platform built on Solana that connects startups and investors in a
            transparent and decentralized way.
          </p>
          <div className="flex gap-">
            <Link href="/explore" passHref>
              <Button className="px-8 py- rounded-lg font-semibold bg-accent text-white hover:opacity-90 transition-opacity">
                Explorar Startups
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button className="px-8 py- rounded-lg font-semibold border- border-accent text-accent hover:bg-accent/0 transition-colors">
                Publicize your Startup
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex- justify-center items-center">
          <div className="w-full max-w-md rounded-lg overflow-hidden">
            {/* Hard-coded demo video (YouTube embed). Troque pela sua URL se desejar. */}
            <iframe
              className="w-full h-6 md:h-80"
              src="https://www.youtube.com/embed/5t_LecVGOE?si=zNl"
              title="Demo video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="h-min-screen p- pb- flex flex-col gap-">
        <h className="text-xl font-bold mb-8">More about Meraki</h>
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

        <div className="flex gap- py-0">
          <div className="flex- text-xl font-bold mb-8 text-center flex gap- justify-center">
            imagem
            <p>Meraki</p>
          </div>
          <div className="flex- text-xl font-bold mb-8 text-center flex gap- justify-center">
            imagem
            <p>SOLANA</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py- bg-[#09CC] w-full overflow-y-auto">
        <div className="mx-auto px-8 space-y-">
          <h className="text-xl font-bold text-white text-center">
            Why invest with us?
          </h>
          <div className="grid grid-cols- gap-8">
            {[
              {
                icon: "icon",
                desc: "Every investment is secured and traceable on Solana’s blockchain.",
              },
              {
                icon: "icon",
                desc: "Discover early-stage startups building the future of Web.",
              },
              {
                icon: "icon",
                desc: "Transações rápidas com taxas mínimas",
              },
              {
                icon: "icon",
                desc: "Support startups that are changing industries and creating global value.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-lg p-6 text-center space-y- min-w-xs"
              >
                <div className="text-xl">{feature.icon}</div>
                <h className="text-lg font-bold text-white">
                  {feature.title}
                </h>
                <p className="text-gray-00 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Why Solana*/}
      <section className="py- bg-[#A88] w-full overflow-y-auto">
        <div className="mx-auto px-8 space-y-5">
          <h className="text-xl font-bold text-white text-center">
            Why Solana?
          </h>
          <div className="grid grid-cols- gap-8">
            {[
              {
                icon: "icon",
                desc: "Solana processes thousands of transactions per second with ultra-low fees, making every investment fast and cost-efficient.",
              },
              {
                icon: "icon",
                desc: "Unlike other blockchains, Solana’s minimal fees make investing and deploying smart contracts highly affordable.",
              },
              {
                icon: "icon",
                desc: "Built with sustainability in mind, Solana operates with one of the lowest environmental footprints among major blockchains.",
              },
              {
                icon: "icon",
                desc: "With advanced consensus mechanisms and a growing ecosystem, Solana ensures your transactions and data remain safe and verifiable.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-6 text-center space-y- min-w-xs"
              >
                <div className="text-xl">{feature.icon}</div>
                <h className="text-lg font-bold text-white">
                  {feature.title}
                </h>
                <p className="text-gray-00 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Meraki's Real Cases*/}
      <section className="py- bg-[#09CC] w-full overflow-y-auto">
        <div className="mx-auto px-8 space-y-5">
          <h className="text-xl font-bold text-white text-center">
            Meraki's Real Cases
          </h>
          {/* Carrossel de relatos */}
          <Swiper
            loop={true}
            spaceBetween={50}
            slidesPerView={}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {[
              {
                icon: "icon",
                title: "Startup A",
                desc: "Meraki helped us raise funds transparently and our investors receive their share automatically.",
              },
              {
                icon: "icon",
                title: "Startup B",
                desc: "The NFT system gave our supporters confidence and visibility on how their money is used.",
              },
              {
                icon: "icon",
                title: "Startup C",
                desc: "Solana's speed and low fees made our fundraising process smooth and affordable.",
              },
              {
                icon: "icon",
                title: "Investor X",
                desc: "I can track my investments and returns in real time, all on-chain. Total transparency!",
              },
            ].map((relato, idx) => (
              <SwiperSlide
                key={idx}
                className="bg-[#BDEF0] p-8 text-center space-y- min-w-xs"
              >
                <div className="text-xl">{relato.icon}</div>
                <h className="text-lg font-bold text-black">{relato.title}</h>
                <p className="text-black text-base">{relato.desc}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/*Proof that our platform makes a real difference*/}
      <section className="h-min-screen p- text-center flex flex-col gap-8">
        <h className="text-xl font-bold text-center">
          Proof that our platform makes a real difference
        </h>
        <p>
          Real data, real feedback, real progress — early insights proving how
          Meraki bridges innovation and investment.
        </p>
        <div className="grid grid-cols- gap-8">
          {[
            {
              title: "Investor Validation",
              desc: "Investors are finding value early on.",
              data: "78%",
              desc:
                "of early testers said Meraki simplifies finding purpose-driven startups.",
              line: true,
              data: " out of ",
              desc:
                "of early testers said Meraki simplifies finding purpose-driven startups.",
            },
            {
              title: "Startup Engagement",
              desc: "Founders trust Meraki to tell their story.",
              data: "60%",
              desc: "faster connection to interested investor.",
              line: true,
              desc: "Transparent profile system rated.",
              data: ".8/5",
              desc: "in usability tests.",
            },
            {
              title: "Market Opportunity",
              desc: "Data shows the space for innovation is massive.",
              data: "70%",
              desc: "of early-stage startupsmlack aligned investors.",
              line: true,
              desc: "The global innovation funding market will grow",
              data: "0%",
              desc: "by 07",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="relative border-gray-600 border p-6 text-center space-y- min-w-xs"
            >
              {idx ==  && (
                <span className="bg-background absolute left-/ -top- px- text-xs -translate-x-[5%]">
                  Your opportunity starts here
                </span>
              )}
              <h className="text-xl font-bold text-white">{feature.title}</h>
              <p className="text-gray-00 text-xl">{feature.desc}</p>

              <p className="text-white font-bold text-6xl">{feature.data}</p>
              <p className="text-white font-bold text-6xl">{feature.data}</p>
              <p className="text-gray-00 text-sm">{feature.desc}</p>

              {/* Divider: rendered only if feature.line is true */}
              {feature.line && (
                <div className="border-t border-gray-600 my- w-/ mx-auto" />
              )}

              <p className="text-gray-00 text-sm">{feature.desc}</p>
              <p className="text-gray-00 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
