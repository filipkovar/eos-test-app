# EosTestApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

---

## Projekt

# Správce týmů ve sportovním klubu

## Cíl projektu: 
Vytvoření modulu pro správu týmů a jejich soupisek v rámci aplikace pro správu sportovních klubů. Modul umožní vytvářet,
upravovat, prohlížet a mazat informace o týmech, včetně možnosti spravovat složení týmů (soupisky).

## Základní požadavky:

1. Technologický stack:
- Angular (v libovolné verzi)
- RxJS

2. Obrazovky aplikace:
- Obrazovka s výpisem všech týmů a s akcí pro přidání nového týmu (formou dialogu nebo samostatné stránky). U nového týmu stačí
pro jednoduchost evidovat pouze název.
- Obrazovka pro detail týmu se seznamem všech členů zařazených do daného týmu a 3 akcemi
    - editace týmu (formou dialogu nebo samostatné stránky)
    - odstranění týmu (s potvrzením o smazání)
    - akce pro přiřazení člena na soupisku (formou dialogu nebo samostatné stránky)
- Přiřazení člena na soupisku - formulář
    - výběr z dostupných členů (načtených asynchronně - stačí použít statická fake data)
    - výběr, zda má být člen přiřazen jako hráče, trenéra, nebo oboje
    - možnost nastavit pozici (stačí textově)

3. Technologické řešení:
- Vytvoření fake services pro simulování komunikace s BE (CRUD pro týmy a správu soupisek)
- Fake service pro načtení členů dostupných pro zařazení do týmu
- Od začátku počítat se snadnou rozšiřitelností aplikace

4. Uživatelské rozhraní a UX:
- Využití libovolného existujícího UI frameworku nebo vytvoření jednoduchého vlastního

# Bonusové úkoly (volitelné):
- Přidání funkcionality hledání - pomocí jména člena najít všechny týmy, kde je člen na soupisce
- Vytvoření tematických stylování pro různé sportovní kluby pomocí css proměnných
- Využití Nrwl Nx

# Odevzdání:
Zdrojový kód pushnutý do Git repozitáře (např. GitHub, Bitbucket) s README souborem, který obsahuje instrukce pro spuštění projektu
a přehled implementovaných funkcionalit.

# Infomace k projektu:
Projekt není nikde veřejně nasazen. Je nutné si stáhnout z repozatáře a rozjet na lokílním prostředí.

- data pro projekt jsou v přiložených JSON souborech (v projektu je i funkce, kterou bylo vygenerováno)
- projekt obsahuje jednoduchou hlavičku s názvem projektu a odkazem pro přesměrování na list (v případě menšího rozlišení se nastaví na "hamburger menu")
- dle zadání je obsahuje projekt dvě samostatné stránky pro list a detail (aktuálně je list považován na "Homepage")
- na listu je k dispozici:
    - možnost vyhledat pomocí textu všechny kluby, v jejichž členech se daný text nachází
    - tlačítko pro přidání klubu do systému (součástí tabulky s výpisem klubů)
    - je seznam všech týmů
        - seznam obsahuje jméno klubu a ikonu na konci řádku, přes kterou se lze prokliknout na detail klubu
        - na detail klubu se lze také prokliknout přes řádek příslušného klubu, tedy kliknout kdekoliv do řádku
- na detailu týmu:
    - doplnit člena týmu
        - dialog v možností vybrat člena z existujících (načteno z JSON souboru - testovací data)
    - možnost editovat název týmu
    - možnost smazat tým
        - potvrzovací dialog
    - seznam s členy
        - zobrazení základních informací
        - možnost editovat člena
            - dialog s možností editace pozice, je trenér, je hráč
            - nelze editovat jméno a příjmení
- nad hlavičkou lze změnit barvu pozadí hlavičky

