import json
import boto3

#Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cognito-idp.html#CognitoIdentityProvider.Client.initiate_auth
cognito = boto3.client('cognito-idp')

def lambda_handler(event, context):
    print(event)
    
    body = json.loads(event['body'])
    email = body['email']
    password = body['password']
    
    try:
        #Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cognito-idp.html#CognitoIdentityProvider.Client.initiate_auth
        response = cognito.initiate_auth(
            ClientId='3uvt9l9hn34mc4ir17n1gtmnmd',
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': email,
                'PASSWORD': password
            }
        )
        #Reference: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cognito-idp.html#CognitoIdentityProvider.Client.respond_to_auth_challenge
        challenge_name = response.get('ChallengeName')
        if challenge_name == 'NEW_PASSWORD_REQUIRED':
            # Respond to the new password challenge
            session = response['Session']
            response = cognito.respond_to_auth_challenge(
                ClientId='3uvt9l9hn34mc4ir17n1gtmnmd',
                ChallengeName='NEW_PASSWORD_REQUIRED',
                ChallengeResponses={
                    'USERNAME': email,
                    'NEW_PASSWORD': password
                },
                Session=session
            )
        
        print(response)
        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }
    
    except cognito.exceptions.NotAuthorizedException as e:
        print(e)
        return {
            'statusCode': 401,
            'body': json.dumps('Invalid credentials')
        }
    
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps('Something went wrong')
        }
