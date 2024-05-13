*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    log-in-log-out-keywords.resource 

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://127.0.0.1:5501/front-end/login-signup.html 
    Type Text     [id='j_email']       ${EMAIL}    delay=0.1 s 
    Type Secret   [id='j_password']    $PASSWORD      delay=0.1 s
    Click With Options    [class="loginuser"]    delay=2 s
    Wait For Elements State    css=#banner > h2

    Click With Options    css=#nav > ul > li:nth-child(4) > a
    Sleep    4s
