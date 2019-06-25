import * as Serverless from 'serverless';

interface Hooks {
  [key: string]: () => Promise<void>;
}

export interface Service {
  custom?: {
    dynamodbPitr?: {
      ignore?: string[];
    };
  };
  resources?: {
    Resources?: {
      [key: string]: {
        Type: string;
        Properties?: {
          PointInTimeRecoverySpecification?: {
            PointInTimeRecoveryEnabled?: boolean;
          };
        };
      };
    };
  };
}

export default class ServerlessDynamoDbPitr {
  private serverless: Serverless;
  public hooks: Hooks;
  public constructor(serverless: Serverless) {
    this.serverless = serverless;
    this.hooks = {
      'package:compileEvents': this.compile,
    };
  }
  public compile = async (): Promise<void> => {
    const service = this.serverless.service as Service;
    const ignore =
      (service.custom &&
        service.custom.dynamodbPitr &&
        service.custom.dynamodbPitr.ignore) ||
      [];
    if (!Array.isArray(ignore)) {
      throw new Error(
        'Invalid config. custom.dynamodbPitr.ignore is not Array of strings.'
      );
    }
    const resources = (service.resources && service.resources.Resources) || {};
    Object.keys(resources)
      .filter(
        (resourceName): boolean =>
          resources[resourceName].Type === 'AWS::DynamoDB::Table' &&
          !ignore.includes(resourceName)
      )
      .forEach((resourceName): void => {
        const resource = resources[resourceName];
        if (!resource.Properties) {
          resource.Properties = {};
        }
        resource.Properties.PointInTimeRecoverySpecification = {
          PointInTimeRecoveryEnabled: true,
        };
      });
  };
}
