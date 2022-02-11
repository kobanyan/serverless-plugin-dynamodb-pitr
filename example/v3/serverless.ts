import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'serverless-plugin-dynamodb-pitr-example-v3',
  frameworkVersion: '3',
  custom: {
    dynamodbPitr: {
      ignore: ['ExcludedTable'],
    },
  },
  plugins: {
    localPath: '../../../',
    modules: ['serverless-plugin-dynamodb-pitr'],
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      IncludedTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          TableName: 'IncludedTable',
        },
      },
      ExcludedTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          TableName: 'ExcludedTable',
        },
      },
      WithoutPropertiesTable: {
        Type: 'AWS::DynamoDB::Table',
      },
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
      },
    },
  },
};

module.exports = serverlessConfiguration;
