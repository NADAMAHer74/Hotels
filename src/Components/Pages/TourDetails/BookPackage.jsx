import React from 'react'

function BookPackage() {
  return (
    <div>
        <div className="col-lg-4 col-md-10 col-sm-12">
            <div className="package-section">
              <h3 className="section-title">Package Details</h3>
              <form className="package-form">
                <label className="date" for="date">
                  Date
                </label>
                <div className="input-group">
                  <input type="date" id="date" name="date" />
                  <span className="icon-calendar"></span>
                </div>

                <label className="time" for="time">
                  Time
                </label>
                <select id="time" name="time">
                  <option value="default">Default sorting</option>
                </select>

                <div className="tickets">
                  <div className="ticket-type">
                    <label for="adults">Adults (18+ years)</label>
                    <div className="counter">
                      <button type="button" className="minus">
                        -
                      </button>
                      <input
                        type="number"
                        id="adults"
                        name="adults"
                        min="1"
                        value="1"
                      />
                      <button type="button" className="plus">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="ticket-type">
                    <label for="kids">Kids (13 years)</label>
                    <div className="counter">
                      <button type="button" className="minus">
                        -
                      </button>
                      <input
                        type="number"
                        id="kids"
                        name="kids"
                        min="0"
                        value="1"
                      />
                      <button type="button" className="plus">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="ticket-type">
                    <label for="children">Children (5+ years)</label>
                    <div className="counter">
                      <button type="button" className="minus">
                        -
                      </button>
                      <input
                        type="number"
                        id="children"
                        name="children"
                        min="0"
                        value="1"
                      />
                      <button type="button" className="plus">
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="additional-services">
                  <label>Additional Service</label>
                  <div className="service-item">
                    <input type="checkbox" id="guide" name="guide" />
                    <label for="guide">Additional Guide</label>
                    <span>$420</span>
                  </div>
                  <div className="service-item">
                    <input type="checkbox" id="internet" name="internet" />
                    <label for="internet">Internet</label>
                    <span>$420</span>
                  </div>
                  <div className="service-item">
                    <input
                      type="checkbox"
                      id="photography"
                      name="photography"
                    />
                    <label for="photography">Photography</label>
                    <span>$420</span>
                  </div>
                </div>

                <p className="total-cost">
                  Total Cost: <span className="price">$800.00</span> / per
                  person
                </p>
                <button type="submit" className="book-btn">
                  Proceed To Book
                </button>
              </form>
            </div>
            <div className="tour-info mt-5">
              <h3>Tour Information</h3>
              <ul>
                <li>
                  <span className="icon">
                    <i className="fa-solid fa-user-group"></i>
                  </span>{" "}
                  Max Guests: Date
                </li>
                <li>
                  <span className="icon">
                    <i className="fa-solid fa-user-group"></i>
                  </span>{" "}
                  Min Age: 12+
                </li>
                <li>
                  <span className="icon">
                    <i className="fa-solid fa-plane"></i>
                  </span>{" "}
                  Tour Location: America
                </li>
                <li>
                  <span className="icon">
                    <i className="fa-solid fa-earth-americas"></i>
                  </span>{" "}
                  Languages Support: Global
                </li>
              </ul>
            </div>
          </div>
    </div>
  )
}

export default BookPackage