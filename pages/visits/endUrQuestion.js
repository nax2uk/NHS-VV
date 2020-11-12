import React, { useEffect } from "react";
import Layout from "../../src/components/Layout";
import propsWithContainer from "../../src/middleware/propsWithContainer";
import { v4 as uuidv4 } from "uuid";

export default function EndUrQuestion({ correlationId, callId }) {
  const onSubmit = async () => {};
  const onClickSkip = async () => {
    window.location.href = `/visits/end?callId=${callId}`;
  };

  useEffect(() => {
    console.log(correlationId);
  }, []);

  return (
    <Layout title="Submit feedback" isBookService={false}>
      <div className="nhsuk-form-group">
        <form onSubmit={onSubmit}>
          <fieldset className="nhsuk-fieldset">
            <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--l">
              <h1 className="nhsuk-fieldset__heading">
                If this service was no longer available would you be
                dissappointed/upset?
              </h1>
            </legend>

            <div className="nhsuk-radios">
              <div className="nhsuk-radios__item">
                <input
                  className="nhsuk-radios__input"
                  id="ur-question-radio-yes"
                  name="ur-question-radio"
                  type="radio"
                  value="yes"
                />
                <label
                  className="nhsuk-label nhsuk-radios__label"
                  htmlFor="ur-question-radio-yes"
                >
                  Yes
                </label>
              </div>

              <div className="nhsuk-radios__item">
                <input
                  className="nhsuk-radios__input"
                  id="ur-question-radio-no"
                  name="ur-question-radio"
                  type="radio"
                  value="no"
                />
                <label
                  className="nhsuk-label nhsuk-radios__label"
                  htmlFor="ur-question-radio-no"
                >
                  No
                </label>
              </div>
            </div>
          </fieldset>

          <button className="nhsuk-button" type="submit">
            Submit feedback
          </button>
        </form>

        <button
          className="nhsuk-button nhsuk-button--secondary"
          onClick={onClickSkip}
        >
          Skip
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = propsWithContainer(
  async ({ req: { headers }, res, container, query }) => {
    const { callId } = query;
    const userIsAuthenticated = container.getUserIsAuthenticated();
    const token = await userIsAuthenticated(headers.cookie);
    const correlationId = `${uuidv4()}-ur-question`;

    if (token?.ward || null) {
      res.writeHead(302, { Location: `/visits/end?callId=${callId}` }).end();
    } else {
      res.status(200);
      return { props: { correlationId, callId } };
    }
  }
);
