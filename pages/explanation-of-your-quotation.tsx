import React, { useState } from "react";

import MainLayout from "../components/layout/main-layout";

const ExplanationOfYourQuotation = () => {
  return (
    <>
      <style jsx>
        {`
          .order-and-quotation-explanation .title {
            display: block;
            margin-bottom: 10px;
            padding-bottom: 10px;
            width: 40%;
          }
          .title {
            color: #036d67;
            font-weight: 700;
            text-align: left;
            border-bottom: 1px solid #ddd;
            font-size: 21px;
            line-height: 25px;
            padding-bottom: 30px;
            margin-bottom: 20px;
          }
          .order-and-quotation-explanation p {
            font-size: 18px;
            font-weight: bold;
          }
          .order-and-quotation-explanation ul li {
            margin-bottom: 45px;
            font-size: 18px;
          }
          .order-and-quotation-explanation ul {
            list-style-type: none;
            padding-left: 0;
          }
          ul li {
            padding: 0;
            margin: 0;
            text-decoration: none;
          }
        `}
      </style>
      <div id="content-container" className="main">
        <article className="content-wrapper order-and-quotation-explanation">
          <div className="container">
            <h1 className="h1">Explanation of your quotation</h1>
            <div className="article-content">
              <p>
                Please be confident before proceeding that you fully understand
                each element of your quotation, a brief overview of each section
                is detailed below:
              </p>
              <ul>
                <li>
                  <span className="title">Your Vehicle</span>
                  Make and model of the vehicle chosen by you.
                </li>
                <li>
                  <span className="title">Factory Fitted Options</span>
                  Optional extras over and above the standard specification of
                  the vehicle chosen by you.
                </li>
                <li>
                  <span className="title">Additional Information</span>
                  Specifics relating to age, gearbox, drive train and fuel type
                  of your chosen vehicle. Please be sure when choosing a diesel
                  engine that you are familiar with how a Diesel Particulate
                  Filter operates and that your driving pattern is suited to it.
                  You may also be required to purchase and maintain levels of
                  AdBlue solution, should your vehicle require it.
                </li>
                <li>
                  <span className="title">Pre-Registered</span>A new vehicle
                  that has been registered in advance of you taking delivery.
                  Please remember MOT’s, servicing and warranty are calculated
                  and apply from the registration date and not from the
                  delivery/contract start date.
                </li>
                <li>
                  <span className="title">Contract Term</span>
                  The duration of your agreement in months commencing from the
                  date your vehicle is delivered to you. All agreements are for
                  a fixed term.
                </li>
                <li>
                  <span className="title">Contract Mileage</span>
                  Annual mileage, as specified by you, is fixed for the term of
                  the agreement. Please be realistic with your requirements to
                  minimise the possibility of excess mileage charges.
                </li>
                <li>
                  <span className="title">Initial Rental</span>
                  An advance payment which is typically equivalent to a number
                  of monthly rentals, 3, 6 or 9. This payment forms part of the
                  contract and is non-refundable. The higher the initial payment
                  the lower your regular monthly payment. This Payment is
                  usually taken by the finance company by Direct Debit usually
                  within 14 days after you take delivery of the vehicle.
                </li>
                <li>
                  <span className="title">Monthly Finance Rental</span>
                  The fixed monthly payment for the lease of the vehicle paid to
                  the funder.
                </li>
                <li>
                  <span className="title"> Monthly Maintenance Rental</span>
                  Where applicable, the portion of the total monthly rental that
                  is attributable to the cost of the service and maintenance
                  package payable to the funder.
                  <span className="important">
                    Please note that the amount stated here is dependent on
                    finance approval so is only to be used as a guide price at
                    the time of quotation; the exact figure will be confirmed on
                    your finance agreement.
                  </span>
                </li>
                <li>
                  <span className="title">Total Monthly Rental</span>
                  The sum of the finance rental plus, where applicable, the
                  maintenance rental. The Total Rental amount will be taken by
                  Direct Debit each month by the funder.
                </li>
                <li>
                  <span className="title">Excess Mileage Charge</span>
                  Each mile travelled in excess of the contract mileage will
                  attract a cost in pence per mile. Some funders may charge on a
                  tiered basis for vehicles returned with excessive mileage.
                  <span className="important">
                    This figure is indicative and will be confirmed on your
                    finance agreement.
                  </span>
                </li>
                <li>
                  <span className="title">Processing Fee</span>
                  Cost for Leasing Options Limited to process the agreement,
                  payable online via Sagepay at the time of you accepting your
                  order. Alternative payment methods are available, please
                  discuss these with your Account Manager.
                </li>
                <li>
                  <span className="title">Quotation Inclusions</span>
                  Products and Services included with your agreement including
                  but not limited to Road Fund Licence and UK mainland delivery
                  as standard. Any optional service and maintenance packages
                  will be displayed here where applicable.
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

ExplanationOfYourQuotation.layout = MainLayout;

export default ExplanationOfYourQuotation;
