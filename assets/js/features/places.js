// ======= Places JS =======

// ======= LOADERS =======
function _loadPlaces() {
  titleIndex = -1;
  let keys = Object.keys(SHEET_PLACES);

  for (let key of keys) {
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

function _loadPlacesHTML() {
  let div = document.getElementById("passeiosBox");
  let text = "";
  let places = PLACES_JSON["places"];

  let sizeObj = {};
  let i = 0;
  let j = 0;

  for (i; i < places.length; i++) {
    if (!PLACES_JSON["hidden"].includes(places[i]["title"])) {
      sizeObj[j] = i;
      j++;
    }
  }
  let linktype = _getLinkType();
  PLACES_FILTERED_SIZE = Object.keys(sizeObj).length;

  if (PLACES_FILTERED_SIZE >= 1) {
    let internalIndex = sizeObj["0"];
    let title = places[internalIndex]["displayTitle"] || places[internalIndex]["title"];
    let code = places[internalIndex]["code"];
    let href = title == "Mapa" ? MY_MAPS: "#";
    let lt = title == "Mapa" ? linktype : "";
    let onclick = title == "Mapa" ? "" : `onclick="openLightbox('${_getPlacesHref(code)}')"`;
    let icon = places[internalIndex]["icon"];
    let description = places[internalIndex]["description"];
    text += `
      <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100" id="b1">
      <a href="${href}" ${lt} ${onclick} title="Portfolio Details" id="ba1">
          <div class="icon-box iconbox-blue" id="ib1">
            <div class="icon">
              <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,521.0016835830174C376.1290562159157,517.8887921683347,466.0731472004068,529.7835943286574,510.70327084640275,468.03025145048787C554.3714126377745,407.6079735673963,508.03601936045806,328.9844924480964,491.2728898941984,256.3432110539036C474.5976632858925,184.082847569629,479.9380746630129,96.60480741107993,416.23090153303,58.64404602377083C348.86323505073057,18.502131276798302,261.93793281208167,40.57373210992963,193.5410806939664,78.93577620505333C130.42746243093433,114.334589627462,98.30271207620316,179.96522072025542,76.75703585869454,249.04625023123273C51.97151888228291,328.5150500222984,13.704378332031375,421.85034740162234,66.52175969318436,486.19268352777647C119.04800174914682,550.1803526380478,217.28368757567262,524.383925680826,300,521.0016835830174"></path>
              </svg>
              <i class="${icon}"></i>
            </div>
            <div id="b1t"><h4>${title}</h4></div>
            <div id="b1d"><p>${description}</p></div>
          </div>
        </a>
      </div>`;
  };

  if (PLACES_FILTERED_SIZE >= 2) {
    let internalIndex = sizeObj["1"];
    let title = places[internalIndex]["displayTitle"] || places[internalIndex]["title"];
    let code = places[internalIndex]["code"];
    let href = title == "Mapa" ? MY_MAPS: "#";
    let lt = title == "Mapa" ? linktype : "";
    let onclick = title == "Mapa" ? "" : `onclick="openLightbox('${_getPlacesHref(code)}')"`;
    let icon = places[internalIndex]["icon"];
    let description = places[internalIndex]["description"];
    text += `
      <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200" id="b2">
      <a href="${href}" ${lt} ${onclick} title="Portfolio Details" id="ba2">
          <div class="icon-box iconbox-orange" id="ib2">
            <div class="icon">
              <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"></path>
              </svg>
              <i class="${icon}"></i>
            </div>
            <div id="b2t"><h4>${title}</h4></div>
            <div id="b2d"><p>${description}</p></div>
          </div>
        </a>
      </div>`;
  };

  if (PLACES_FILTERED_SIZE >= 3) {
    let internalIndex = sizeObj["2"];
    let title = places[internalIndex]["displayTitle"] || places[internalIndex]["title"];
    let code = places[internalIndex]["code"];
    let href = title == "Mapa" ? MY_MAPS: "#";
    let lt = title == "Mapa" ? linktype : "";
    let onclick = title == "Mapa" ? "" : `onclick="openLightbox('${_getPlacesHref(code)}')"`;
    let icon = places[internalIndex]["icon"];
    let description = places[internalIndex]["description"];
    text += `
      <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="300" id="b3">
      <a href="${href}" ${lt} ${onclick} title="Portfolio Details" id="ba3">
          <div class="icon-box iconbox-pink" id="ib3">
            <div class="icon">
              <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,541.5067337569781C382.14930387511276,545.0595476570109,479.8736841581634,548.3450877840088,526.4010558755058,480.5488172755941C571.5218469581645,414.80211281144784,517.5187510058486,332.0715597781072,496.52539010469104,255.14436215662573C477.37192572678356,184.95920475031193,473.57363656557914,105.61284051026155,413.0603344069578,65.22779650032875C343.27470386102294,18.654635553484475,251.2091493199835,5.337323636656869,175.0934190732945,40.62881213300186C97.87086631185822,76.43348514350839,51.98124368387456,156.15599469081315,36.44837278890362,239.84606092416172C21.716077023791087,319.22268207091537,43.775223500013084,401.1760424656574,96.891909868211,461.97329694683043C147.22146801428983,519.5804099606455,223.5754009179313,538.201503339737,300,541.5067337569781"></path>
              </svg>
              <i class="${icon}"></i>
            </div>
            <div id="b3t"><h4>${title}</h4></div>
            <div id="b3d"><p>${description}</p></div>
          </div>
        </a>
      </div>`;
  };

  if (PLACES_FILTERED_SIZE >= 4) {
    let internalIndex = sizeObj["3"];
    let title = places[internalIndex]["displayTitle"] || places[internalIndex]["title"];
    let code = places[internalIndex]["code"];
    let href = title == "Mapa" ? MY_MAPS: "#";
    let lt = title == "Mapa" ? linktype : "";
    let onclick = title == "Mapa" ? "" : `onclick="openLightbox('${_getPlacesHref(code)}')"`;
    let icon = places[internalIndex]["icon"];
    let description = places[internalIndex]["description"];
    text += `
      <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="100" id="b4">
      <a href="${href}" ${lt} ${onclick} title="Portfolio Details" id="ba4">
          <div class="icon-box iconbox-yellow" id="ib4">
            <div class="icon">
              <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,503.46388370962813C374.79870501325706,506.71871716319447,464.8034551963731,527.1746412648533,510.4981551193396,467.86667711651364C555.9287308511215,408.9015244558933,512.6030010748507,327.5744911775523,490.211057578863,256.5855673507754C471.097692560561,195.9906835881958,447.69079081568157,138.11976852964426,395.19560036434837,102.3242989838813C329.3053358748298,57.3949838291264,248.02791733380457,8.279543830951368,175.87071277845988,42.242879143198664C103.41431057327972,76.34704239035025,93.79494320519305,170.9812938413882,81.28167332365135,250.07896920659033C70.17666984294237,320.27484674793965,64.84698225790005,396.69656628748305,111.28512138212992,450.4950937839243C156.20124167950087,502.5303643271138,231.32542653798444,500.4755392045468,300,503.46388370962813"></path>
              </svg>
              <i class="${icon}"></i>
            </div>
            <div id="b4t"><h4>${title}</h4></div>
            <div id="b4d"><p>${description}</p></div>
          </div>
        </a>
      </div>`;
  };

  if (PLACES_FILTERED_SIZE >= 5) {
    let internalIndex = sizeObj["4"];
    let title = places[internalIndex]["displayTitle"] || places[internalIndex]["title"];
    let code = places[internalIndex]["code"];
    let href = title == "Mapa" ? MY_MAPS: "#";
    let lt = title == "Mapa" ? linktype : "";
    let onclick = title == "Mapa" ? "" : `onclick="openLightbox('${_getPlacesHref(code)}')"`;
    let icon = places[internalIndex]["icon"];
    let description = places[internalIndex]["description"];
    text += `
      <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="200" id="b5">
      <a href="${href}" ${lt} ${onclick} title="Portfolio Details" id="ba5">
          <div class="icon-box iconbox-red" id="ib5">
            <div class="icon">
              <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,532.3542879108572C369.38199826031484,532.3153073249985,429.10787420159085,491.63046689027357,474.5244479745417,439.17860296908856C522.8885846962883,383.3225815378663,569.1668002868075,314.3205725914397,550.7432151929288,242.7694973846089C532.6665558377875,172.5657663291529,456.2379748765914,142.6223662098291,390.3689995646985,112.34683881706744C326.66090330228417,83.06452184765237,258.84405631176094,53.51806209861945,193.32584062364296,78.48882559362697C121.61183558270385,105.82097193414197,62.805066853699245,167.19869350419734,48.57481801355237,242.6138429142374C34.843463184063346,315.3850353017275,76.69343916112496,383.4422959591041,125.22947124332185,439.3748458443577C170.7312796277747,491.8107796887764,230.57421082200815,532.3932930995766,300,532.3542879108572"></path>
              </svg>
              <i class="${icon}"></i>
            </div>
            <div id="b5t"><h4>${title}</h4></div>
            <div id="b5d"><p>${description}</p></div>
          </div>
        </a>
      </div>`;
  };

  if (PLACES_FILTERED_SIZE >= 6) {
    let internalIndex = sizeObj["5"];
    let title = places[internalIndex]["displayTitle"] || places[internalIndex]["title"];
    let code = places[internalIndex]["code"];
    let href = title == "Mapa" ? MY_MAPS: "#";
    let lt = title == "Mapa" ? linktype : "";
    let onclick = title == "Mapa" ? "" : `onclick="openLightbox('${_getPlacesHref(code)}')"`;
    let icon = places[internalIndex]["icon"];
    let description = places[internalIndex]["description"];
    text += `
      <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="300" id="b6">
      <a href="${href}" ${lt} ${onclick} title="Portfolio Details" id="ba6">
          <div class="icon-box iconbox-teal" id="ib6">
            <div class="icon">
              <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,566.797414625762C385.7384707136149,576.1784315230908,478.7894351017131,552.8928747891023,531.9192734346935,484.94944893311C584.6109503024035,417.5663521118492,582.489472248146,322.67544863468447,553.9536738515405,242.03673114598146C529.1557734026468,171.96086150256528,465.24506316201064,127.66468636344209,395.9583748389544,100.7403814666027C334.2173773831606,76.7482773500951,269.4350130405921,84.62216499799875,207.1952322260088,107.2889140133804C132.92018162631612,134.33871894543012,41.79353780512637,160.00259165414826,22.644507872594943,236.69541883565114C3.319112789854554,314.0945973066697,72.72355303640163,379.243833228382,124.04198916343866,440.3218312028393C172.9286146004772,498.5055451809895,224.45579914871206,558.5317968840102,300,566.797414625762"></path>
              </svg>
              <i class="${icon}"></i>
            </div>
            <div id="b6t"><h4>${title}</h4></div>
            <div id="b6d"><p>${description}</p></div>
          </div>
        </a>
      </div>`;
  };

  if (PLACES_FILTERED_SIZE >= 7) {
    let internalIndex = sizeObj["6"];
    let title = places[internalIndex]["displayTitle"] || places[internalIndex]["title"];
    let code = places[internalIndex]["code"];
    let href = title == "Mapa" ? MY_MAPS: "#";
    let lt = title == "Mapa" ? linktype : "";
    let onclick = title == "Mapa" ? "" : `onclick="openLightbox('${_getPlacesHref(code)}')"`;
    let icon = places[internalIndex]["icon"];
    let description = places[internalIndex]["description"];
    text += `
      <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="300" id="b6">
      <a href="${href}" ${lt} ${onclick} title="Portfolio Details" id="ba7">
          <div class="icon-box iconbox-green" id="ib7">
            <div class="icon">
              <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,521.0016835830174C376.1290562159157,517.8887921683347,466.0731472004068,529.7835943286574,510.70327084640275,468.03025145048787C554.3714126377745,407.6079735673963,508.03601936045806,328.9844924480964,491.2728898941984,256.3432110539036C474.5976632858925,184.082847569629,479.9380746630129,96.60480741107993,416.23090153303,58.64404602377083C348.86323505073057,18.502131276798302,261.93793281208167,40.57373210992963,193.5410806939664,78.93577620505333C130.42746243093433,114.334589627462,98.30271207620316,179.96522072025542,76.75703585869454,249.04625023123273C51.97151888228291,328.5150500222984,13.704378332031375,421.85034740162234,66.52175969318436,486.19268352777647C119.04800174914682,550.1803526380478,217.28368757567262,524.383925680826,300,521.0016835830174"></path>
              </svg>
              <i class="${icon}"></i>
            </div>
            <div id="b7t"><h4>${title}</h4></div>
            <div id="b7d"><p>${description}</p></div>
          </div>
        </a>
      </div>`;
  };

  if (PLACES_FILTERED_SIZE > 7) {
    _logger(WARN, "O número de parâmetros é maior que o permitido. Apenas os 6 primeiros serão exibidos.");
  };

  div.innerHTML = text;
  _adjustPlacesHTML();
}

function _loadPlacesSelect() {
  let select = document.getElementById("places-select");
  let firstOption = document.createElement("option");

  firstOption.value = CITIES[0];
  firstOption.text = CITIES_JSON[CITIES[0]];
  select.add(firstOption);
  firstOption.selected = true;

  if (CITIES.length > 1) {
    for (let i = 1; i < CITIES.length; i++) {
      let newOption = document.createElement("option");
      newOption.value = CITIES[i];
      newOption.text = CITIES_JSON[CITIES[i]];
      select.add(newOption);
    };
  } else {
    select.style.display = "none";
  };

  select.addEventListener("change", function () {
    _setPlacesURL(select.value);
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

function _getLinkType() {
  if (_isIOSDevice()) {
    return "";
  } else {
    return "target='_blank'";
  }
}

function _getPlacesHref(code) {
  if (code == "map") {
    return MY_MAPS;
  } else return `places.html?city=${getPlacesSelectValue()}&type=${code}`;
}

function _getPlacesNoMap() {
  let result = [];
  for (let i = 0; i < PLACES_JSON["places"].length; i++) {
    if (PLACES_JSON["places"][i]["title"] != "Mapa") {
      result.push(PLACES_JSON["places"][i]);
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

  for (let key in PLACES_JSON["translations"]) {
    if (header == PLACES_JSON["translations"][key]) {
      result = key;
      break;
    }
  }

  return result;
}

function _adjustPlacesHTML() {
  let heights = [];
  let maxHeight = 0;

  for (let i = 1; i <= PLACES_FILTERED_SIZE; i++) {
    let height = document.getElementById(`b${i}d`).offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
    heights.push(height);
  }

  for (let i = 1; i <= PLACES_FILTERED_SIZE; i++) {
    document.getElementById(`b${i}d`).style.height = `${maxHeight}px`;
  }
}

// ======= CHECKERS =======
function _validatePlaces() {
  let required = PLACES_JSON["required"];
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
  let required = PLACES_JSON["required"];
  return required.indexOf(text) > -1;
}