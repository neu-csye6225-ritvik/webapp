#!/bin/bash
# switch to webappuser
sudo -u webappuser bash

# Configure AWS CLI for 'demo' profile
aws configure set aws_access_key_id $DEMO_AWS_ACCESS_KEY_ID --profile demo
aws configure set aws_secret_access_key $DEMO_AWS_SECRET_ACCESS_KEY --profile demo
aws configure set default.region $DEMO_AWS_REGION --profile demo

# switch to root user
exit 

# change permission of aws credentials to webappuser
sudo chown -R webappuser:webappgroup /opt/webappuser/.aws

