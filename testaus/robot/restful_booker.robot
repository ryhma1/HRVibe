*** Settings ***
Library    RequestsLibrary
Library    Collections
Resource   restful_booker_keywords.resource
Suite Setup    Authenticate as Admin

<<<<<<< HEAD
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
=======
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
>>>>>>> vko4

