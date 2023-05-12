// ======= LOADERS =======
function _loadModule() {
    // Visibility
    _loadVisibility();
    _loadNightModeToggleHTML();

    // Header
    document.title = TITLE;
    document.getElementById("header1").innerHTML = "<h1>" + HEADER + "</h1>";
    document.getElementById("header2").style.display = "none";
    document.getElementById("sheetLink").href = SHEET_LINK;
    document.getElementById("pptLink").href = PPT_LINK;
    document.getElementById("driveLink").href = DRIVE_LINK;
    document.getElementById("vaccineLink").href = VACCINE_LINK;
    document.getElementById("mapsLink").href = MAPS_LINK;

    if (!SHEET_LINK_ACTIVE) {
        document.getElementById("sheetLink").style.display = "none";
    }

    if (!PPT_LINK_ACTIVE) {
        document.getElementById("pptLink").style.display = "none";
    }

    if (!DRIVE_LINK_ACTIVE) {
        document.getElementById("driveLink").style.display = "none";
    }

    if (!VACCINE_LINK_ACTIVE) {
        document.getElementById("vaccineLink").style.display = "none";
    }

    if (!MAPS_LINK_ACTIVE) {
        document.getElementById("mapsLink").style.display = "none";
    }

    // Header Img
    if (HEADER_IMG_ACTIVE) {
        document.getElementById("header2").src = DARK_MODE ? HEADER_IMG_LINK_DARK : HEADER_IMG_LINK;
        document.getElementById("header1").style.display = "none";
        document.getElementById("header2").style.display = "block";
    }

    // About
    document.getElementById("googleMaps").innerHTML = `<iframe id="googleMapsIframe" src="${GOOGLE_MAPS}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
    document.getElementById("sobre").innerHTML = "<p>" + ABOUT_INTRO_TEXT + "</p>";
    document.getElementById("sobre1").innerHTML = "<strong>Ida:</strong><span></span>";
    document.getElementById("sobre3").innerHTML = "<strong>Volta:</strong><span></span>";
    document.getElementById("sobre5").innerHTML = "<strong>Hospedagem:</strong><span> </span>";
    document.getElementById("sobre6").innerHTML = ABOUT_6;

    if (!IS_ABOUT_6_ACTIVE) {
        document.getElementById("sobre6").style.display = "none";
    }

    // Schedule
    document.getElementById("pDescription").innerHTML = "<p>" + P_DESCRIPTION + "</p>";

    // Places
    if (IS_PLACES_ACTIVE) {
        _loadPlacesHTML();
    } else {
        document.getElementById("services").style.display = "none";
    }

    // Export Data
    let passeiosNoMap = _getPlacesNoMap();
    localStorage.setItem("PASSEIOS", JSON.stringify(passeiosNoMap));
}

function _loadBackup() {
    try {
        BACKUP_MODE = true;
        SHEET_DATA = SHEET_DATA_BACKUP;
        if (IS_PLACES_ACTIVE) {
            P_DATA = P_DATA_BACKUP;
            HYPERLINK = HYPERLINK_BACKUP;
            _getPResult();
        }
        _logger(WARN, "Backup Activated");
    } catch (error) {
        _displayErrorMessage(error);
        throw error;
    }
}

function _generateBackup() {
    _logger(INFO, "HYPERLINK:");
    console.log(HYPERLINK);
    _logger(INFO, "P_DATA:");
    console.log(P_DATA);
    _logger(INFO, "SHEET_DATA:");
    console.log(SHEET_DATA);
}

function _loadSobreModule() {
    let datas = [];
    let dados = [];
    let currentDate = "";
    for (let i = 0; i < SHEET_DATA.length; i++) {
        if (_isExcelDate(SHEET_DATA[i][0])) {
            currentDate = _excelToExcelNoYear(_dateToExcel(_ExceltoDate(SHEET_DATA[i][0])));
        }
        if (SHEET_DATA[i][5] == "Ida/Volta") {
            datas.push(currentDate + ", " + SHEET_DATA[i][0]);
            dados.push(SHEET_DATA[i][4]);
        }
    }

    let adaptedText = {
        ida: TRANSPORTATION_JSON["defaultTransportation"]["ida"]["text"],
        volta: TRANSPORTATION_JSON["defaultTransportation"]["volta"]["text"]
    }

    if (MULTIPLE_FLIGHTS) {
        dados = _getMultiplosVoos(dados);
        adaptedText.ida = adaptedText.ida + "s ";
        adaptedText.volta = adaptedText.volta + "s ";
    } else {
        adaptedText.ida = adaptedText.ida + " ";
        adaptedText.volta = adaptedText.volta + " ";
    }

    document.getElementById("sobre1").innerHTML = "<strong>Ida:</strong><span>" + datas[0] + "</span>";
    document.getElementById("sobre2").innerHTML = "<strong>" + adaptedText.ida + " Ida:</strong><span>" + dados[0] + "</span>";
    document.getElementById("sobre3").innerHTML = "<strong>Volta:</strong><span>" + datas[datas.length - 1] + "</span>";
    document.getElementById("sobre4").innerHTML = "<strong>" + adaptedText.volta + " Volta:</strong><span>" + dados[dados.length - 1] + "</span>";
    document.getElementById("sobre5").innerHTML = "<strong>Hospedagem:</strong><span>" + STAY_TEXT + "</span>";
}

function _loadTransporteModule() { // Carrega dados de TRANSPORTE da categoria ABOUT_INTRO_TEXT do Module. Depende do JSON
    document.getElementById("sobre2").innerHTML = "<strong>" + TRANSPORTATION_JSON["defaultTransportation"]["ida"]["text"] + " Ida:</strong><span></span>";
    document.getElementById("sobre4").innerHTML = "<strong>" + TRANSPORTATION_JSON["defaultTransportation"]["volta"]["text"] + " Volta:</strong><span></span>";
}

function _loadDadosModule() { // Carrega a categoria DADOS do Module. Depende do Google Sheets

    for (let i = 0; i < KEYPOINTS_JSON.length; i++) {
        document.getElementById(`dado${i+1}`).innerHTML = _getDado(KEYPOINTS_JSON[i]);
    }

    // Auto Generated
    _adaptTransporte();

    // Data Update
    KEYPOINTS_JSON[1].titulo = TRANSPORTATION_JSON["defaultTransportation"]["default"]["text"];
    KEYPOINTS_JSON[1].icone = TRANSPORTATION_JSON["defaultTransportation"]["default"]["icon"];
    document.getElementById("sobre2").innerHTML = "<strong>" + TRANSPORTATION_JSON["defaultTransportation"]["ida"]["text"] + " Ida:</strong><span></span>";
    document.getElementById("sobre4").innerHTML = "<strong>" + TRANSPORTATION_JSON["defaultTransportation"]["volta"]["text"] + " Volta:</strong><span></span>";
}

function _loadSheetDetails() { // Carrega os dados de detalhes da planilha (Gastos Prévios, Durante a Viagem, Ajustes)
    BASE_RATE = SHEET_DATA[0][9] == "Ambos" || SHEET_DATA[0][9] == "Todos" ? NUMBER_OF_PEOPLE : 1;
    let result = {};
    let dadosColetados = ["Gastos Prévios", "Gastos Durante a Viagem", "Ajustes", "Hospedagem"] // Em Ordem

    let dadosIndex = 0;

    for (let i = 0; i < SHEET_DATA.length; i++) {
        if (SHEET_DATA[i][8] == dadosColetados[dadosIndex]) {
            let isH = dadosColetados[dadosIndex] == "Hospedagem";
            let j = isH ? i + 1 : i + 2;
            let collectedObject = {};
            while (SHEET_DATA[j][8] != undefined) {
                let key = isH ? "result" : SHEET_DATA[j][8];
                let data = (isH ? SHEET_DATA[j][8] : SHEET_DATA[j][9]) || "";
                collectedObject[key] = _isMoney(data) ? _moneyToFloat(data) : data;
                j++;
            }
            result[dadosColetados[dadosIndex]] = collectedObject
            i = j;
            dadosIndex++;
            if (dadosIndex >= dadosColetados.length) {
                break;
            }
        }
    }
    PREVIOUS_COST_OBJECT = result["Gastos Prévios"];
    COST_DURING_TRIP_OBJECT = result["Gastos Durante a Viagem"];
    ADJUSTMENTS = result["Ajustes"];
    STAY_TEXT = result["Hospedagem"].result;

    STAY_COST = STAY_COST + ((PREVIOUS_COST_OBJECT["Hospedagem"] || COST_DURING_TRIP_OBJECT["Hospedagem"]) / BASE_RATE)
    TICKET_COST = _getValorIngressos();
    TOTAL_COST = _moneyToFloat(SHEET_DATA[2][9]) / BASE_RATE;
    PREVIOUS_COST = PREVIOUS_COST_OBJECT["Total"] / BASE_RATE;
}

// ======= GETTERS =======
function _getHyperLink(index) { // Retorna o link do hyperlink se houver
    let result;
    try {
        result = DATA_H[index].values[0].hyperlink;
    } catch (e) {
        result = "";
    }
    return result;
}

function _getDiaADia() {
    let ajuste = 0;
    if (ADJUSTMENTS["Total"] || ADJUSTMENTS["Ambos"]) {
        ajuste = (ADJUSTMENTS["Total"] || ADJUSTMENTS["Ambos"]) / NUMBER_OF_PEOPLE;
    }
    DAY_TO_DAY_COST = (DAY_TO_DAY_COST + ajuste) / _getDaysBetweenDates(START_DATE, END_DATE);
}

function _getDado(dado) {
    let titulo = dado.titulo || "Não Definido";
    let icone = dado.icone || "bx question-mark";
    let texto = dado.texto || "-";

    switch (dado.titulo) {
        case "Gastos Durante a Viagem":
        case "Gastos na Viagem":
            // Ajustes
            let valor = COST_DURING_TRIP;
            if (ADJUSTMENTS["Total"] || ADJUSTMENTS["Ambos"]) {
                valor = ADJUSTED_COST_DURING_TRIP;
            }
            texto = (texto != "-") ? texto : `${CURRENCY} ` + _addDotSeparator(Math.round(valor));
            break;
        case "Ida e Volta":
            texto = (texto != "-") ? texto : `${CURRENCY} ` + _addDotSeparator(Math.round(TRANSPORTATION_COST));
            break;
        case "Hospedagem":
            texto = (texto != "-") ? texto : `${CURRENCY} ` + _addDotSeparator(Math.round(STAY_COST));
            break;
        case "Dia-a-Dia":
            texto = (texto != "-") ? texto : `${CURRENCY} ` + _addDotSeparator(Math.round(DAY_TO_DAY_COST) * NUMBER_OF_PEOPLE);
            break;
        case "Dia-a-Dia (Individual)":
            texto = (texto != "-") ? texto : `${CURRENCY} ` + _addDotSeparator(Math.round(DAY_TO_DAY_COST));
            break;
        case "Ingresso":
            texto = (texto != "-") ? texto : `${CURRENCY} ` + _addDotSeparator(Math.round(TICKET_COST));
            break;
        case "Ingressos":
            texto = (texto != "-") ? texto : `${CURRENCY} ` + _addDotSeparator(Math.round(TICKET_COST) * NUMBER_OF_PEOPLE);
            break;
        case "Gastos Prévios":
            texto = (texto != "-") ? texto : `${CURRENCY} ` + _addDotSeparator(Math.round(PREVIOUS_COST));
            break;
        case "Gasto Total":
        case "Total":
            texto = (texto != "-") ? texto : `${CURRENCY} ` + _addDotSeparator(Math.round(TOTAL_COST));
            break;
    }
    return `<i class="${icone}"></i>
    <span>${texto}</span>
    <p>${titulo}</p>`;
}

function _getValorIngressos() {
    let result = 0;
    let keys = Object.keys(PREVIOUS_COST_OBJECT);

    for (let i = 0; i < keys.length; i++) {
        let lowerCase = keys[i].toLowerCase();
        if (lowerCase.includes("ingresso")) {
            result += PREVIOUS_COST_OBJECT[keys[i]]
        }
    }

    return result;
}

function _getMultiplosVoos(dados) {
    let newDados = [];
    let ida = "";
    let volta = "";

    for (let i = 0; i < FLIGHTS_TO_DESTINATION.length; i++) {
        let separator = i == 0 ? "" : " | ";
        let idaArray = ida.split(" | ");
        let skip = false;
        for (let j = 0; j < idaArray.length; j++) {
            if (idaArray[j] == dados[FLIGHTS_TO_DESTINATION[i]]) {
                skip = true;
                break;
            }
        }
        if (!skip) {
            ida += separator + dados[FLIGHTS_TO_DESTINATION[i]];
        }
    }

    for (let i = 0; i < FLIGHTS_TO_HOME.length; i++) {
        let separator = i == 0 ? "" : " | ";
        let voltaArray = volta.split(" | ");
        let skip = false;
        for (let j = 0; j < voltaArray.length; j++) {
            if (voltaArray[j] == dados[FLIGHTS_TO_HOME[i]]) {
                skip = true;
                break;
            }
        }
        if (!skip) {
            volta += separator + dados[FLIGHTS_TO_HOME[i]];
        }
    }
    newDados.push(ida);
    newDados.push(volta);

    return newDados;
}

// ======= CONVERTERS =======
function _ajustDataHyperlink() { // Adiciona os dados de hyperlink ao SHEET_DATA
    if (!IS_DATA_BACKUP_ACTIVE) {
        for (let i = 0; i < SHEET_DATA.length; i++) {
            let hyperlink = _getHyperLink(i);
            SHEET_DATA[i].push(hyperlink)
        }
    }
}

function _formatTxt(text) { // Remove caixa alta e qualquer acentuação do texto (áBç -> abc)
    try {
        return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    } catch (e) {
        return text
    }
}

function _addDotSeparator(val) { // Adiciona ponto ao valor (1000 -> 1.000)
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
}

function _adaptTransporte() { // Transforma os dados de transporte (DADOS) de acordo com os dados do Google Sheets
    let mode = {
        current: "ida",
        ida: {
            mode: "ida",
            found: false,
            index: 0,
            max: MULTIPLE_FLIGHTS ? FLIGHTS_TO_DESTINATION.length : 1,
            result: {
                text: TRANSPORTATION_JSON["defaultTransportation"]["default"]["text"],
                icon: TRANSPORTATION_JSON["defaultTransportation"]["default"]["icon"]
            },
            multipleTexts: false
        },
        volta: {
            mode: "volta",
            found: false,
            index: 0,
            max: MULTIPLE_FLIGHTS ? FLIGHTS_TO_HOME.length : 1,
            result: {
                text: TRANSPORTATION_JSON["defaultTransportation"]["default"]["text"],
                icon: TRANSPORTATION_JSON["defaultTransportation"]["default"]["icon"]
            },
            multipleTexts: false
        }
    }

    for (let i = 0; i < SHEET_DATA.length; i++) { // Procura em cada linha do SHEET_DATA
        let currentMode = mode["current"];
        if (SHEET_DATA[i][5] == "Ida/Volta" && currentMode) {
            let search = _formatTxt(SHEET_DATA[i][3]) + " " + _formatTxt(SHEET_DATA[i][4]);
            for (let j = 0; j < TRANSPORTATION_JSON["texts"].length; j++) {
                let currentText = TRANSPORTATION_JSON["texts"][j];
                let currentIcon = TRANSPORTATION_JSON["icons"][j];

                let searchedtext = _formatTxt(TRANSPORTATION_JSON["texts"][j]);
                let altText = TRANSPORTATION_JSON["altTexts"][searchedtext];
                let foundInAltText = false;

                if (altText) {
                    for (let k = 0; k < altText.length; k++) {
                        if (search.includes(_formatTxt(altText[k]))) {
                            foundInAltText = true;
                            break;
                        }
                    }
                }
                if (search.includes(searchedtext) || foundInAltText) { // Se encontrado
                    if (mode[currentMode]["index"] > 0 && mode[currentMode]["text"] != currentText) { // Caso já tenha encontrado um texto diferente anteriormente
                        mode[currentMode]["multipleTexts"] = true;
                    } else {
                        mode[currentMode]["result"]["text"] = currentText;
                        mode[currentMode]["result"]["icon"] = currentIcon;
                    }
                }
                mode[currentMode]["index"]++;
                if (mode[currentMode]["index"] == mode[currentMode]["max"] || mode[currentMode]["multipleTexts"]) { // Se já encontrou todos os textos ou se encontrou textos diferentes 
                    mode[currentMode]["found"] = true;
                    mode["current"] = currentMode == "ida" ? "volta" : "";
                    break;
                }
            }
        }
    }

    if (!mode["ida"]["multipleTexts"] && mode["ida"]["found"]) {
        TRANSPORTATION_JSON["defaultTransportation"]["ida"]["text"] = mode["ida"]["result"]["text"];
        TRANSPORTATION_JSON["defaultTransportation"]["ida"]["icon"] = mode["ida"]["result"]["icon"];
    }
    if (!mode["volta"]["multipleTexts"] && mode["volta"]["found"]) {
        TRANSPORTATION_JSON["defaultTransportation"]["volta"]["text"] = mode["volta"]["result"]["text"];
        TRANSPORTATION_JSON["defaultTransportation"]["volta"]["icon"] = mode["volta"]["result"]["icon"];
    }
}