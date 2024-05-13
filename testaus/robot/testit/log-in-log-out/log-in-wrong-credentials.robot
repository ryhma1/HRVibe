*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    log-in-wrong-credentials-keywords.resource 

*** Test Cases ***
Log in, wrong credentials
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/login-signup.html  
    Type Text     [id='j_email']       ${EMAIL}    delay=0.1 s 
    Type Secret   [id='j_password']    $PASSWORD      delay=0.1 s
    #Click With Options    [class="loginuser"]    delay=2 s
    Click With Options    css=#login_form > input.loginuser