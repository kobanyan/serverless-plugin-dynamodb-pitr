import Plugin, { Service } from '../src/index';

describe('index', () => {
  const doCompile = async (serverless: any): Promise<Service> => {
    const plugin = new Plugin(serverless);
    await plugin.compile();
    return serverless.service as Service;
  };
  describe('service.resouces is undefined', () => {
    it('should have no effect', async () => {
      const service = await doCompile({
        service: {},
      });
      expect(service.resources).toBeUndefined();
    });
  });
  describe('service.resouces.Resources is undefined', () => {
    it('should have no effect', async () => {
      const service = await doCompile({
        service: {
          resources: {},
        },
      });
      expect(service.resources!.Resources).toBeUndefined();
    });
  });
  describe('Resource is not a DynamoDB Table', () => {
    it('should have no effect', async () => {
      const Resources = {
        SQSQueue: {
          Type: 'AWS::SQS::Queue',
        },
      };
      const service = await doCompile({
        service: {
          resources: {
            Resources,
          },
        },
      });
      expect(service.resources!.Resources).toEqual(Resources);
    });
  });
  describe('custom.dynamodbPitr.ignore is set', () => {
    it('should have no effect', async () => {
      const Resources = {
        Table: {
          Type: 'AWS::DynamoDB::Table',
        },
      };
      const service = await doCompile({
        service: {
          custom: {
            dynamodbPitr: {
              ignore: ['Table'],
            },
          },
          resources: {
            Resources,
          },
        },
      });
      expect(service.resources!.Resources).toEqual(Resources);
    });
  });
  describe('custom.dynamodbPitr.ignore is not array of strings', () => {
    it('should throw error', async () => {
      await expect(
        doCompile({
          service: {
            custom: {
              dynamodbPitr: {
                ignore: 'Table',
              },
            },
          },
        })
      ).rejects.toThrowError(
        'Invalid config. custom.dynamodbPitr.ignore is not Array of strings.'
      );
    });
  });
  it('should enable point in time recovery', async () => {
    const service = await doCompile({
      service: {
        resources: {
          Resources: {
            TableWithProperties: {
              Type: 'AWS::DynamoDB::Table',
              Properties: {},
            },
            TableWithoutProperties: {
              Type: 'AWS::DynamoDB::Table',
            },
          },
        },
      },
    });
    expect(service.resources!.Resources).toEqual({
      TableWithProperties: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
        },
      },
      TableWithoutProperties: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
        },
      },
    });
  });
});
