// import images from all-images/blog-img directory
import img01 from "../all-images/blog-img/blog-1.jpg";
import img02 from "../all-images/blog-img/blog-2.jpg";
import img03 from "../all-images/blog-img/blog-3.jpg";

const blogData = [
  {
    id: 1,
    title: "Jak jeździć autem zimą",
    author: "Kacper",
    date: "12 Gru, 2023",
    time: "21:00",
    imgUrl: img01,
    description:
      "W serwisach informacyjnych co roku spotykamy się z informacjami z cyklu „zima zaskoczyła kierowców”. Prawdą jest, że w wybranych częściach kraju wystąpienie pierwszych opadów śniegu mocno się przesunęło w czasie, stąd nie da się precyzyjnie określić daty przejścia w zimowy etap eksploatacji samochodu. Kierowcy z tego powodu zwlekają z wykonaniem podstawowych czynności przed nadejściem najchłodniejszej pory roku, takich jak zmiana opon na zimowe i szersza kontrola stanu technicznego auta. Chcąc uniknąć niespodzianek podczas zimowej jazdy samochodem, warto przestrzegać się kilku zasad, dzieki którym sprawnie uporamy się z zimowymi problemami i oszczędzimy sobie nerwów. Zachowaj dystans od innych aut Powtarzana ostatnimi czasy sentencja odnośnie zachowywania dystansu idealnie obrazuje kulturę jazdy w zimie. W tym okresie szczególnie należy odrzucić nawyk podjeżdżania pod tylny zderzak poprzedzającego auta i respektować bezpieczne odległości, by w razie nagłej sytuacji zdążyć wyhamować lub mieć odpowiednio dużo czasu np. na zjechanie na pobocze. Nie trzeba nikomu uświadamiać, że na pokrytej śniegiem lub lodem nawierzchni samochód wyhamuje znacznie dalej niż gdyby podjęto manewr na suchym asfalcie – wg niektórych źródeł różnica w drodze hamowania wynosi nawet 30%. Hamowanie na śliskiej drodze autem z ABS i bez ABS W zasadzie wszystkie przytoczone w dalszej części porady sprowadzają się do jednego – uniknięcia utraty przyczepności przez koła samochodu. Prędkość przede wszystkim należy wytracać w umiejętny sposób, tj. bez nagłego wciskania pedału hamulca, a robiąc to delikatnie, nie dopuszczając tym samym do zablokowania kół w czasie jazdy. Jednocześnie starajmy się hamować silnikiem, czyli redukując biegi aż do uzyskania bezpiecznej, niewielkiej prędkości. Unikajmy tym samym jazdy na tzw. luzie i poruszania się powoli (na niskich obrotach) na wysokim biegu. Stosując taką technikę jazdy nie „wychwycimy” we właściwym momencie wpadnięcia w poślizg i nie zdążymy zareagować. Jeśli chodzi o samo hamowanie, zdecydowanie łatwiej pod tym względem mają właściciele samochodów z systemem ABS – czyli, na dobrą sprawę, zdecydowanej większości aut jeżdżących po drogach (poza zabytkowymi i youngtimerami). ABS umożliwia korektę toru jazdy w momencie wykrycia poślizgu kół, nie dopuszczając do ich zablokowania. Kierowca ma wobec tego szansę „bez szwanku” przejechać przez śliski zakręt. Żeby jednak tak się stało, mocno wcisnąć pedał hamulca i pozwolić zadziałać elektronice. Skorygowanie toru jazdy będzie wtedy o wiele łatwiejsze niż w aucie bezwiednie sunącym do przodu – a właśnie tak się stanie, gdy w samochodzie bez ABS-u na śliskiej drodze wciśniemy hamulec „do oporu”. Kolokwialnie mówiąc, ten system „wyręcza” nas od hamowania pulsacyjnego, pozwalając bardziej skupić się na korekcie kierunku jazdy auta. Technikę hamowania pulsacyjnego, czyli naprzemiennego wciskania i odpuszczania pedału hamulca, powinni z kolei stosować właściciele starszych samochodów, bez systemu ABS.",
     },

  {
    id: 2,
    title: "Co zrobić gdy rozładuję się akumulator",
    author: "Kacper",
    date: "22 Lis, 2022",
    time: "13:00",
    imgUrl: img02,
    description:
      "Rozładowany akumulator to często problem osób zapominalskich. Dlaczego tak jest? Najczęstszą  winą rozładowania jest pozostawienie włączonych w aucie urządzeń elektrycznych na długi czas. Mogą to być niewyłączone wieczorem światła, pozostawione radio czy też ładowarka do telefonu. Zwłaszcza w starszych autach z małymi akumulatorami może to spowodować rozładowywanie akumulatora. Dlatego też przed wyjściem z samochodu warto sprawdzić, czy jakieś elektryczne urządzenie nie jest włączone.\n" +
        "\n" +
        "No dobrze, wiesz już, z jakiego powodu możesz zastać rano w samochodzie głęboko rozładowany akumulator. Co w takiej sytuacji zrobić, gdy na przykład nie działa zamek centralny i nie możesz dostać się do wnętrza samochodu? W przypadku większości samochodów możesz otworzyć drzwi za pomocą kluczyka. Nie uruchomisz w ten sposób centralnego zamka, ale będziesz mógł otworzyć drzwi kierowcy oraz pasażera. Jeśli masz także tylne drzwi, będziesz mógł je otworzyć od wewnątrz. Gdy już dostaniesz się do wnętrza samochodu, możesz otworzyć maskę i zająć się ładowaniem akumulatora.\n" +
        "\n" +
        "A jak otworzyć auto z rozładowanym akumulatorem, które nie ma tradycyjnego kluczyka? Jeśli Twoje auto uruchamiane jest za pomocą karty lub pilotem, także dasz radę otworzyć je bez korzystania z centralnego zamka. Każdy pilot oraz karta ma ukryty awaryjny grot kluczyka. Jest on przeznaczony do takich właśnie sytuacji.  Zamek do samochodu, do którego pasuje ten grot, ukryty jest w klamce drzwi od strony pasażera. Najczęściej pod jakąś zaślepką, by nie zakłócać estetyki nowoczesnego pojazdu. Wystarczy włożyć kluczyk, przekręcić go i drzwi powinny się otworzyć.\n" +
        "\n" +
        "Jednak czy rozładowany akumulator sam się naładuje? I tak i nie. Jeżeli uruchomisz samochód za pomocą kabli rozruchowych, to podczas jazdy akumulator będzie się ładował. Jednak do jego pełnego naładowania potrzebna byłaby bardzo długa podróż. Natomiast jeśli pozostawisz akumulator w samochodzie i nie podłączysz do niego prostownika, niestety pozostanie on rozładowany. Im dłużej będziesz zwlekał z jego ponownym naładowaniem, tym dłużej będzie trzeba go ładować. Tak jak w przypadku długo nieużywanych telefonów komórkowych, z czasem bateria traci swoje właściwości.",
    quote:
      "Voluptua dolore takimata dolor sadipscing nonumy consetetur et. Stet sed dolores dolores dolores dolores eos.",
  },

  {
    id: 3,
    title: "Jak sprawdzić auto przed wyjazdem",
    author: "Kacper",
    date: "1 Sty, 2023",
    time: "16:00",
    imgUrl: img03,
    description:
      "Wyjazd samochodem na wakacje to wygodne rozwiązanie. Przed wyjazdem powinniśmy sprawdzić nasze auto. Przed wakacjami i w ich trakcie nie brakuje różnej maści akcji typu „przegląd wakacyjny” czy „sprawdzimy Twoje auto przed wyjazdem wakacyjnym” itd. Gdyby przeciętny kierowca miał z nich korzystać, musiałby jeździć na przegląd kilka razy w roku. Bo oprócz obowiązkowego przeglądu technicznego w Stacji Kontroli Pojazdów, mamy nieobowiązkowy przegląd po zimie, przegląd wiosenny, przegląd przed wyjazdem na wakacje, przegląd jesienny, przegląd zimowy… A za każdym razem trzeba płacić. I to niemało. Sprawdź poprawność pracy sprzęgła. Podjedź pod jakąś dość stromą górę. Sprawdź, czy samochód daje radę, czy nagle traci mnóstwo mocy. Sprawdź, czy możesz bez problemu ruszyć pod górę. Nie czuć żadnej niemiłej woni, dochodzącej ze stroni silnika (przypominającej spalony asfalt? Jest OK.\n" +
        "\n" +
        "Sprawdź poprawność pracy hamulców.\n" +
        "\n" +
        "• Zahamuj kilka razy, sprawdzając, czy auto ma właściwą siłę hamowania. Czy z hamulców nie wydobywa się żaden niepożądany odgłos, podczas hamowania? Nic nie piszczy? Nie czuć bicia na kole kierownicy? Auto nie ściąga? To dobrze. Sprawdź poziom płynu hamulcowego w zbiorniczku.\n" +
        "\n" +
        "Sprawdź piasty kół. Czy w trakcie jazdy nie dochodzi żaden hałas ze strony kół, przypominający buczenie albo wycie? To dobrze, jest OK.\n" +
        "\n" +
        "Sprawdź poprawność pracy układu czyszczenia szyb. Włącz przednie i tylne wycieraczki, spryskaj szybę. Zmieniaj intensywność ich pracy. Sprawdź, czy wycieraczki nie podskakują i nie pozostawiają smug.\n" +
        "\n" +
        "Sprawdź poprawność pracy oświetlenia zewnętrznego. Włączaj po kolei wszystkie światła zewnętrzne w aucie (drogowe czyli tzw. długie, krótkie czyli tzw. mijania, cofania, stop, kierunkowskazy, przeciwmgielnie) i sprawdź, czy działają we właściwy sposób. W autach z reflektorami ksenon sprawdź poprawność działania układu oczyszczania kloszy (wycieraczki i spryskiwacze).\n" +
        "\n" +
        "Sprawdź poprawność pracy układu kierowniczego, czy nie ma luzów na kierownicy. Skontroluj, czy samochód reaguje szybko na ruchy kierownicą. A także to, czy możesz nią obracać (w trakcie jazdy, nie na postoju) bez problemu (czy działa wspomaganie). Wszelakie podejrzane odgłosy spod maski (wycie / hałas podczas obracania kierownicą) to sygnał ostrzegawczy.\n" +
        "\n" +
        "Sprawdź poprawność pracy układu zawieszenia samochodowego. Wyjedź na drogę z gorszą, szutrową nawierzchnią, przejedź też po progach zwalniających, wsłuchaj się w pracę zawieszenia, czy nic nie stuka i nie skrzypi. Sprawdź czy samochód nie buja na nierównościach i czy nie jest podatny na porywy wiatru. Skontroluj jakość prowadzenia i to czy pojazd nie zbacza z toru jazdy (nie ściąga go) po puszczeniu kierownicy, podczas jazdy po prostej drodze (oczywiście, pustej, z dala od ruchu drogowego).\n" +
        "\n" +
        "Skontroluj właściwe ciśnienie w oponach. Użyj do tego ciśnieniomierza, albo ciśnieniomierza w pompce, nawet wtedy, gdy Twoje auto ma system TPMS pośredni (czyli korzystający z czujników prędkości obrotowej ABS). Jeśli auto ma system TPMS bezpośredni – sprawdź tylko odczyt na ekranie komputera pokładowego. Sprawdź ciśnienie w kole zapasowym. Jeśli go nie masz, to sprawdź, czy masz koło dojazdowe (i w jakim stanie), kompresor/pompkę, albo zestaw do uzupełniania powietrza w razie przebicia (stosowany w niektórych autach zamiast koła zapasowego).\n" +
        "\n" +
        "Sprawdź na desce rozdzielczej, czy nie wyświetlają się kontrolki ostrzegawcze i komunikaty na ekranie komputera pokładowego. Kontrolki ostrzegawcze mają kolor żółty (pomarańczowy) i czerwony. Jeśli takowe pojawiają się na Twojej desce rozdzielczej – sprawdź ich znaczenie. Warto też udać się do mechanika w celu przeprowadzenia diagnozy. Kontrolki oleju, temperatury płynu chłodzącego, aktywnych systemów bezpieczeństwa, układu hamulcowego kwalifikują auto do natychmiastowego skierowania do warsztatu. Warto też sprawdzić, jaką tajemnicę kryje zapalona kontrolka check engine. W niektórych autach komunikaty ostrzegawcze wyświetlają się dodatkowo na ekranie komputera pokładowego.\n" +
        "\n" +
        "Sprawdź poprawność pracy elektrycznych szyb. Sprawdź, czy przesuwają się bez problemów, czy domykają się do końca i czy nie hałasują podczas poruszania się. Dlaczego to ważne? W trakcie podróży pasażerowie, zwłaszcza dzieci, mogą co kilka minut otwierać i zamykać szyby. Trudno zostawić na parkingu auto bez sprawnych, domkniętych szyb. ",
    quote:
      "Voluptua dolore takimata dolor sadipscing nonumy consetetur et. Stet sed dolores dolores dolores dolores eos.",
  },
];

export default blogData;
