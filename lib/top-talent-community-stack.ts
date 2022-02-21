import { Construct, Stack, StackProps, Duration } from '@aws-cdk/core';
import { Function, LayerVersion, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { BuildConfig } from '../bin/config/BuildConfig';

export default class TopTalentCommunityStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);

    // ----------------------------------- DYNAMODB TABLES -----------------------------------

    const membersTable = new Table(this, 'membersTable', {
      tableName: buildConfig.Parameters.DYNAMO_TABLE_NAME_MEMBERS,
      partitionKey: { name: 'id', type: AttributeType.STRING },
    });
    membersTable.addGlobalSecondaryIndex({
      indexName: 'EmailIndex',
      partitionKey: { name: 'email', type: AttributeType.STRING },
    });

    const nominationsTable = new Table(this, 'nominationsTable', {
      tableName: buildConfig.Parameters.DYNAMO_TABLE_NAME_NOMINATIONS,
      partitionKey: { name: 'id', type: AttributeType.STRING },
    });

    // ---------------------------------------- LAMBDA ----------------------------------------

    const layer = new LayerVersion(this, 'layer', {
      code: Code.fromAsset('dist/src/layer'),
      compatibleRuntimes: [Runtime.NODEJS_14_X],
    });

    // ------------------------------------ NOMINATE PEER ------------------------------------
    const nominatePeerLambda = new Function(this, 'nominatePeer', {
      functionName: 'nominatePeer',
      handler: 'index.lambdaHandler',
      runtime: Runtime.NODEJS_14_X,
      layers: [layer],
      code: Code.fromAsset('dist/src/functions/nominatePeer'),
      timeout: Duration.seconds(15),
      environment: {
        JWT_TOKEN_KEY: buildConfig.Parameters.JWT_TOKEN_KEY,
        DYNAMO_TABLE_NAME_MEMBERS: buildConfig.Parameters.DYNAMO_TABLE_NAME_MEMBERS,
        DYNAMO_TABLE_NAME_NOMINATIONS: buildConfig.Parameters.DYNAMO_TABLE_NAME_NOMINATIONS,
        SOURCE_EMAIL: buildConfig.Parameters.SOURCE_EMAIL,
      },
    });

    membersTable.grantReadData(nominatePeerLambda);
    nominationsTable.grantReadWriteData(nominatePeerLambda);

    // ------------------------------------ LIST NOMINATIONS ------------------------------------

    const listNominationsLambda = new Function(this, 'listNominations', {
      functionName: 'listNominations',
      handler: 'index.lambdaHandler',
      runtime: Runtime.NODEJS_14_X,
      layers: [layer],
      code: Code.fromAsset('dist/src/functions/listNominations'),
      timeout: Duration.seconds(15),
      environment: {
        JWT_TOKEN_KEY: buildConfig.Parameters.JWT_TOKEN_KEY,
        DYNAMO_TABLE_NAME_NOMINATIONS: buildConfig.Parameters.DYNAMO_TABLE_NAME_NOMINATIONS,
      },
    });

    nominationsTable.grantReadData(listNominationsLambda);

    // ------------------------------------- API GATEWAY -------------------------------------

    const topTalentCommunityAPI = new HttpApi(this, 'topTalentCommunityApi');

    const nominatePeerLambdaIntegration = new HttpLambdaIntegration(
      'nominatePeerLambdaIntegration',
      nominatePeerLambda
    );

    topTalentCommunityAPI.addRoutes({
      path: '/nominations',
      methods: [HttpMethod.POST],
      integration: nominatePeerLambdaIntegration,
    });

    const listNominationsLambdaIntegration = new HttpLambdaIntegration(
      'listNominationsLambdaIntegration',
      listNominationsLambda
    );

    topTalentCommunityAPI.addRoutes({
      path: '/nominations',
      methods: [HttpMethod.GET],
      integration: listNominationsLambdaIntegration,
    });
  }
}
