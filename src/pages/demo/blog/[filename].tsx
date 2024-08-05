// THIS FILE HAS BEEN GENERATED WITH THE TINA CLI.
// @ts-nocheck
// This is a demo file once you have tina setup feel free to delete this file
"use client";
import Head from "next/head";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../../../tina/__generated__/client";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "react-spring-lightbox";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CarPage = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  const gotoNext = () =>
    currentImageIndex + 1 < data.post.gallery.length &&
    setCurrentIndex(currentImageIndex + 1);

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.7/tailwind.min.css"
          integrity="sha512-y6ZMKFUQrn+UUEVoqYe8ApScqbjuhjqzTuwUMEGMDuhS2niI8KA3vhH2LenreqJXQS+iIXVTRL2iaNfJbDNA1Q=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <div className="bg-gray-900">
        <div className="relative isolate overflow-hidden">
          {data.post.imgSrc ? (
            <Image
              src={data.post.imgSrc}
              alt="layout Hero Image"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              layout="fill"
              objectFit="cover"
            />
          ) : null}
          <div className="absolute inset-0 h-full w-full bg-black opacity-10" />
          <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36 lg:px-8">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-3xl">
                <div className="relative mx-auto max-w-7xl">
                  <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-left xl:text-6xl">
                    {data.post.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-yellow-500">
                  {data.post.brand}
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {data.post.title}
                </p>
                <p className="mt-6 text-lg leading-7 text-gray-500">
                  {data.post.detailsCar}
                </p>
              </div>
            </div>
            <div className="mx-auto px-8 ">
              <div className="bg-gray-900">
                <div className="pt-24 mx-auto max-w-7xl sm:pt-32 lg:px-8">
                  <h2 className="text-3xl font-bold tracking-tight text-center text-white sm:text-4xl">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-2 mt-16 md:grid-cols-3">
                    {data.post.gallery.map(
                      (item, index) => (
                        console.log(data.post.gallery),
                        item.image ? (
                          <Image
                            key={index}
                            src={item.image}
                            width={600}
                            height={400}
                            alt={item.caption || "Gallery image"}
                            className={index === 8 ? "hidden md:block" : ""}
                            onClick={() => {
                              setOpen(true);
                              setCurrentIndex(index);
                            }}
                          />
                        ) : null
                      ),
                    )}
                  </div>
                  <Lightbox
                    isOpen={isOpen}
                    onPrev={gotoPrevious}
                    onNext={gotoNext}
                    images={data.post.gallery.map((item) => ({
                      src: item.image,
                      caption: item.caption || "",
                    }))}
                    currentIndex={currentImageIndex}
                    onClose={() => setOpen(false)}
                    renderNextButton={() => (
                      <Arrow action={gotoNext} direction="right" />
                    )}
                    renderPrevButton={() => (
                      <Arrow action={gotoPrevious} direction="left" />
                    )}
                    renderHeader={() => <Header setOpen={setOpen} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  let data = {};
  let query = {};
  let variables = { relativePath: `${params.filename}.md` };
  try {
    const res = await client.queries.post(variables);
    query = res.query;
    data = res.data;
    variables = res.variables;
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
      //myOtherProp: 'some-other-data',
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection();

  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: false,
  };
};

export default CarPage;

const PageSection = (props) => {
  return <div>{props.heading}</div>;
};

function Arrow({ action, direction }) {
  return (
    <button className="z-10">
      <span className="sr-only">Chiudi galleria immagini</span>
      <ChevronRightIcon
        onClick={() => action()}
        className={`size-12 text-white ${direction == "left" ? "rotate-180 md:ml-20" : "md:mr-20"}`}
      />
    </button>
  );
}

function Header({ setOpen }) {
  return (
    <div className="flex justify-end">
      <span className="sr-only">Scorri immagini</span>
      <button>
        <XMarkIcon
          onClick={() => setOpen(false)}
          className="m-4 text-white size-10"
        />
      </button>
    </div>
  );
}
