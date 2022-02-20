## Top Talent Community
An API for top talent community members to nominate their peers.

### Prerequisites
- Install AWS CLI
  - https://docs.aws.amazon.com/es_es/cli/latest/userguide/install-cliv2.html
  - Run `aws configure` and add dummy values for *AWS Access Key ID* and *AWS Secret Access Key*. Write `eu-west-2` for *Default region name*.
- Install Docker
- Install AWS SAM CLI (for testing locally)
  - Creating an AWS Account is not needed, you can go directly to the last steps.
  - https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html
- Install dependencies in root folder and in `src/layer/nodejs` folder.

### Testing Locally
- Compile TypeScript files
  ```
  npm run build
  ```
- Synthesize the CloudFormation template:
  ```
  npm run cdk:synth
  ```
- Use AWS SAM CLI for testing locally the resources of the CloudFormation template generated.
  - To invoke the lambda function locally (you can use a different event by replacing the file path after `-e`):
    ```
    sam local invoke nominatePeer -e tests/mocks/events/nominatePeer/nominatePeerValid.json | jq
    ```

### Deployment in AWS (not needed)
  - The first time you need to bootstrap your AWS environment
    ```
    npm run cdk bootstrap -- aws://ACCOUNT-NUMBER-1/REGION-1
    ```
  - Compile TypeScript files
    ```
    npm run build
    ```
  - Deploy the CDK App into the AWS environment
    ```
    npm run cdk:deploy
    ```