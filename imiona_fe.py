from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from webdriver_manager.firefox import GeckoDriverManager 

driver = webdriver.Firefox()
imiona = []

links = [
    'https://pl.wiktionary.org/w/index.php?title=Kategoria:J%C4%99zyk_polski_-_imiona_%C5%BCe%C5%84skie&pageuntil=Fryderyka#mw-pages',
    'https://pl.wiktionary.org/w/index.php?title=Kategoria:J%C4%99zyk_polski_-_imiona_%C5%BCe%C5%84skie&pagefrom=Fryderyka#mw-pages',
    'https://pl.wiktionary.org/w/index.php?title=Kategoria:J%C4%99zyk_polski_-_imiona_%C5%BCe%C5%84skie&pagefrom=Mirela#mw-pages',
]

print('zdobywanie imion')

for link in links:
    driver.get(link)
    time.sleep(1)
    driver.refresh()
    print(driver.current_url)
    elements = driver.find_elements(By.TAG_NAME, 'li')
    for element in elements:
        for inner in element.find_elements(By.TAG_NAME, 'a'):
            text = inner.text

            if text == '':
                continue

            if text in ['Informacje prawne', 'O Wikisłowniku', 'Statystyki oglądalności strony', 'Zgłoś błąd w haśle', 'Losuj język', 'Losowa strona', 'Gramatyki', 'Słowniki tematyczne', 'Spis języków', 'Indeks alfabetyczny', 'Język polski - nazwy własne', 'Wyświetl historię', 'Imiona żeńskie wg języków', 'Ukryte kategorie', 'Komunikat na temat ciasteczek', 'Statystyki', 'Dla deweloperów', 'Wersja mobilna', 'Korzystasz z Wikipedii tylko na własną odpowiedzialność', 'Polityka prywatności', 'warunkach korzystania', 'licencji Creative Commons: uznanie autorstwa, na tych samych warunkach', '中文', 'Українська', 'Türkçe', 'Svenska', 'Slovenščina', 'Slovenčina', 'Română', 'Português', '日本語', 'Magyar', 'Nederlands', 'Lietuvių', 'Latviešu', 'ქართული', 'עברית', 'Hornjoserbsce', 'Հայերեն', 'Français', 'فارسی', 'Euskara','Esperanto','Čeština', 'Dansk', 'English', 'Español', 'Polskie nazwiska', '-ski (nazwisko)', 'Europejskie nazwiska', 'Kultura w Polsce', 'Dyskusja', 'Edycje', 'Utwórz konto', 'Zaloguj się', 'Kategoria', 'Czytaj', 'Edytuj', 'Edytuj kod źródłowy', 'Historia i autorzy', 'Strona główna', 'Losuj artykuł', 'Kategorie artykułów', 'Najlepsze artykuły', 'Częste pytania (FAQ)', 'O Wikipedii', 'Zgłoś błąd', 'Kontakt', 'Wspomóż Wikipedię', 'Pierwsze kroki', 'Portal wikipedystów', 'Ogłoszenia', 'Zasady', 'Pomoc', 'Ostatnie zmiany', 'Linkujące', 'Zmiany w linkowanych', 'Prześlij plik', 'Strony specjalne', 'Link do tej wersji', 'Informacje o tej stronie', 'Element Wikidanych', 'Utwórz książkę', 'Pobierz jako PDF', 'Wersja do druku', 'Wikimedia Commons', 'العربية', 'Bân-lâm-gú', 'Беларуская', 'Brezhoneg']:
                continue
            
            imiona.append(text)

driver.close()
print('zdobyto imiona')
print('its filtering time')

new_imiona = []
for imie in imiona:
    print(imie)
    new_imie = imie.replace(' ', '')
    print(new_imie, imie, '+++=')
    
    if not new_imie in new_imiona:
        new_imiona.append(new_imie)

print('filtering time over.')
print('zapisawynanwuhwioie do pliku')
f = open('./imiona_woman.list', 'a')
for imie in new_imiona:
    f.write(imie + '\n')

f.close()

print('zapisano')
print(f'oryginalna ilosc: {len(imiona)}; po filteringu: {len(new_imiona)}')