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

  // subject
  // htmlTemplate
  // defaultSubstitutions

  // var params = {
  //   ApplicationId: event.ApplicationId,
  //   MessageRequest: {
  //     Addresses: {
  //       "luiscabus@gmail.com": {
  //         ChannelType: 'EMAIL',
  //         TitleOverride: 'Title was overriden'
  //       }
  //     },
  //     MessageConfiguration: {
  //       EmailMessage: {
  //         FromAddress: 'admin@ajudeopequeno.org',
  //         SimpleEmail: {
  //           Subject: {
  //             Charset: 'UTF-8',
  //             Data: subject
  //           },
  //           HtmlPart: {
  //             Charset: 'UTF-8',
  //             Data: htmlTemplate
  //           }
  //         },
  //         Substitutions: {
  //           Country: ["DEFAULT_COUNTRY_SUBS"],
  //           Timezone: ["NoTZ_SUBS"]
  //         }
  //       }
  //     }
  //   }
  // };
  
  // var params = {
  //   ApplicationId: event.ApplicationId,
  //   MessageRequest: {
  //     Addresses: {
  //       "luiscabus@gmail.com": {
  //         ChannelType: 'EMAIL',
  //         TitleOverride: 'Title was overriden'
  //       }
  //     },
  //     MessageConfiguration: {
  //       EmailMessage: {
  //         Body: htmlTemplate,
  //         FromAddress: 'admin@ajudeopequeno.org',
  //         Substitutions: {
  //           Country: ["DEFAULT_COUNTRY_SUBS"],
  //           Timezone: ["NoTZ_SUBS"]
  //         }
  //       }
  //     },
  //     TemplateConfiguration: {
  //       EmailTemplate: {
  //         Name: "test_empty_template"
  //       }
  //     }
  //   }
  // };

  var params = {
    ApplicationId: event.ApplicationId,
    MessageRequest: {
      Addresses: {
        "luiscabus@gmail.com": {
          ChannelType: 'EMAIL',
          TitleOverride: 'Title was overriden'
        }
      },
      MessageConfiguration: {
        EmailMessage: {
          Body: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n</head>\n<body>\n    <h1>Hi User, this is our first interaction with you</h1>\n    <p>This email has been sent via AWS Pinpoint campaign, and I think you will like it.</p>\n    <img src=\"https://media.ajudeopequeno.org/logo_aop_whiteonliveblue-400.png\" style=\"max-width:300px\">\n</body>\n</html>",
          FromAddress: "ONG Ajude o Pequeno<admin@ajudeopequeno.org>",
          SimpleEmail: {
            Subject: {
              Data: "Test email message for test message AOP",
              Charset: "UTF-8"
            },
            HtmlPart: {
              Data: htmlTemplate,
              Charset: "UTF-8"
            }
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
