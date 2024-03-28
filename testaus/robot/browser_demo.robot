*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot  

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       https://hyte-server.northeurope.cloudapp.azure.com/
    Get Title      ==    Vital Track  
    Click With Options    id=loginButton    delay=1s
    Type Text    [id=käyttis]    ${Username}    delay=0.1s 
    Type Secret    [id=passis]    $Password    delay=0.1s
    Click With Options    css=.loginuser    delay=1s
    Type Text    [id=mood]        ${Mood}    delay=0.1s
    Type Text    [id=sleep_hours]    ${SleepHours}    delay=0.1s
    Type Text    [id=notes]    ${Notes}    delay=0.1s
    Click With Option 