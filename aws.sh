aws lambda add-permission \
--function-name test-pinpoint-hook-template-edit \
--statement-id sid0 \
--action lambda:InvokeFunction \
--principal pinpoint.us-east-1.amazonaws.com \
--source-arn arn:aws:mobiletargeting:us-east-1:983768870733:apps/* \
--source-account 983768870733
