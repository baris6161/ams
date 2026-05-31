/* ============================================================
   Shared data + minimal custom line-glyphs
   ============================================================ */
const { createElement: h } = React;

/* --- Minimal stroke glyphs (geometric, thin) --- */
function Glyph({ d, size = 24, sw = 1.5, fill, ...rest }) {
  return h("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: fill ? "none" : "currentColor", strokeWidth: sw,
    strokeLinecap: "round", strokeLinejoin: "round", ...rest },
    Array.isArray(d) ? d.map((p, i) => h("path", { key: i, d: p, fill: fill || "none" })) : h("path", { d, fill: fill || "none" }));
}

const Icons = {
  car: (p) => h(Glyph, { d: ["M3 13l1.6-4.2A3 3 0 0 1 7.4 7h9.2a3 3 0 0 1 2.8 1.8L21 13", "M3 13h18v4a1 1 0 0 1-1 1h-1.5", "M5.5 18H4a1 1 0 0 1-1-1v-4", "M6.5 18a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z M14.5 18a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"], ...p }),
  bolt: (p) => h(Glyph, { d: "M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z", ...p }),
  shield: (p) => h(Glyph, { d: ["M12 3l7 2.5v5.5c0 5-3.5 8-7 9.5-3.5-1.5-7-4.5-7-9.5V5.5L12 3z", "M9 12l2 2 4-4.5"], ...p }),
  truck: (p) => h(Glyph, { d: ["M2 7h11v9H2z", "M13 10h4l3 3v3h-7z", "M5 16a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 0 0-3.2 0z M14.5 16a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 0 0-3.2 0z"], ...p }),
  euro: (p) => h(Glyph, { d: ["M16.5 7.5A5.5 5.5 0 1 0 16 16.8", "M4 10.5h7 M4 13.5h6"], ...p }),
  clock: (p) => h(Glyph, { d: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 7.5V12l3 2"], ...p }),
  doc: (p) => h(Glyph, { d: ["M6 3h7l5 5v13H6z", "M13 3v5h5", "M9 13h6 M9 16.5h4"], ...p }),
  spark: (p) => h(Glyph, { d: "M12 3c.4 4.2 1.8 5.6 6 6-4.2.4-5.6 1.8-6 6-.4-4.2-1.8-5.6-6-6 4.2-.4 5.6-1.8 6-6z", ...p }),
  upload: (p) => h(Glyph, { d: ["M12 16V5", "M7.5 9.5 12 5l4.5 4.5", "M5 16v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V16"], ...p }),
  check: (p) => h(Glyph, { d: "M4.5 12.5 9.5 17.5 19.5 6.5", ...p }),
  chevron: (p) => h(Glyph, { d: "M9 6l6 6-6 6", ...p }),
  plus: (p) => h(Glyph, { d: ["M12 5v14", "M5 12h14"], ...p }),
  pin: (p) => h(Glyph, { d: ["M12 21c4-4.5 6-7.6 6-10.5A6 6 0 0 0 6 10.5C6 13.4 8 16.5 12 21z", "M12 8.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"], ...p }),
  phone: (p) => h(Glyph, { d: "M6.5 3.5h3l1.2 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z", ...p }),
  star: (p) => h(Glyph, { d: "M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.6 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z", fill: "currentColor", sw: 0, ...p }),
  mail: (p) => h(Glyph, { d: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M22 6l-10 7L2 6"], ...p }),
  spin: (p) => h(Glyph, { d: "M12 2a10 10 0 0 1 10 10", sw: 2, ...p }),
};

/* --- Domain data --- */
const BRANDS = [
  "Abarth","AC","Acura","Aiways","Alfa Romeo","ALPINA","Aston Martin","Audi",
  "Bentley","BMW","Brilliance","Bugatti","Buick","Cadillac","Chevrolet","Chrysler",
  "Citroen","Cobra","Corvette","Cupra","Dacia","Daewoo","Daihatsu","Dodge",
  "DS Automobiles","Ferrari","Fiat","Ford","Genesis","GMC","Honda","Hummer",
  "Hyundai","Infiniti","Isuzu","Iveco","Jaguar","Jeep","Kia","Lada",
  "Lamborghini","Lancia","Land Rover","Lexus","Ligier","Lincoln","Lotus",
  "Maserati","Maybach","Mazda","McLaren","Mercedes-Benz","MG","MINI","Mitsubishi",
  "Nissan","NSU","Opel","ORA","Pagani","Peugeot","Piaggio","Plymouth","Polestar",
  "Pontiac","Porsche","Renault","Rolls-Royce","Rover","Ruf","Saab","Seat","Skoda",
  "Smart","Ssangyong","Subaru","Suzuki","Tata","Tesla","Toyota","Triumph","TVR",
  "Volkswagen","Volvo","Andere"
];

const MODELS = {
  "Abarth": ["124 Spider","500","500C","595","595 Competizione","595 Turismo","595C","695","695C","Grande Punto","Punto Evo","Andere"],
  "AC": ["Andere"],
  "Acura": ["MDX","NSX","RL","RSX","TL","TSX","Andere"],
  "Aiways": ["Andere"],
  "Alfa Romeo": ["4C","8C","Alfa 145","Alfa 146","Alfa 147","Alfa 155","Alfa 156","Alfa 159","Alfa 164","Alfa 166","Alfa 33","Alfa 75","Alfa 90","Alfasud","Alfetta","Brera","Crosswagon","GT","GTV","Giulia","Giulietta","Junior","MiTo","Spider","Sprint","Stelvio","Tonale","Andere"],
  "ALPINA": ["B10","B12","B3","B4","B5","B6","B7","B8","D10","D3","D4","D5","Roadster S","XB7","XD3","XD4","Andere"],
  "Aston Martin": ["AR1","Cygnet","DB","DB11","DB7","DB9","DBS","DBX","Lagonda","Rapide","V12 Vantage","V8 Vantage","Vanquish","Virage","Andere"],
  "Audi": ["100","200","80","90","A1","A2","A3","A4","A4 Allroad","A5","A6","A6 Allroad","A7","A8","Cabriolet","Coupé","Q2","Q3","Q4","Q5","Q7","Q8","R8","RS2","RS3","RS4","RS5","RS6","RS7","RSQ3","RSQ8","S1","S2","S3","S4","S5","S6","S7","S8","SQ2","SQ5","SQ7","SQ8","TT","TT RS","TTS","V8","e-tron","quattro","Andere"],
  "Bentley": ["Arnage","Azure","Bentayga","Brooklands","Continental","Continental Flying Spur","Continental GT","Continental GTC","Continental Supersports","Eight","Flying Spur","Mulsanne","Turbo R","Turbo RT","Turbo S","Andere"],
  "BMW": ["114","116","118","120","123","125","128","130","135","1er M Coupé","2002","214 Active Tourer","216","216 Active Tourer","216 Gran Tourer","218","218 Active Tourer","218 Gran Tourer","220","220 Active Tourer","220 Gran Tourer","223 Active Tourer","225","225 Active Tourer","228","230","2er Gran Coupé","316","318","318 Gran Turismo","320","320 Gran Turismo","323","325","325 Gran Turismo","328","328 Gran Turismo","330","330 Gran Turismo","335","335 Gran Turismo","340","340 Gran Turismo","418","418 Gran Coupé","420","420 Gran Coupé","425","428","430","430 Gran Coupé","435","440","440 Gran Coupé","518","520","520 Gran Turismo","523","525","528","530","530 Gran Turismo","535","535 Gran Turismo","540","545","550","550 Gran Turismo","620 Gran Turismo","628","630","630 Gran Turismo","633","635","640","640 Gran Coupé","640 Gran Turismo","645","650","650 Gran Coupé","725","728","730","735","740","745","750","760","840","850","M135","M140i","M2","M235","M240i","M3","M340i","M4","M440","M5","M550","M6","M760","M8","M850","X1","X2","X3","X3 M","X3 M40","X4","X4 M","X4 M40","X5","X5 M","X5 M50","X6","X6 M","X6 M50","X7","X7 M50","XM","Z1","Z3","Z3 M","Z4","Z4 M","Z8","i3","i4","i7","i8","iX","iX1","iX3","Andere"],
  "Brilliance": ["BC3","BS2","BS4","BS6","Andere"],
  "Bugatti": ["Chiron","EB 110","Veyron","Andere"],
  "Buick": ["Century","Electra","Enclave","La Crosse","Le Sabre","Park Avenue","Regal","Riviera","Roadmaster","Skylark","Andere"],
  "Cadillac": ["ATS","Allante","BLS","CT6","CTS","Deville","Eldorado","Escalade","Fleetwood","SRX","STS","Seville","XLR","XT4","XT5","XT6","Andere"],
  "Chevrolet": ["2500","Alero","Astro","Avalanche","Aveo","Beretta","Blazer","C1500","Camaro","Caprice","Captiva","Cavalier","Chevelle","Chevy Van","Citation","Colorado","Corsica","Cruze","El Camino","Epica","Evanda","Express","HHR","Impala","K1500","K30","Kalos","Lacetti","Lumina","Malibu","Matiz","Niva","Nubira","Orlando","Rezzo","S-10","SSR","Silverado","Spark","Suburban","Tahoe","Trailblazer","Trans Sport","Traverse","Trax","Venture","Volt","Andere"],
  "Chrysler": ["200","300 M","300C","Aspen","Crossfire","Daytona","Grand Voyager","Imperial","Le Baron","Neon","New Yorker","PT Cruiser","Pacifica","Saratoga","Sebring","Stratus","Valiant","Viper","Vision","Voyager","Andere"],
  "Citroen": ["2 CV","AX","BX","Berlingo","C-Crosser","C-Elysée","C-Zero","C1","C2","C3","C3 Aircross","C3 Picasso","C4","C4 Aircross","C4 Cactus","C4 Picasso","C4 SpaceTourer","C5","C5 Aircross","C5 X","C6","C8","CX","DS","DS3","DS4","DS4 Crossback","DS5","E-MEHARI","Evasion","GSA","Grand C4 Picasso / SpaceTourer","Jumper","Jumpy","Nemo","SAXO","SM","SpaceTourer","Visa","XM","Xantia","Xsara","Xsara Picasso","ZX","Andere"],
  "Cobra": ["Andere"],
  "Corvette": ["C1","C2","C3","C4","C5","C6","C7","C8","Z06","ZR 1","Andere"],
  "Cupra": ["Arona","Ateca","Born","Formentor","Ibiza","Leon","Andere"],
  "Dacia": ["Dokker","Duster","Jogger","Lodgy","Logan","Logan Pick-Up","Pick Up","Sandero","Spring","Andere"],
  "Daewoo": ["Espero","Evanda","Kalos","Korando","Lacetti","Lanos","Leganza","Matiz","Musso","Nexia","Nubira","Rezzo","Tacuma","Andere"],
  "Daihatsu": ["Applause","Charade","Charmant","Copen","Cuore","Feroza/Sportrak","Freeclimber","Gran Move","Hijet","MATERIA","Move","Rocky/Fourtrak","Sirion","TREVIS","Terios","YRV","Andere"],
  "Dodge": ["Avenger","Caliber","Challenger","Charger","Coronet","Dakota","Dart","Demon","Durango","Grand Caravan","Hornet","Journey","Magnum","Neon","Nitro","RAM","Stealth","Viper","Andere"],
  "DS Automobiles": ["DS3","DS3 Crossback","DS4","DS4 Crossback","DS5","DS7 (Crossback)","DS9","Andere"],
  "Ferrari": ["208","246","250","275","288","296 GTB","308","328","330","348","360","365","400","412","456","458","488 GTB","488 Pista","488 Spider","512","550","575","599 GTB","599 GTO","599 SA Aperta","612","750","812","California","Daytona","Dino GT4","Enzo Ferrari","F12","F355","F40","F430","F50","F8","FF","GTC4Lusso","LaFerrari","Mondial","Portofino","Purosangue","Roma","SF90","Superamerica","Testarossa","Andere"],
  "Fiat": ["124","124 Spider","126","127","130","131","500","500C","500L","500L Cross","500L Living","500L Trekking","500L Urban","500L Wagon","500S","500X","Albea","Barchetta","Brava","Bravo","Cinquecento","Coupe","Croma","Dino","Doblo","Ducato","Fiorino","Freemont","Fullback","Grande Punto","Idea","Linea","Marea","Multipla","New Panda","Palio","Panda","Punto","Punto Evo","Qubo","Regata","Ritmo","Scudo","Sedici","Seicento","Siena","Stilo","Strada","Talento","Tempra","Tipo","Ulysse","Uno","X 1/9","Andere"],
  "Ford": ["Aerostar","B-Max","Bronco","C-Max","Capri","Cougar","Courier","Crown","EcoSport","Econoline","Econovan","Edge","Escape","Escort","Excursion","Expedition","Explorer","F 100","F 150","F 250","F 350","Fairlane","Falcon","Fiesta","Flex","Focus","Fusion","GT","Galaxy","Granada","Grand C-Max","Grand Tourneo","Ka/Ka+","Kuga","Maverick","Mercury","Mondeo","Mustang","Mustang Mach-E","Orion","Probe","Puma","Ranger","Raptor","S-Max","Scorpio","Sierra","Sportka","Streetka","Taunus","Taurus","Thunderbird","Tourneo","Tourneo Connect","Tourneo Courier","Tourneo Custom","Transit","Transit Connect","Transit Courier","Transit Custom","Windstar","Andere"],
  "Genesis": ["G70","G80","GV60","GV70","GV80","Andere"],
  "GMC": ["Acadia","Envoy","Safari","Savana","Sierra","Sonoma","Syclone","Terrain","Typhoon","Vandura","Yukon","Andere"],
  "Honda": ["Accord","Aerodeck","CR-V","CR-Z","CRX","City","Civic","Clarity","Concerto","Element","FR-V","HR-V","Insight","Integra","Jazz","Legend","Logo","NSX","Odyssey","Pilot","Prelude","Ridgeline","S2000","Shuttle","Stream","e","Andere"],
  "Hummer": ["H1","H2","H3","Andere"],
  "Hyundai": ["Accent","Atos","Azera","Bayon","Coupe","Elantra","Excel","Galloper","Genesis","Getz","Grand Santa Fe","Grandeur","H 100","H 200","H-1","H-1 Starex","H350","IONIQ","IONIQ 5","IONIQ 6","Kona","Lantra","Matrix","Nexo","Pony","S-Coupe","Santa Fe","Santamo","Sonata","Staria","Terracan","Trajet","Tucson","Veloster","Veracruz","i10","i20","i30","i40","ix20","ix35","ix55","Andere"],
  "Infiniti": ["EX30","EX35","EX37","FX","G35","G37","M30","M35","M37","Q30","Q45","Q50","Q60","Q70","QX30","QX50","QX56","QX60","QX70","QX80","Andere"],
  "Isuzu": ["Campo","D-Max","Gemini","Midi","PICK UP","Trooper","Andere"],
  "Iveco": ["Massif","Andere"],
  "Jaguar": ["Daimler","E-Pace","E-Type","F-Pace","F-Type","I-Pace","MK II","S-Type","X-Type","XE","XF","XJ","XJ12","XJ40","XJ6","XJ8","XJR","XJS","XJSC","XK","XK8","XKR","Andere"],
  "Jeep": ["Avenger","CJ","Cherokee","Comanche","Commander","Compass","Gladiator","Grand Cherokee","Patriot","Renegade","Wagoneer","Willys","Wrangler","Andere"],
  "Kia": ["Besta","Borrego","Carens","Carnival","Cerato","Clarus","EV6","Elan","Joice","K2500","K2700","Leo","Magentis","Mentor","Mini","Niro","Opirus","Optima","Picanto","Pregio","Pride","Retona","Rio","Roadster","Rocsta","Sephia","Shuma","Sorento","Soul","Sportage","Stinger","Stonic","Venga","XCeed","cee'd / Ceed","cee'd Sportswagon","pro cee'd / ProCeed","Andere"],
  "Lada": ["110","111","112","1200","2107","2110","2111","2112","Aleko","Forma","Granta","Kalina","Niva","Nova","Priora","Samara","Taiga","Urban","Vesta","X-Ray","Andere"],
  "Lamborghini": ["Aventador","Countach","Diablo","Espada","Gallardo","Huracán","Jalpa","LM","Miura","Murciélago","Urraco","Urus","Andere"],
  "Lancia": ["Beta","Dedra","Delta","Flaminia","Flavia","Fulvia","Gamma","Kappa","Lybra","MUSA","Phedra","Prisma","Stratos","Thema","Thesis","Voyager","Ypsilon","Zeta","Andere"],
  "Land Rover": ["Defender","Discovery","Discovery Sport","Freelander","Range Rover","Range Rover Evoque","Range Rover Sport","Range Rover Velar","Serie I","Serie II","Serie III","Andere"],
  "Lexus": ["CT 200h","ES 300","ES 330","ES 350","GS 250","GS 300","GS 350","GS 430","GS 450","GS 460","GS F","GX 460","GX 470","IS 200","IS 220","IS 250","IS 300","IS 350","IS-F","LC 500","LC 500h","LFA","LS 400","LS 430","LS 460","LS 500","LS 600","LX 450","LX 470","LX 570","NX 200","NX 300","NX 350","NX 450","RC 200","RC 300","RC 350","RC F","RX 200","RX 300","RX 330","RX 350","RX 400","RX 450","SC 400","SC 430","UX","Andere"],
  "Ligier": ["Ambra","Be Sun","JS 50","JS 50 L","JS 60","JS RC","Nova","Optima","X - Too","Andere"],
  "Lincoln": ["Aviator","Continental","LS","Mark","Navigator","Town Car","Andere"],
  "Lotus": ["340 R","Cortina","Elan","Elise","Elite","Emira","Esprit","Europa","Evora","Excel","Exige","Super Seven","Andere"],
  "Maserati": ["222","224","228","3200","418","420","4200","422","424","430","Biturbo","Ghibli","GranCabrio","Gransport","Granturismo","Grecale","Indy","Karif","Levante","MC12","MC20","Merak","Quattroporte","Shamal","Spyder","Andere"],
  "Maybach": ["57","62","Pullman","Andere"],
  "Mazda": ["121","2","3","323","5","6","626","929","B series","BT-50","Bongo","CX-3","CX-30","CX-5","CX-60","CX-7","CX-9","Demio","E series","MPV","MX-3","MX-30","MX-5","MX-6","Millenia","Premacy","Protege","RX-6","RX-7","RX-8","Tribute","Xedos","Andere"],
  "McLaren": ["540C","570GT","570S","600LT","620R","650S","650S Coupé","650S Spider","675LT","675LT Spider","720S","765","765LT","Artura","Elva","GT","MP4-12C","P1","Senna GTR","Speedtail","Andere"],
  "Mercedes-Benz": ["190","200","220","230","240","250","260","270","280","290","300","320","350","380","400","420","450","500","560","600","A 140","A 150","A 160","A 170","A 180","A 190","A 200","A 210","A 220","A 250","A 35 AMG","A 45 AMG","B 150","B 160","B 170","B 180","B 200","B 220","B 250","C 160","C 180","C 200","C 220","C 230","C 240","C 250","C 270","C 280","C 300","C 320","C 350","C 400","C 43 AMG","C 55 AMG","C 63 AMG","CLA 180","CLA 200","CLA 220","CLA 250","CLA 35 AMG","CLA 45 AMG","CLC 160","CLC 180","CLC 200","CLC 220","CLK 200","CLK 220","CLK 230","CLK 270","CLK 280","CLK 320","CLK 350","CLK 430","CLK 500","CLS 220","CLS 250","CLS 280","CLS 300","CLS 320","CLS 350","CLS 400","CLS 450","CLS 500","CLS 53 AMG","CLS 55 AMG","CLS 63 AMG","Citan","E 200","E 220","E 230","E 240","E 250","E 260","E 270","E 280","E 290","E 300","E 320","E 350","E 400","E 420","E 430","E 450","E 500","E 53 AMG","E 55 AMG","E 63 AMG","EQA","EQB","EQC","EQE","EQS","EQT","EQV","G 230","G 240","G 270","G 280","G 300","G 320","G 350","G 400","G 500","G 55 AMG","G 63 AMG","G 65 AMG","GL 320","GL 350","GL 420","GL 450","GL 500","GLA 180","GLA 200","GLA 220","GLA 250","GLA 35 AMG","GLA 45 AMG","GLB 180","GLB 200","GLB 220","GLB 250","GLB 35 AMG","GLC 200","GLC 220","GLC 250","GLC 300","GLC 350","GLC 400","GLC 43 AMG","GLC 63 AMG","GLE 250","GLE 300","GLE 350","GLE 400","GLE 450","GLE 500","GLE 53 AMG","GLE 580","GLE 63 AMG","GLK 200","GLK 220","GLK 250","GLK 280","GLK 300","GLK 320","GLK 350","GLS 350","GLS 400","GLS 450","GLS 500","GLS 580","GLS 600","AMG GT","AMG GT C","AMG GT R","AMG GT S","ML 230","ML 250","ML 270","ML 280","ML 300","ML 320","ML 350","ML 400","ML 430","ML 450","ML 500","ML 55 AMG","ML 63 AMG","S 250","S 280","S 300","S 320","S 350","S 400","S 420","S 430","S 450","S 500","S 550","S 560","S 580","S 600","S 63 AMG","S 65 AMG","SL 280","SL 300","SL 320","SL 350","SL 380","SL 400","SL 420","SL 450","SL 500","SL 55 AMG","SL 560","SL 600","SL 63 AMG","SL 65 AMG","SLC 180","SLC 200","SLC 250","SLC 280","SLC 300","SLC 43 AMG","SLK 200","SLK 230","SLK 250","SLK 280","SLK 300","SLK 320","SLK 350","SLK 55 AMG","SLR","SLS AMG","Sprinter","T-Klasse","V 200","V 220","V 230","V 250","V 280","V 300","Vaneo","Viano","Vito","X 220","X 250","X 350","Andere"],
  "MG": ["EHS","HS","MG4","MG5","MGA","MGB","MGF","Marvel R","Midget","Montego","TD","TF","ZR","ZS","ZT","Andere"],
  "MINI": ["Cooper","Cooper Cabrio","Cooper D","Cooper D Cabrio","Cooper S","Cooper S Cabrio","Cooper SD","Cooper SD Cabrio","Cooper SE","John Cooper Works","One","One D","Cooper Clubman","Cooper D Clubman","Cooper S Clubman","Cooper Countryman","Cooper D Countryman","Cooper S Countryman","Cooper SE Countryman","1000","1300","Andere"],
  "Mitsubishi": ["3000 GT","ASX","Canter","Carisma","Colt","Cordia","Cosmos","Diamante","Eclipse","Eclipse Cross","Galant","Galloper","Grandis","L200","L300","L400","Lancer","Mirage","Montero","Outlander","Pajero","Pajero Pinin","Pick-up","Space Gear","Space Runner","Space Star","Space Wagon","Starion","i-MiEV","Andere"],
  "Nissan": ["100 NX","200 SX","240 SX","280 ZX","300 ZX","350Z","370Z","Almera","Almera Tino","Altima","Ariya","Armada","Bluebird","Cabstar","Cherry","Cube","Evalia","Frontier","GT-R","Juke","Leaf","Maxima","Micra","Murano","NP 300","NV200","NV250","NV300","NV400","Navara","Note","Pathfinder","Patrol","Pixo","Prairie","Primera","Pulsar","Qashqai","Qashqai+2","Quest","Sentra","Silvia","Skyline","Sunny","Terrano","Tiida","Titan","Townstar","X-Trail","e-NV200","Andere"],
  "NSU": ["Andere"],
  "Opel": ["Adam","Agila","Ampera","Ampera-e","Antara","Arena","Ascona","Astra","Calibra","Campo","Cascada","Cavalier","Combo","Combo Life","Commodore","Corsa","Crossland (X)","Diplomat","Frontera","GT","Grandland (X)","Insignia","Insignia CT","Kadett","Karl","Manta","Meriva","Mokka","Mokka X","Monterey","Monza","Movano","Nova","Omega","Rekord","Rocks-e","Senator","Signum","Sintra","Speedster","Tigra","Vectra","Vivaro","Zafira","Zafira Life","Zafira Tourer","Andere"],
  "ORA": ["Funky Cat","Andere"],
  "Pagani": ["Huayra","Zonda","Andere"],
  "Peugeot": ["1007","104","106","107","108","2008","204","205","206","207","208","3008","301","304","305","306","307","308","309","4007","4008","404","405","406","407","408","5008","504","505","508","604","605","607","806","807","Bipper","Bipper Tepee","Boxer","Expert","Expert Tepee","J5","Partner","Partner Tepee","RCZ","Rifter","TePee","Traveller","iOn","Andere"],
  "Piaggio": ["APE","APE TM","Porter","Andere"],
  "Plymouth": ["Prowler","Andere"],
  "Polestar": ["1","2","3","Andere"],
  "Pontiac": ["6000","Bonneville","Fiero","Firebird","G6","GTO","Grand-Am","Grand-Prix","Montana","Solstice","Sunbird","Sunfire","Trans Am","Trans Sport","Vibe","Andere"],
  "Porsche": ["356","911 Urmodell","930","964","991","992","993","996","997","912","914","918","924","928","944","959","962","968","Boxster","Carrera GT","Cayenne","Cayman","Macan","Panamera","Taycan","Andere"],
  "Renault": ["Alaskan","Alpine A110","Alpine A310","Alpine V6","Arkana","Austral","Avantime","Captur","Clio","Coupe","Espace","Express","Fluence","Fuego","Grand Espace","Grand Modus","Grand Scenic","Kadjar","Kangoo","Koleos","Laguna","Latitude","Mascott","Master","Megane","Modus","R 11","R 14","R 18","R 19","R 20","R 21","R 25","R 4","R 5","R 6","R 9","Rapid","Safrane","Scenic","Spider","Talisman","Trafic","Twingo","Twizy","Vel Satis","Wind","ZOE","Andere"],
  "Rolls-Royce": ["Corniche","Cullinan","Dawn","Flying Spur","Ghost","Park Ward","Phantom","Silver Cloud","Silver Dawn","Silver Seraph","Silver Shadow","Silver Spirit","Silver Spur","Wraith","Andere"],
  "Rover": ["100","111","114","115","200","213","214","216","218","220","25","400","414","416","418","420","45","600","618","620","623","75","800","820","825","827","City Rover","Metro","Montego","SD","Streetwise","Andere"],
  "Ruf": ["Andere"],
  "Saab": ["9-3","9-4X","9-5","9-7X","90","900","9000","96","99","Andere"],
  "Seat": ["Alhambra","Altea","Arona","Arosa","Ateca","Cordoba","Exeo","Ibiza","Inca","Leon","Malaga","Marbella","Mii","Tarraco","Terra","Toledo","Andere"],
  "Skoda": ["105","120","130","135","Citigo","Enyaq","Fabia","Favorit","Felicia","Forman","Kamiq","Karoq","Kodiaq","Octavia","Pick-up","Praktik","Rapid","Roomster","Scala","Superb","Yeti","Andere"],
  "Smart": ["#1","Crossblade","ForFour","ForTwo","Roadster","Andere"],
  "Ssangyong": ["Actyon","Family","Korando","Kyron","MUSSO","REXTON","Rodius","Tivoli","XLV","Andere"],
  "Subaru": ["B9 Tribeca","BRZ","Baja","Forester","Impreza","Justy","Legacy","Levorg","Libero","Outback","SVX","Solterra","Trezia","Tribeca","Vivio","WRX STI","XT","XV","Andere"],
  "Suzuki": ["(SX4) S-Cross","Across","Alto","Baleno","Cappuccino","Carry","Celerio","Grand Vitara","Ignis","Jimny","Kizashi","LJ","Liana","SJ Samurai","SX4","Splash","Super-Carry","Swace","Swift","Vitara","Wagon R+","X-90","Andere"],
  "Tata": ["Indica","Indigo","Nano","Safari","Sumo","Telcoline","Telcosport","Xenon","Andere"],
  "Tesla": ["Model 3","Model S","Model X","Model Y","Roadster","Andere"],
  "Toyota": ["4-Runner","Alphard","Auris","Auris Touring Sports","Avalon","Avensis","Avensis Verso","Aygo (X)","C-HR","Camry","Carina","Celica","Corolla","Corolla Cross","Corolla Verso","Cressida","Crown","Dyna","FCV","FJ","Fortuner","GT86","Hiace","Highlander","Hilux","IQ","Land Cruiser","Lite-Ace","MR 2","Matrix","Mirai","PROACE CITY","Paseo","Picnic","Previa","Prius","Prius+","Proace (Verso)","RAV 4","Sequoia","Sienna","Starlet","Supra","Tacoma","Tercel","Tundra","Urban Cruiser","Verso","Verso-S","Yaris","bZ4X","Andere"],
  "Triumph": ["Dolomite","Moss","Spitfire","TR3","TR4","TR5","TR6","TR7","TR8","Andere"],
  "TVR": ["Chimaera","Griffith","Tuscan","Andere"],
  "Volkswagen": ["181","Amarok","Arteon","Beetle","Bora","Buggy","CC","Caddy","Corrado","Crafter","Eos","Fox","Golf","Golf Plus","Golf Sportsvan","ID.3","ID.4","ID.5","ID.6","ID.Buzz","Iltis","Jetta","Karmann Ghia","Käfer","LT","Lupo","New Beetle","Passat","Passat Alltrack","Passat CC","Passat Variant","Phaeton","Polo","Routan","Santana","Scirocco","Sharan","T-Cross","T-Roc","T1","T2","T3 andere","T3 Caravelle","T3 Kombi","T3 Multivan","T4 andere","T4 California","T4 Caravelle","T4 Kombi","T4 Multivan","T5 andere","T5 California","T5 Caravelle","T5 Kombi","T5 Multivan","T5 Shuttle","T5 Transporter","T6 andere","T6 California","T6 Caravelle","T6 Kombi","T6 Multivan","T6 Transporter","T7 Multivan","Taigo","Taro","Tiguan","Tiguan Allspace","Touareg","Touran","Vento","XL1","up!","Andere"],
  "Volvo": ["240","244","245","262","264","340","360","440","460","480","740","744","745","760","780","850","855","940","944","945","960","965","Amazon","C30","C40","C70","EX90","Polar","S40","S60","S60 Cross Country","S70","S80","S90","V40","V40 Cross Country","V50","V60","V60 Cross Country","V70","V90","V90 Cross Country","XC40","XC60","XC70","XC90","Andere"],
  "Andere": ["Andere"]
};

const DAMAGES = [
  { id: "kein", label: "Kein Schaden", hint: "Gepflegter Gebrauchter" },
  { id: "unfall", label: "Unfallschaden", hint: "Kollision, Karosserie" },
  { id: "motor", label: "Motorschaden", hint: "Defekt, Geräusche" },
  { id: "getriebe", label: "Getriebeschaden", hint: "Schaltung, Kupplung" },
  { id: "elektronik", label: "Elektronikschaden", hint: "Steuergerät, Sensorik" },
  { id: "wasser", label: "Wasserschaden", hint: "Hochwasser, Nässe" },
  { id: "hagel", label: "Hagelschaden", hint: "Dellen, Lack" },
  { id: "sonstige", label: "Sonstige Schäden", hint: "Verschleiß, Mängel" },
];

const PROCESS = [
  { k: "01", icon: "car",   title: "Fahrzeug bewerten", text: "Geben Sie Fahrzeugdaten und Zustand in unter 2 Minuten ein — Schritt für Schritt, ohne Fachwissen." },
  { k: "02", icon: "mail",  title: "Angebot erhalten", text: "Sie erhalten schnellstmöglich Ihr persönliches Angebot per Telefon oder E-Mail von unserem Team." },
  { k: "03", icon: "euro",  title: "Prüfen & akzeptieren", text: "Nehmen Sie sich Zeit. Kein Druck, keine Frist. Sie entscheiden, ob Sie das Angebot annehmen." },
  { k: "04", icon: "truck", title: "Zahlung & Abholung", text: "Zahlung direkt bei Übergabe. Ihr Käufer holt das Fahrzeug kostenlos bei Ihnen ab — bundesweit." },
];

const BENEFITS = [
  { icon: "truck",  title: "Kostenlose Abholung", text: "Bundesweit, auch nicht fahrbereit. Wir kommen zu Ihnen — ohne Zusatzkosten." },
  { icon: "clock",  title: "Schnelle Rückmeldung", text: "Verbindliches Angebot schnellstmöglich, Zahlung direkt bei der Übergabe." },
  { icon: "shield", title: "Spezialist für Schäden", text: "Unfall, Motor, Getriebe, Wasser — bei uns kein Abschlag aus Unsicherheit." },
  { icon: "euro",   title: "Keine Verhandlungen", text: "Ein fairer Festpreis. Kein Feilschen, keine versteckten Abzüge bei Übergabe." },
  { icon: "doc",    title: "Keine Inserate", text: "Keine Anrufe, keine Besichtigungstermine, keine Privatkäufer im Hof." },
  { icon: "spark",  title: "Unverbindlich", text: "Die Bewertung ist kostenlos und ohne Verpflichtung. Sie entscheiden." },
];

const TESTIMONIALS = [
  { name: "Markus T.", car: "BMW 320d · 2016", dmg: "Motorschaden", quote: "Angebot am selben Tag, Abholung zwei Tage später. Geld war bei Übergabe sofort da. So muss das sein.", rating: 5, loc: "München", date: "Dez. 2024" },
  { name: "Sandra K.", car: "VW Passat · 2014", dmg: "Unfallschaden", quote: "Nach dem Unfall wollte keiner den Wagen. AMS hat fair bewertet und alles übernommen. Absolut stressfrei.", rating: 5, loc: "Köln", date: "März 2025" },
  { name: "Daniel R.", car: "Audi A4 Avant · 2013", dmg: "Getriebeschaden", quote: "Kein Feilschen, kein Druck. Der Festpreis stand und wurde exakt so ausgezahlt. Sehr professionell.", rating: 5, loc: "Hamburg", date: "Aug. 2025" },
  { name: "Elif Y.", car: "Mercedes C 220 · 2015", dmg: "Hagelschaden", quote: "Online bewerten, Bilder hoch, fertig. Innerhalb kürzester Zeit ein konkretes Angebot. Top.", rating: 5, loc: "Stuttgart", date: "Jan. 2026" },
];

const FAQS = [
  { q: "Was passiert mit Unfallwagen?", a: "Wir sind auf Unfall- und Schadenfahrzeuge spezialisiert. Egal ob fahrbereit oder Totalschaden — wir machen Ihnen ein faires Angebot und übernehmen die komplette Abwicklung inklusive Abmeldung." },
  { q: "Ist die Bewertung wirklich kostenlos?", a: "Ja. Die Online-Bewertung und unser anschließendes Angebot sind komplett kostenlos und unverbindlich. Erst wenn Sie zustimmen, geht es weiter." },
  { q: "Wie schnell erhalte ich ein Angebot?", a: "Wir melden uns schnellstmöglich — in der Regel noch am selben Tag — per Telefon oder E-Mail mit Ihrem persönlichen Angebot." },
  { q: "Muss das Auto fahrbereit sein?", a: "Nein. Wir kaufen auch nicht fahrbereite Fahrzeuge an und organisieren die kostenlose Abholung per Transporter — bundesweit." },
  { q: "Werden Fahrzeuge ohne TÜV gekauft?", a: "Selbstverständlich. Ein abgelaufener oder fehlender TÜV ist für den Ankauf kein Problem und mindert das Angebot nicht pauschal." },
  { q: "Kauft ihr auch Leasingrückläufer?", a: "Ja, auch beschädigte Leasingrückläufer und finanzierte Fahrzeuge. Geben Sie das einfach im Formular an — wir klären die Details mit Ihnen." },
];

Object.assign(window, { h, Icons, BRANDS, MODELS, DAMAGES, PROCESS, BENEFITS, TESTIMONIALS, FAQS });
