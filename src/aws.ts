import AWS from 'aws-sdk';
import { AWSRegions } from './types/aws';

AWS.config.update({ region: AWSRegions.US_EAST_1 });


const { DynamoDB } = AWS;

const dynamodb = new DynamoDB();

// 1 -  Create a table
export const dynamodbCreateTable = async (
  params: AWS.DynamoDB.CreateTableInput
) => {
  try {
    const res = await dynamodb.createTable(params).promise();
    console.log('Table created', res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('dynamodbCreateTable error');
  }
};

// 2 - Describe a table
export const dynamodbDescribeTable = async (tableName: string) => {
  try {
    const res = await dynamodb
      .describeTable({ TableName: tableName })
      .promise();
    console.log('Table retrieved', res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('dynamodbDescribeTable error');
  }
};