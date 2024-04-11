*** Settings ***
Library    RequestsLibrary
Library    Collections
Resource   restful_booker_keywords.resource
Suite Setup    Authenticate as Admin

*** Variables ***
${BASE_URL}    https://hyte-server.northeurope.cloudapp.azure.com

*** Test Cases ***
Get Diary Entries from Server
    ${header}=    Create Dictionary    Authorization=Bearer ${token}
    ${response}=    GET    ${BASE_URL}/api/entries    headers=${header}
    Log    ${response}
    ${entries}=    Set Variable    ${response.json()}
    Log    ${entries}
    Status Should Be    200

Create a Diary Entry on Server
    ${header}=    Create Dictionary    Authorization=Bearer ${token}
    ${data}=    Create Dictionary    mood=good    sleep=9    notes=slept well
    ${response}=    POST    ${BASE_URL}/api/entries    json=${data}    headers=${header}
    Log    ${response}
    ${id}=    Set Variable    ${response.json()} [id]
    Log     ${id}
    Set Suite Variable    ${id}
    Status Should Be    201

