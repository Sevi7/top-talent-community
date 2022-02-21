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
- Run the following command to create a docker network, run a local DynamoDB container in it, create the DynamoDB tables and add some items, and run a local AWS Simple Email Service:
  ```
  sh initialize-docker-images.sh
  ```
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
    sam local invoke nominatePeer -e tests/mocks/events/nominatePeer/nominatePeerRejected.json --docker-network top-talent-community-network | jq
    ```
    ```
    sam local invoke listNominations -e tests/mocks/events/listNominations/listNominationsAdmin.json --docker-network top-talent-community-network | jq
    ```
  - To debug the lambda function locally:
    - Run the following command:
      ```
      sam local invoke nominatePeer -e tests/mocks/events/nominatePeer/nominatePeerRejected.json  --debug-port 5858 --docker-network top-talent-community-network
      ```
    - Go to VSCode section __Run and Debug__ and select `Attach to SAM nominatePeer`
- To see the logs of the emails sent:
  ```
  docker logs -f aws-ses-local 
  ```
- To open an email (replace the file path with the one showed in the logs):
  ```
  docker exec -t -i aws-ses-local cat output/2022-02-21/03.22.43.40/body.txt 
  ```
- To create a local HTTP server that hosts all the lambda functions:
    ```
    sam local start-api --warm-containers EAGER --docker-network top-talent-community-network
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