import React from "react";

export default function PageHeader({ tourId }) {
  // Pega o tour pelo id ou o primeiro da lista
  const tour = tourData.find((t) => t.id === tourId) || tourData[0];

  // Separa cidade e país
  const locationParts = tour.location.split(",").map((s) => s.trim());
  const city = locationParts[0];
  const country = locationParts[1] || "";

  return (
    <section className="pageHeader -type-3">
      <div className="container">
        <div className="row justify-between">
          <div className="col-auto">
            <div className="breadcrumbs">
              <span className="breadcrumbs__item">
                <a href="#">Home</a>
              </span>
              <span>{">"}</span>
              <span className="breadcrumbs__item">
                <a href="#">Tours</a>
              </span>
              <span>{">"}</span>
              <span className="breadcrumbs__item">
                <a href="#">{city}</a>
              </span>
            </div>
          </div>

          <div className="col-auto">
            <div className="pageHeader__subtitle">
              {`Top tours & experiences in ${city}${
                country ? ", " + country : ""
              }`}
            </div>
          </div>
        </div>

        <div className="row pt-30">
          <div className="col-auto">
            <h1 className="pageHeader__title">{tour.title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
