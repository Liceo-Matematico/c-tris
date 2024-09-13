# Technological recycling...and the games C-tris and 3DTris
L. Sbano: luca.sbano@liceovittoriacolonnaroma.edu.it 

M. Minno: michele.minno@liceovittoriacolonnaroma.edu.it 

Students: 
F. Archilletti, T. Corvini, A. Gentili, F.
Lentini, C. Meleka, A. Leporino, C. Piccari, G. Romani, A. Saliu, 
D. D’Ambrosio e F. Troiani 

# 

Alcune decine di anni fa l’interesse per le scienze veniva a volte
veicolato dalla necessità di dover riparare oggetti prodotti da una
tecnologia in cui era possibile ***aprire la scatola e guardarci dentro***
credo che chi ha più di cinquanta anni possa avere ancora il ricordo
del riparatore TV e dello stupore e delle domande che in molti di
noi induceva la vista dell’interno di un televisore...
Oggi questa esperienza `e praticamente resa impossibile dagli
avanzamenti tecnologici che, pur avendo realizzato sviluppi
dall’aspetto fantascientifico, sta inducendo l’idea che tali risultati
siano separati dal progresso scientifico ed in particolare dalla
scienza che si studia a scuola...

E possibile tornare ad ***aprire la scatola*** e cercare di capire quali
leggi ne governano il funzionamento?
Apriamo la prima scatola...e...
***Cosa vi aspettereste aprendo una confezione sulla quale si dichiara
che contiene esperienze sull’energia solare?***
#
# INTRODUZIONE ALL'ELETTRONICA
- Dotazione incompleta PNRR che non ti aspetti: elettronica di
controllo con microcontrollore per pannelli solari ***senza almeno
una cella solari...MA con una sola fotoresistenza ;-).***

- Utilizzare i componenti ricevuti per far scoprire agli studenti
semplici circuiti elettronici ed esplorare il funzionamento e la
programmazione di un microcontrollore.

- Uso di software open source per la gestione del
microcontrollore e della simulazione di circuiti.
#
# UN GIOCO INGEGNOSO
- Lo stimolo è venuto dal seminario sul QTris del prof Aliscia
Hamma dell’Università di Napoli svolto nel contesto delle
attivit`a di fisica per il LM di Roma 1 coordinate dal prof
Sergio Caprara: utilizzare il gioco del Tris per introdurre le
leggi della meccanica quantistica.

- Utilizziamo il gioco del Tris per introdurre l’algebra dei numeri
complessi ed il prodotto vettoriale in coordinate...e, se si
vuole, anche i quaternioni.
#
# IL RIUSO DEL GIOCO DEL TRIS
## C-TRIS
- Si gioca con 4 simboli: G = {±1, ±i} (gruppo
abeliano).
- Due o quattro giocatori. Inizialmente ogni giocatore estrae
una carta e la dispone sul campo del Tris fino a completare le
9 caselle.
- Ogni giocatore estrae a caso 1 simbolo, se in due ciascun
giocatore estrae 2 simboli.
- Ad ogni giocatore vengono distribuite 2 carte. Scopo `e
realizzare tris di simboli uguali utilizzando la tabella dei
prodotti:

| Prodotto | 1 | -1 | i | -i |
| :---     |     :---:      |     :---:      |    :---:       |       ---:    |
| **1**   | 1    | -1     | i     | -i    |
| **-1**  | -1   | 1   | -i     | i   |
| **i**  | i | -i | 1 | -1  |
| **-i**  | -i     | i | -1 | 1 |



