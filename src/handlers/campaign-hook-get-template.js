/**
  This snippet will use the campaign event to get the TemplateName.
  Then will send a message through Pinpoint API using the given TemplateName.
  The given template may already have it's default substitutions.
**/

const AWS = require('aws-sdk')
const pinpoint = new AWS.Pinpoint()

const getTemplateName = async (appId, cmpId) => {
  const response = await pinpoint.getCampaign({
    ApplicationId: appId,
    CampaignId: cmpId
  }).promise()
  return response.CampaignResponse.TemplateConfiguration.EmailTemplate.Name
}

const recipientAddress = 'luiscabus@gmail.com'
const senderAddress: 'Tha ONG Ajude o Pequeno <admin@ajudeopequeno.org>'

const sendMessage = async (appId, templateName) => {
  var params = {
    ApplicationId: appId,
    MessageRequest: {
      Addresses: {
        [recipientAddress]: {
          ChannelType: 'EMAIL'
        }
      },
      MessageConfiguration: {
        EmailMessage: {
          FromAddress: senderAddress,
        }
      },
      TemplateConfiguration: {
        EmailTemplate: {
          Name: templateName
        }
      }
    }
  }
  console.log('Message parameters:', JSON.stringify(params))
  
  const response = await pinpoint.sendMessages(params).promise()
  return response
}


exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event))

  const templateName = await getTemplateName(event.ApplicationId, event.CampaignId)
  console.log('Template name:', templateName)

  const messageSent = await sendMessage(event.ApplicationId, templateName)
  console.log('Message sent:', JSON.stringify(messageSent))
}
