*** Settings ***
Library    QWeb     # Import library

*** Test Cases ***
Basic interaction
    OpenBrowser         https://qentinelqi.github.io/shop      firefox  # Avaa Firefox ja url
    VerifyText          The animal friendly clothing company            # Tarkista sivun otsikko
    ClickText           Scar the Lion                                   # Klikkaa tekstilinkiä: Scar the Lion
    ClickText           Add to cart                                     # Klikkaa nappulaa (Button): Add to cart
    DropDown            Size            Large                           # Valitse (Large) alasvetovalikosta (Size)