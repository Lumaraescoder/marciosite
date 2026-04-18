"use client";

import React, { useState } from "react";
import ImageLightBox from "./ImageLightBox";
import Image from "next/image";

export default function Gallery1({ images }) {
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  if (!images || images.length === 0) return null; // caso não haja imagens

  return (
    <>
      <div className="tourSingleGrid -type-1 mt-30">
        <div className="tourSingleGrid__grid mobile-css-slider-2">
          {images.slice(0, 4).map((img, index) => {
            let width = 375;
            let height = 375;

            if (index === 0) {
              width = 1155;
              height = 765;
            } else if (index === 1) {
              width = 765;
              height = 375;
            }

            return (
              <Image
                key={img.id}
                width={width}
                height={height}
                src={img.image}
                alt={`Gallery image ${index + 1}`}
              />
            );
          })}
        </div>

        <div className="tourSingleGrid__button">
          <div
            style={{ cursor: "pointer" }}
            className="js-gallery"
            data-gallery="gallery1"
          >
            <span
              onClick={() => setActiveLightBox(true)}
              className="button -accent-1 py-10 px-20 rounded-200 bg-dark-1 lh-16 text-white"
            >
              See all photos
            </span>
          </div>

          {images.slice(1).map((img) => (
            <a
              key={img.id}
              href={img.image}
              className="js-gallery"
              data-gallery="gallery1"
            ></a>
          ))}
        </div>
      </div>

      <ImageLightBox
        images={images}
        activeLightBox={activeLightBox}
        setActiveLightBox={setActiveLightBox}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </>
  );
}
