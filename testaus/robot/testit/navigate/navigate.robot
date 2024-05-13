*** Settings ***
Library     Browser    auto_closing_level=KEEP

*** Test Cases ***
Navigate through pages
    New Browser    firefox    headless=false  
    New Page       http://127.0.0.1:5501/front-end/logged-index.html

   
    Click With Options    xpath=//*[@id="nav"]/ul/li[2]/a
    Sleep    2s
    Click With Options    xpath=//*[@id="nav"]/ul/li[2]/ul/li[2]/a
    Sleep    2s
    Click With Options    xpath=//*[@id="nav"]/ul/li[2]/ul/li[3]/a
    Sleep    2s
    Click With Options    xpath=//*[@id="nav"]/ul/li[3]/a
    Sleep    2s
    