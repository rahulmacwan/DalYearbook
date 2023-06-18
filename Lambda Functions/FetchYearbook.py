import boto3
import json

# Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.scan
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    print("Event:", event)
    try:
        # get program_year_batch from event
        program_year_batch = json.loads(event['body'])['program_year_batch']
        print("Program Year Batch:", program_year_batch)

        # scan DynamoDB table to get all items with program_year_batch equal to program_year_batch from event
        # Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.scan
        response = dynamodb.scan(
            TableName='dalyearbook-termassignment-dynamodb-table',
            FilterExpression='program_year_batch = :program_year_batch',
            ExpressionAttributeValues={
                ':program_year_batch': {'S': program_year_batch}
            }
        )
        print("DynamoDB Scan Response:", response)
        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }

    except Exception as e:
        print("Error:", e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
