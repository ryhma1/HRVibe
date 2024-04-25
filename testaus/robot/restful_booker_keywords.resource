<<<<<<< HEAD
*** Keywords *** 
Authenticate as Admin
    ${body}    Create Dictionary    username=soni   password=soninkarva
    ${response}    POST    url=https://hyte-server.northeurope.cloudapp.azure.com/api/auth/login  json=${body}
=======
*** Keywords ***
Authenticate as Admin
    ${body}    Create Dictionary    username=soni    password=soninkarva
    ${response}    POST    url=https://hyte-server.northeurope.cloudapp.azure.com/api/auth/login    json=${body}
>>>>>>> vko4
    Log    ${response.json()}
    ${token}    Set Variable    ${response.json()}[token]
    Log    ${token}
    Set Suite Variable    ${token}