# serverless-plugin-dynamodb-pitr

[![codecov](https://codecov.io/gh/kobanyan/serverless-plugin-dynamodb-pitr/branch/master/graph/badge.svg?token=9RYCKLR1AY)](https://codecov.io/gh/kobanyan/serverless-plugin-dynamodb-pitr)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

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
