# serverless-plugin-dynamodb-pitr

[![Coverage Status](https://coveralls.io/repos/github/kobanyan/serverless-plugin-dynamodb-pitr/badge.svg?branch=master)](https://coveralls.io/github/kobanyan/serverless-plugin-dynamodb-pitr?branch=master)

A Serverless plugin to easily enable point in time recovery of DynamoDB Table

## Installation

```sh
npm install --save-dev serverless-plugin-dynamodb-pitr
# or
yarn add --dev serverless-plugin-dynamodb-pitr
```

## Usage

```yaml
plugins:
  - serverless-plugin-dynamodb-pitr

custom:
  dynamodbPitr:
    ignore: # Optionally - select tables to disable point in time recovery
      - TableB
      - TableD

resources:
  Resources:
    TableA: # enabled point in time recovery without PointInTimeRecoverySpecification
      Type: AWS::DynamoDB::Table
    TableB: # disabled
      Type: AWS::DynamoDB::Table
    TableC: # enabled point in time recovery without PointInTimeRecoverySpecification
      Type: AWS::DynamoDB::Table
    TableD: # disabled
      Type: AWS::DynamoDB::Table
    TableE: # enabled point in time recovery without PointInTimeRecoverySpecification
      Type: AWS::DynamoDB::Table
```

[See example](https://github.com/kobanyan/serverless-plugin-dynamodb-pitr/tree/master/example).

## License

MIT © [kobanyan](https://github.com/kobanyan)
