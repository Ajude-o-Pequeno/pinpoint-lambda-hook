const AWS = require('aws-sdk');
const aws_region = "us-east-1"

AWS.config.update({region:aws_region});

const pinpoint = new AWS.Pinpoint();

exports.handler = async (event) => {
  console.log('Received event', JSON.stringify(event));

  await pinpoint.getCampaign({
    ApplicationId: event.ApplicationId,
    CampaignId: event.CampaignId
  }).promise().then((response) => {
    const TemplateName = response.CampaignResponse.TemplateConfiguration.EmailTemplate.Name;
    return pinpoint.getEmailTemplate({ TemplateName }).promise();
  }).then((response) => {
    console.log('Email template', JSON.stringify(response));
    const subject = response.EmailTemplateResponse.Subject;
    const htmlTemplate = response.EmailTemplateResponse.HtmlPart;
    const defaultSubstitutions = response.EmailTemplateResponse.DefaultSubstitutions;
  });

};
