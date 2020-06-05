import argparse
import json
import os
import subprocess
import boto3
from botocore import xform_name

# need to create a custom session
def record_as_env_var(stack_name, stage):

    # Get stack info (want table name and value)
    session = boto3.Session()#profile_name='vocareum')
    cloudformation = session.client('cloudformation', region_name='us-west-2')
    response = cloudformation.describe_stacks(
        StackName=stack_name
    )
    
    # `aws cloudformation deploy --template-file resources.json --stack-name <STACKNAME>`
    # creates the stack that is then queried and that output is placed in `outputs`
    outputs = response['Stacks'][0]['Outputs']

    # Open config file and check if "stages" "dev" (assuming dev) "environment_variables" exists
    with open(os.path.join('.chalice', 'config.json')) as f:
        data = json.load(f)
        data['stages'].setdefault(stage, {}).setdefault(
            'environment_variables', {}
        )

        # Write that table name to the environment variable
        for output in outputs:
            data['stages'][stage]['environment_variables'][
                _to_env_var_name(output['OutputKey'])] = output['OutputValue']

        # Get the other environment variables (OpenWeather, MTBProject, Maps) from the deployment box
        data['stages'][stage]['environment_variables'][
            'MTBPROJECT_API_KEY'] = os.environ['MTBPROJECT_API_KEY']
        
        data['stages'][stage]['environment_variables'][
            'WEATHER_API_KEY'] = os.environ['WEATHER_API_KEY']
 
        data['stages'][stage]['environment_variables'][
            'GOOGLE_MAP_API_KEY'] = os.environ['GOOGLE_MAP_API_KEY']

    with open(os.path.join('.chalice', 'config.json'), 'w') as f:
        serialized = json.dumps(data, indent=2, separators=(',', ': '))
        f.write(serialized + '\n')


def _to_env_var_name(name):
    return xform_name(name).upper()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-s', '--stage', default='dev')
    parser.add_argument('--stack-name', required=True)
    args = parser.parse_args()
    record_as_env_var(stack_name=args.stack_name, stage=args.stage)


if __name__ == '__main__':
    main()