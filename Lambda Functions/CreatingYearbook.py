import json
import boto3
import uuid
from botocore.exceptions import ClientError

#Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.put_item
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('dalyearbook-termassignment-dynamodb-table')
#Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.put_object
ses = boto3.client('ses')

def lambda_handler(event, context):
    print(event)
    try:
        data = json.loads(event['body'])
        yearbook_id = str(uuid.uuid4())
        program_year_batch = data['program_year_batch']
        graduation_batch = data['graduation_batch']
        graduation_year = data['graduation_year']
        student_email = data['student_email']
        program = data['program']
        print(program)

        emails = ''.join(student_email).replace('\\','').replace('"','').split(',')
        filtered_emails = list(filter(None, [email.strip() for email in emails]))
        print(filtered_emails)


        for email in filtered_emails:
            item = {
                'yearbook_id': yearbook_id,
                'program_year_batch': program_year_batch,
                'graduation_batch': graduation_batch,
                'graduation_year': graduation_year,
                'student_email': email,
                'program': program,
                'first_name': '',
                'last_name': '',
                'advice': '',
                'yearbook_quote': '',
                'photo_url': ''
            }
            #Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.put_item   
            table.put_item(Item=item)
            send_email(email)

        response = {
            'statusCode': 200,
            'body': 'Yearbook created successfully!'
        }

    except Exception as e:
        print(str(e))
        response = {
            'statusCode': 500,
            'body': 'Error creating yearbook. Please try again.'
        }

    return response

def send_email(recipient):
    SENDER = "Rahul <sticknet.assist@gmail.com>"
    RECIPIENT = recipient
    SUBJECT = "Yearbook Form Link"
    BODY_TEXT = f"Please fill out the yearbook form at the following link: http://3.144.26.102:3000"
    
    CHARSET = "UTF-8"
    #Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/ses.html#SES.Client.send_email
    try:
        response = ses.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
            },
            Message={
                'Body': {
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source=SENDER,
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print(f"Email sent to {RECIPIENT}! Message ID: {response['MessageId']}")
