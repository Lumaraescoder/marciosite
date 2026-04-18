import Image from "next/image";

export default function Stage2Payment() {
  return (
    <div>
      <h2 className="text-30 md:text-24 fw-700 mb-30">
        How do you want to pay?
      </h2>

      <div className="tabs -pills-3 js-tabs">
        <div className="tabs__controls row x-gap-10 y-gap-10 js-tabs-controls">
          <div className="col-auto">
            <button
              className="tabs__button fw-500 rounded-200 js-tabs-button is-tab-el-active"
              data-tab-target=".-tab-item-1"
            >
              Credit/Debit Card
            </button>
          </div>
        </div>

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="contactForm">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">
                  Select payment method *
                </label>
              </div>
            </div>

            <div className="row y-gap-30 pt-30">
              <div className="col-lg-6">
                <div className="row y-gap-30 contactForm">
                  <div className="col-12">
                    <div className="form-input ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">
                        Card holder name *
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-input ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">
                        Credit/debit card number *
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-input ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">
                        Expiry date *
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-input ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">
                        CVC/CVV *
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <Image
                  width={820}
                  height={500}
                  src="/img/tourSingle/booking/card.png"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
