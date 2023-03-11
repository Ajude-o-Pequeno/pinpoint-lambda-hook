const { handler } = require('../src/handlers/campaign-hook-get-template')

event = {
	ApplicationId: "da413ad08e82424ca7092a0900da7bfb",
	CampaignId: "e040d98379734c32ab9c17a1b28fc8a1"
}

// const path = require('path')
// const aws_config = path.resolve(__dirname, '../aws-config.json')
// const AWS = require('aws-sdk')
// AWS.config.loadFromPath(aws_config)

handler(event);
