/**
  This snippet will use an htmlBody string with fields for replacement.
  Then will send a message through Pinpoint API using the given htmlBody.
  The fields will be replaced by the Substitution keys with respective name.
**/

const AWS = require('aws-sdk')
const pinpoint = new AWS.Pinpoint()

const htmlBody = '<!DOCTYPE html><html lang=\"en\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"></head><body><h1>Hi {{Name}}</h1><h3>We know you live in {{Country}}</h3><p>And your Timezone may be {{Timezone}}</p><p>This email has been sent via AWS Pinpoint.</p><img src=\"https://media.ajudeopequeno.org/logo_aop_whiteonliveblue-400.png\" style=\"max-width:200px\"></body></html>'

const sendMessage = async (appId) => {
  var params = {
    ApplicationId: appId,
    MessageRequest: {
      Addresses: {
        'luiscabus@gmail.com': {
          ChannelType: 'EMAIL',
          TitleOverride: 'This title doesn\'t work',
          BodyOverride: 'Mama Mia'
        }
      },
      MessageConfiguration: {
        EmailMessage: {
          Body: htmlBody,
          FromAddress: 'ThaONG Ajude o Pequeno <admin@ajudeopequeno.org>',
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
            Name: ["Luis"],
            Country: ["DEFAULT_COUNTRY_subs"]
          }
        }
      }
    }
  }
  console.log('Message parameters:', JSON.stringify(params))
  
  const response = await pinpoint.sendMessages(params).promise()
  return response
}

exports.handler = async (event) => {
  console.log('Received event', JSON.stringify(event))
  
  const messageSent = await sendMessage(event.ApplicationId)
  console.log('Message sent:', JSON.stringify(messageSent))
}
