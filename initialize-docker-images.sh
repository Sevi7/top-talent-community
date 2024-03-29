#!/usr/bin/env sh
docker network create top-talent-community-network
docker run -d --network top-talent-community-network -v "$PWD":/dynamodb_local_db -p 8000:8000 \
    --network-alias=dynamodb --name dynamodb \
    amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb
aws dynamodb create-table --table-name Members \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --endpoint-url http://localhost:8000 \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
aws dynamodb create-table --table-name Nominations \
    --attribute-definitions AttributeName=id,AttributeType=S \
                            AttributeName=email,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --endpoint-url http://localhost:8000 \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --global-secondary-indexes \
       "[
           {
               \"IndexName\": \"EmailIndex\",
               \"KeySchema\": [{\"AttributeName\":\"email\",\"KeyType\":\"HASH\"}],
               \"Projection\":{
                   \"ProjectionType\":\"ALL\"
               },
               \"ProvisionedThroughput\": {
                   \"ReadCapacityUnits\": 5,
                   \"WriteCapacityUnits\": 5
               }
           }
       ]"
aws dynamodb put-item \
    --table-name Members \
    --endpoint-url http://localhost:8000 \
    --item '{
        "id": {"S": "4c4de188-2cf0-488d-a369-98fe42bf337b"},
        "name": {"S": "John"},
        "lastName": {"S": "Doe"},
        "birthDate": {"N": "1645387241000"},
        "email": {"S": "john@doe.com"},
        "phoneNumber": {"S": "612345678"},
        "postalCode": {"S": "38394"},
        "city": {"S": "Valencia"},
        "country": {"S": "Spain"}
      }'
aws dynamodb put-item \
    --table-name Members \
    --endpoint-url http://localhost:8000 \
    --item '{
        "id": {"S": "f3d28eb2-e58c-4d2b-880b-1ddcae026359"},
        "name": {"S": "Freddie"},
        "lastName": {"S": "Clerk"},
        "birthDate": {"N": "1645387241000"},
        "email": {"S": "freddie@clerk.com"},
        "phoneNumber": {"S": "612345699"},
        "postalCode": {"S": "59303"},
        "city": {"S": "Malaga"},
        "country": {"S": "Spain"}
      }'
docker run -d --network top-talent-community-network --network-alias=aws-ses-local --name aws-ses-local -p 9001:9001 jdelibas/aws-ses-local
