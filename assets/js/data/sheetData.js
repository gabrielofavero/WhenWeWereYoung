// ======= Sheet Data JS =======

// ======= LOADERS =======
function _loadMainData() {
    for (let i = 0; i < SHEET_DATA.length; i++) {
        let range = _removeQuotes(SHEET_DATA[i].range);
        let values = SHEET_DATA[i].values;
        let key = _findMainRangeKey(range);
        if (key != null) {
            _assingRangeMain(key, values);
        }
    }
}

function _loadPlacesData() {
    for (let i = 0; i < PLACES_RANGES_ARRAY.length; i++) {
        let key = PLACES_KEYS[i];
        if (!SHEET_PLACES[key]) {
            SHEET_PLACES[key] = [];
        }
        SHEET_PLACES[key].push(...P_DATA[i].values);
    }
}

function _loadHyperlinks() {
    for (let i = 0; i < HYPERLINK.length; i++) {
        let innerKey = _findHyperlinkRangeKey(HYPERLINK_RANGES_KEYS[i]);
        let key = HYPERLINK_RANGES_INNER_KEYS[i];

        if (!P_HYPERLINK[key]) {
            P_HYPERLINK[key] = {};
        }

        if (!P_HYPERLINK[key][innerKey]) {
            P_HYPERLINK[key][innerKey] = [];
        }
        let values = [];
        if (HYPERLINK[i].rowData) {
            values = _getHyperlinkValues(HYPERLINK[i].rowData);
        }

        P_HYPERLINK[key][innerKey].push(values);
    }
}

function _loadMainRanges() {
    let keys = Object.keys(MAIN_RANGES);
    for (let key of keys) {
        let value = MAIN_RANGES[key];

        if (typeof value === "object" && key == "R_PLACES") {
            let innerKeys = Object.keys(value);
            for (let innerKey of innerKeys) {
                let innerValue = value[innerKey];
                if (Array.isArray(innerValue)) {
                    for (let i = 0; i < innerValue.length; i++) {
                        PLACES_KEYS.push(innerKey);
                    }
                    MAIN_RANGES_ARRAY.push(...innerValue);
                } else {
                    PLACES_KEYS.push(innerKey);
                    MAIN_RANGES_ARRAY.push(innerValue);
                }
            }
        } else if (Array.isArray(value)) {
            MAIN_RANGES_ARRAY.push(...value);
        } else {
            MAIN_RANGES_ARRAY.push(value);
        }
    }
}

function _loadPlacesRanges() {
    let keys = Object.keys(PLACES_RANGES);
    for (let key of keys) {
        let value = PLACES_RANGES[key];
        PLACES_KEYS.push(key);
        PLACES_RANGES_ARRAY.push(...value);
    }
}

function _loadHyperlinkRanges() {
    let keys = Object.keys(HYPERLINK_RANGES);
    for (let key of keys) {
        let innerKeys = Object.keys(HYPERLINK_RANGES[key]);
        for (let innerKey of innerKeys) {
            let value = HYPERLINK_RANGES[key][innerKey];
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    HYPERLINK_RANGES_KEYS.push(key);
                    HYPERLINK_RANGES_INNER_KEYS.push(innerKey);
                }
                HYPERLINK_RANGES_ARRAY.push(...value);
            } else {
                HYPERLINK_RANGES_KEYS.push(key);
                HYPERLINK_RANGES_INNER_KEYS.push(innerKey);
                HYPERLINK_RANGES_ARRAY.push(value);
            }
        }
    }
}

// ======= GETTERS =======
function _findHyperlinkRangeKey(variable) {
    switch (variable) {
        case "R_PLACES_HYPERLINK_NAME":
            return "name";
        case "R_PLACES_HYPERLINK_VIDEO":
            return "video";
        case "R_PLACES_HYPERLINK_INSTAGRAM":
            return "insta";
        default:
            return variable;
    }
}

function _findMainRangeKey(value) {
    let keys = Object.keys(MAIN_RANGES);
    for (let key of keys) {
        let adaptedKey = _removeQuotes(key);
        let range;
        if (typeof MAIN_RANGES[adaptedKey] === "object") {
            range = JSON.stringify(MAIN_RANGES[adaptedKey]);
        } else {
            range = MAIN_RANGES[adaptedKey].toString();
        }
        if (range.includes(value)) {
            return key;
        }
    }
    return null;
}

function _getHyperlinkValues(dirtyValues) {
    let values = [];
    for (let i = 0; i < dirtyValues.length; i++) {
        let value;
        try {
            value = dirtyValues[i].values[0].hyperlink;
        } catch (error) {
            value = "";
        }
        values.push(value);
    }
    return values;
}

// ======= SETTERS =======
function _assingRangeMain(variable, value) {
    switch (variable) {
        case "R_DIA_A_DIA":
            SHEET_DAY_TO_DAY = value;
            break;
        case "R_VOOS":
            SHEET_FLIGHTS = value;
            break;
        case "R_GASTOS":
            SHEET_COSTS = value;
            break;
        case "R_TOTAL":
            SHEET_TOTAL = value[0][0];
            break;
        case "R_PREVISOES":
            SHEET_PREDICTIONS = value;
            break;
        case "R_PROGRAMACAO":
            SHEET_SCHEDULE.push(...value);
            break;
        default:
            _logger(ERROR, "Variable not found: " + variable)
    }
}

// ======= FORMATTERS =======
function _removeQuotes(value) {
    return value.replace(/['"]+/g, '');
}
