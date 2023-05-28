// ======= Places JS =======

// ======= LOADERS =======
function _loadPlaces() {
  let keys = Object.keys(SHEET_PLACES);

  for (let key of keys) {
    let titleIndex = -1;
    let spk = SHEET_PLACES[key];
    for (let i = 0; i < spk.length; i++) {
      if (spk[i][0] != "" && spk[i][1] != undefined) {
        titleIndex++;

        if (!P_RESULT[key]) {
          P_RESULT[key] = [];
        }

        P_RESULT[key].push({
          titulo: spk[i][0],
        });
      }
      if (spk[i][1]) {
        P_RESULT[key][titleIndex][_translateHeader(spk[i][1])] = _getHeaderData(spk[i]);
      }
    }
  }

  if (_validatePlaces()) {
    _adaptPlaces();
    _getPResult();
  }
  window.addEventListener("resize", function () {
    _adjustPlacesHTML();
  });
}

function _loadPlacesSelect() {
  let select = document.getElementById("places-select");
  let firstOption = document.createElement("option");

  firstOption.value = CITIES[0];
  firstOption.text = CITIES_INDEX_JSON[CITIES[0]];
  select.add(firstOption);
  firstOption.selected = true;

  if (CITIES.length > 1) {
    for (let i = 1; i < CITIES.length; i++) {
      let newOption = document.createElement("option");
      newOption.value = CITIES[i];
      newOption.text = CITIES_INDEX_JSON[CITIES[i]];
      select.add(newOption);
    };
  } else {
    select.style.display = "none";
  };

  select.addEventListener("change", function () {
    _loadPlacesHTML(select.value);
    _adjustPlacesHTML();
    //_setPlacesURL(select.value);
  });
}

// ======= GETTERS =======
function _getPResult() {
  let keys = Object.keys(P_RESULT);
  for (let key of keys) {
    if (P_RESULT[key] && P_HYPERLINK[key]) {
      let p_lenght = P_RESULT[key].length;
      let n_lenght = P_HYPERLINK[key]["name"].length;
      let i_lenght = P_HYPERLINK[key]["insta"].length;
      let v_lenght = P_HYPERLINK[key]["video"].length;
      if (p_lenght == n_lenght && p_lenght == i_lenght && p_lenght == v_lenght) {
        for (let i = 0; i < P_RESULT[key].length; i++) {
          P_RESULT[key][i].hyperlink = {};
          P_RESULT[key][i].hyperlink.name = P_HYPERLINK[key]["name"][i];
          P_RESULT[key][i].hyperlink.insta = P_HYPERLINK[key]["insta"][i];
          P_RESULT[key][i].hyperlink.video = P_HYPERLINK[key]["video"][i];
        }
      } else {
        let lenghtObj = {
          "P_RESULT": p_lenght,
          "P_HYPERLINK": {
            "name": n_lenght,
            "insta": i_lenght,
            "video": v_lenght
          }
        }
        _logger(ERROR, "It is not possible to save the hyperlinks for '" + key + "'. The number of parameters of P_RESULT and P_HYPERLINK are not equal: ")
        console.log(lenghtObj);
      }
    }
  }
  _exportPlacesVariables();
}

function _getHeaderData(data) {
  let result = [];
  for (let i = 2; i < data.length; i++) {
    result.push(data[i]);
  }
  return result;
}

function _getPlacesNoMap() {
  let result = [];
  for (let i = 0; i < PLACES_JSON.length; i++) {
    if (PLACES_JSON[i]["title"] != "Mapa") {
      result.push(PLACES_JSON[i]);
    }
  }
  return result;
}

function getPlacesSelectValue() {
  let select = document.getElementById("places-select");
  return select.value || CITIES[0];
}

// ======= SETTERS =======
function _exportPlacesVariables() {
  window.localStorage.setItem('P_RESULT', JSON.stringify(P_RESULT));
  window.localStorage.setItem('PLACES_JSON', JSON.stringify(PLACES_JSON));
  window.localStorage.setItem('PLACES_CURRENCY_JSON', JSON.stringify(PLACES_CURRENCY_JSON));
  window.localStorage.setItem('PLACES_SETTINGS_JSON', JSON.stringify(PLACES_SETTINGS_JSON));
  window.localStorage.setItem('CURRENCY', CURRENCY);
}

function _setPlacesURL(city) {
  let passeiosBox = document.getElementById("passeiosBox");
  for (let i = 0; i < passeiosBox.children.length; i++) {
    let linkDiv = document.getElementById(`ba${i+1}`);
    let link = linkDiv.href;
    let linkSplit = link.split("?");
    let url = linkSplit[0];
    let params = linkSplit[1];
    let otherParams = params.split("&");
    let newParams = `city=${city}`;
    for (let j = 1; j < otherParams.length; j++) {
      newParams += `&${otherParams[j]}`;
    }
    link = url + "?" + newParams;
    linkDiv.href = link;
  }
}

// ======= CONVERTERS =======
function _adaptPlaces() {
  for (let i = 0; i < P_RESULT.length; i++) {
    for (let j = 0; j < P_RESULT[i].nome.length; j++) {
      if (P_RESULT[i].nota[j] == "-100%") {
        P_RESULT[i].nota[j] = "";
      }
      if (P_RESULT[i].visitado && P_RESULT[i].visitado[j] == undefined) {
        P_RESULT[i].visitado[j] = "";
      }
    }
    if (P_RESULT[i].nota.length > P_RESULT[i].nome.length) {
      P_RESULT[i].nota.splice(P_RESULT[i].nome.length, P_RESULT[i].nota.length - P_RESULT[i].nome.length);
    }
  }
}

function _translateHeader(header) {
  // $ -> Value  
  let result = _formatTxt(header);

  for (let key in PLACES_SETTINGS_JSON["translations"]) {
    if (header == PLACES_SETTINGS_JSON["translations"][key]) {
      result = key;
      break;
    }
  }

  return result;
}

// ======= CHECKERS =======
function _validatePlaces() {
  let required = PLACES_SETTINGS_JSON["required"];
  for (let i = 0; i < P_RESULT.length; i++) {
    let titulo = P_RESULT[i].titulo;
    let keys = Object.keys(P_RESULT[i]);
    let exists = false;
    for (let j = 0; j < required.length; j++) {
      if (keys.includes(_formatTxt(required[j]))) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      _logger(ERROR, `${titulo} does not contain the required parameters`);
      return false;
    }
  }
  return true;

}

function _areRequiredParamsPresent(text) {
  let required = PLACES_SETTINGS_JSON["required"];
  return required.indexOf(text) > -1;
}