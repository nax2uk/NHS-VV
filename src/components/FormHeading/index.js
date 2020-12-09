import React from "react";

const FormHeading = ({ children }) => (
  <h2 className="nhsuk-heading-l">
    {/*} <svg class="nhsuk-icon nhsuk-icon__arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" aria-hidden="true">
        <path d="M19.6 11.66l-2.73-3A.51.51 0 0 0 16 9v2H5a1 1 0 0 0 0 2h11v2a.5.5 0 0 0 .32.46.39.39 0 0 0 .18 0 .52.52 0 0 0 .37-.16l2.73-3a.5.5 0 0 0 0-.64z" fill="#000"></path>
        </svg>*/}
    {children}
  </h2>
);

export default FormHeading;
