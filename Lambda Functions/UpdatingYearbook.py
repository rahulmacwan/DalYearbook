import json
import boto3
import base64


#Referenece: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.put_object
s3 = boto3.resource('s3')
#Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.get_item
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('dalyearbook-termassignment-dynamodb-table')

def lambda_handler(event, context):
    body = json.loads(event['body'])

    student_email = body['student_email']
    program_year_batch = body['programYearBatch']
    firstName = body['firstName']
    lastName = body['lastName']
    yearbookQuote = body['yearbookQuote']
    advice = body['advice']

#Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.get_item
    # check if the email exists in the table
    response = table.get_item(
        Key={
            'student_email': student_email,
            'program_year_batch': program_year_batch
        }   
    )
    if 'Item' in response:
        # email exists, check if program_year_batch matches
        item = response['Item']
        if item['program_year_batch'] == program_year_batch:

            #Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.update_item
            # program_year_batch matches, update the item
            table.update_item(
                Key={
                    'student_email': student_email,
                    'program_year_batch': program_year_batch
                },   
                #Reference: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html
                UpdateExpression='set first_name = :fn, last_name = :ln, yearbook_quote = :yq, advice = :ad',
                ExpressionAttributeValues={
                    ':fn': firstName,
                    ':ln': lastName,
                    ':yq': yearbookQuote,
                    ':ad': advice
                }
            )

            # Upload photo to S3 if it exists and item is updated successfully
            if body['photo']:
                try:
                    # Decode the base64-encoded image data
                    photo_data = base64.b64decode(body['photo']['data'])

                    # Upload the photo to S3
                    bucket = 'dalyearbook-termassignment-bucket-csci5409bs'
                    key = f"{student_email}_{program_year_batch.replace(' ', '_')}.jpg"
                    #Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Bucket.put_object
                    s3.Bucket(bucket).put_object(Key=key, Body=photo_data, ContentType=body['photo']['contentType'])

                    # Get the object URL and update the photo_url attribute in DynamoDB
                    object_url = f"https://{bucket}.s3.amazonaws.com/{key}"
                    table.update_item(
                        Key={
                            'student_email': student_email,
                            'program_year_batch': program_year_batch
                        },
                        #Reference: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html
                        UpdateExpression='set photo_url = :pu',
                        ExpressionAttributeValues={
                            ':pu': object_url
                        }
                    )
                except Exception as e:
                    print(f"Error uploading photo to S3: {e}")
                    return {
                        'statusCode': 500,
                        'body': json.dumps({'message': 'Error uploading photo to S3.'})
                    }

            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Item updated successfully.'})
            }
        else:
            # program_year_batch does not match
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Program, year, or batch does not match.'})
            }
    else:
        # email does not exist in the table
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'Email not found in the table.'})
        }
