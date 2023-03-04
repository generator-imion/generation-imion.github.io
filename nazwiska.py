from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.firefox import GeckoDriverManager 

from_list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'Ą', 'B', 'C', 'Ć', 'D', 'E,', 'Ę,', 'F','G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R','S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż']
driver = webdriver.Firefox()
nazwiska = []

print('zdobywanie nazwisk')
for page in from_list:
    driver.get('https://pl.wikipedia.org/w/index.php?title=Kategoria:Polskie_nazwiska&from=' + page)
    elements = driver.find_elements(By.TAG_NAME, 'li')
    for element in elements:
        for inner in element.find_elements(By.TAG_NAME, 'a'):
            text = inner.text

            if text == '':
                continue

            if text in ['Komunikat na temat ciasteczek', 'Statystyki', 'Dla deweloperów', 'Wersja mobilna', 'Korzystasz z Wikipedii tylko na własną odpowiedzialność', 'Polityka prywatności', 'warunkach korzystania', 'licencji Creative Commons: uznanie autorstwa, na tych samych warunkach', '中文', 'Українська', 'Türkçe', 'Svenska', 'Slovenščina', 'Slovenčina', 'Română', 'Português', '日本語', 'Magyar', 'Nederlands', 'Lietuvių', 'Latviešu', 'ქართული', 'עברית', 'Hornjoserbsce', 'Հայերեն', 'Français', 'فارسی', 'Euskara','Esperanto','Čeština', 'Dansk', 'English', 'Español', 'Polskie nazwiska', '-ski (nazwisko)', 'Europejskie nazwiska', 'Kultura w Polsce', 'Dyskusja', 'Edycje', 'Utwórz konto', 'Zaloguj się', 'Kategoria', 'Czytaj', 'Edytuj', 'Edytuj kod źródłowy', 'Historia i autorzy', 'Strona główna', 'Losuj artykuł', 'Kategorie artykułów', 'Najlepsze artykuły', 'Częste pytania (FAQ)', 'O Wikipedii', 'Zgłoś błąd', 'Kontakt', 'Wspomóż Wikipedię', 'Pierwsze kroki', 'Portal wikipedystów', 'Ogłoszenia', 'Zasady', 'Pomoc', 'Ostatnie zmiany', 'Linkujące', 'Zmiany w linkowanych', 'Prześlij plik', 'Strony specjalne', 'Link do tej wersji', 'Informacje o tej stronie', 'Element Wikidanych', 'Utwórz książkę', 'Pobierz jako PDF', 'Wersja do druku', 'Wikimedia Commons', 'العربية', 'Bân-lâm-gú', 'Беларуская', 'Brezhoneg']:
                continue

            nazwiska.append(text)

print('zdobyto nazwiska :)')
print('filtrowanie (duplikaty + "(nazwisko)")')
new_nazwiska = []
for nazw in nazwiska:
    new_nazw = nazw.replace('(nazwisko)', '').replace(' ', '')
    if not new_nazw in new_nazwiska:
        new_nazwiska.append(new_nazw)
print(f'oryginalna ilosc: {len(nazwiska)}; zflitrowana ilosc: {len(new_nazwiska)}')
print('zapisywanie do pliku...')
f = open('./nazwiska.list', 'a')
for nazw in new_nazwiska:
    f.write(nazw + '\n')
f.close()
print('zapisano')
driver.quit()