import { NotifyClient } from "notifications-node-client";
import TemplateStore from "../gateways/GovNotify/TemplateStore";
import sendEmail from "./sendEmail";
import fillObjectWithStrings from "../testUtils/fillObjectWithStrings";

describe("sendEmail", () => {
  const { templateId, personalisationKeys } = TemplateStore.firstText;
  const personalisation = fillObjectWithStrings(personalisationKeys);

  const emailAddress = "test@example.com";
  const reference = "email-one-reference";

  let notifyClient;
  let container;

  beforeEach(() => {
    notifyClient = new NotifyClient();
    container = {
      getNotifyClient: () => notifyClient,
    };
  });

  it("sends an email message", async () => {
    await sendEmail(container)(
      templateId,
      emailAddress,
      personalisation,
      reference
    );

    expect(notifyClient.sendEmail).toHaveBeenCalledWith(
      templateId,
      emailAddress,
      {
        personalisation,
        reference,
      }
    );
  });
});