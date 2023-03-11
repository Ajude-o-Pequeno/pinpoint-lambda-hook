const AWS = require('aws-sdk');

const aws_region = "us-east-1"

AWS.config.update({region:aws_region});

const pinpoint = new AWS.Pinpoint();

exports.handler = async (event) => {
  console.log('Received event', JSON.stringify(event));

  let subject;
  let htmlTemplate;
  let defaultSubstitutions;

  await pinpoint.getCampaign({
    ApplicationId: event.ApplicationId,
    CampaignId: event.CampaignId
  }).promise().then((response) => {
    const TemplateName = response.CampaignResponse.TemplateConfiguration.EmailTemplate.Name;
    return pinpoint.getEmailTemplate({ TemplateName }).promise();
  }).then((response) => {
    console.log('Email template', JSON.stringify(response));
    subject = response.EmailTemplateResponse.Subject;
    htmlTemplate = response.EmailTemplateResponse.HtmlPart;
    defaultSubstitutions = response.EmailTemplateResponse.DefaultSubstitutions;  
  });
  
  const htmlBody = '<!DOCTYPE html><html lang=\"en\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"></head><body><h1>Hi {{Name}}</h1><h3>We know you live in {{Country}}</h3><p>This email has been sent via AWS Pinpoint.</p><img src=\"https://media.ajudeopequeno.org/logo_aop_whiteonliveblue-400.png\" style=\"max-width:200px\"></body></html>';

  var params = {
    ApplicationId: event.ApplicationId,
    MessageRequest: {
      Addresses: {
        'luiscabus@gmail.com': {
          ChannelType: 'EMAIL',
          TitleOverride: 'Title was overriden',
          BodyOverride: 'Mama Mia'
        }
      },
      MessageConfiguration: {
        EmailMessage: {
          Body: htmlBody,
          FromAddress: 'ThaONG Ajude o Pequeno<admin@ajudeopequeno.org>',
          SimpleEmail: {
            Subject: {
              Data: 'Test email message for test message AOP',
              Charset: 'UTF-8'
            },
            HtmlPart: {
              Data: htmlBody,
              Charset: 'UTF-8'
            }
          },
          Substitutions: {
            Name: ["Luis", "Alberto"],
            Country: ["DEFAULT_COUNTRY_SUBS"],
            Timezone: ["NoTZ_SUBS"]
          }
        }
      }
    }
  };
  
  console.log('Params', JSON.stringify(params));
  
  await pinpoint.sendMessages(params).promise().then((response) => {
    console.log('MessageResponse', JSON.stringify(response));
  }).catch((err) => {
    console.log(err);
  });

};
