*** Settings ***
Library    RequestsLibrary
Library    Collections
Resource   restful_booker_keywords.resource
Suite Setup    Authenticate as Admin

*** Test Cases ***
Get Diary Entries
    ${body}    Create Dictionary    Authorization=Bearer ${token}
    ${response}    GET    https://hyte-server.northeurope.cloudapp.azure.com/api/entries    ${body}
    Status Should Be    200
    Log List    ${response.json()}

Create Diary Entry
    ${header}    Create Dictionary    Authorization=Bearer ${token} username=soni    password=soninkarva 
    ${response}    POST    url=https://hyte-server.northeurope.cloudapp.azure.com/api/entries    headers=${header}
    ${entries}    Set Variable    ${response.json()}
    Set Suite Variable    ${entries}
    ${response}    GET    https://hyte-server.northeurope.cloudapp.azure.com/api/entries         
    Log    ${response.json()}

