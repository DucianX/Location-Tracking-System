import AWS from 'aws-sdk';
import { AWSRegions } from './types/aws';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Vendor } from './types/twitter';

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
  } catch (error: any) {
    // 如果表已存在，调用 describeTable
    if (error.code === 'ResourceInUseException') {
      console.log(`Table already exists. Fetching details for table: ${params.TableName}`);
      try {
        const tableDetails = await dynamodb
          .describeTable({ TableName: params.TableName })
          .promise();
        console.log('Table details:', tableDetails);
        return tableDetails; // 返回表的详细信息
      } catch (describeError) {
        console.error('Error describing the table:', describeError);
        throw new Error('Error describing existing table');
      }
    } 
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

// 3 - Delete a table
export const dynamodbDeleteTable = async (tableName: string) => {
  try {
    const res = await dynamodb
      .deleteTable({ TableName: tableName })
      .promise();
    console.log('Table deleted', res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('dynamodbDeleteTable error');
  }
};
// 4 - Insert a record
export const dynamodbCreateRecord = async (
  tableName: string,
  vendorData: Vendor
) => {
  try {
    const res = await dynamodb
      .putItem({ TableName: tableName, Item: marshall(vendorData) })
      .promise();
    console.log('Record created', res);
    return res;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
    console.error(error);
    throw new Error('dynamodbCreateRecord error');
  }

  
};