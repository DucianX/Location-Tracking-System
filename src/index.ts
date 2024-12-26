
import { dynamodbCreateTable, dynamodbDescribeTable } from './aws';

const init = async () => {
  const TABLE_NAME_CONST = 'vendors';

  const vendorsTestTableParams: AWS.DynamoDB.CreateTableInput = {
    TableName: TABLE_NAME_CONST,
    KeySchema: [{ AttributeName: 'twitterId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'twitterId', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  // 1 - create table
    // dynamodbCreateTable(vendorsTestTableParams);

  // 2 - describe table
    dynamodbDescribeTable(TABLE_NAME_CONST);
};

init();
