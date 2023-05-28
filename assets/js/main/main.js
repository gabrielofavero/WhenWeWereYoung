/* ======= Main JS =======
    - Template Name: MyResume - v4.5.0
    - Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
    - Author: BootstrapMade.com
    - License: https://bootstrapmade.com/license/
        - Modified by: Gabriel Fávero
*/

(function () {
  try {
    "use strict";
    $('body').css('overflow', 'hidden');

    // Places
    PLACES_JSON = _getJSON("assets/json/module/places/Places.json");
    PLACES_CURRENCY_JSON = _getJSON("assets/json/module/places/Currency.json");
    PLACES_SETTINGS_JSON = _getJSON("assets/json/module/places/Settings.json");

    PLACES_CITIES_JSON = _getJSON("assets/json/module/places/Cities.json");	
    CITIES = Object.keys(PLACES_CITIES_JSON);

    _loadModule();
    if (!IS_PLACES_ACTIVE) {
      document.getElementById("servicesM").innerHTML = "";
    }

    // Gallery
    GALLERY_JSON = _getJSON("assets/json/module/Gallery.json");
    if (_checkGallery()) {
      _loadGallery();
    } else {
      document.getElementById("portfolioM").innerHTML = "";
      document.getElementById("portfolio").style.display = "none";
    }
    _adjustNightModeButtonPosition();
    
    // Cities
    CITIES_INDEX_JSON = _getJSON("assets/json/module/Cities Index.json");
    _loadPlacesSelect();

    // Places Ranges
    PLACES_RANGES = _getJSON("assets/json/ranges/Places Ranges.json");
    _loadPlacesRanges();

    // Hyperlink Ranges
    HYPERLINK_RANGES = _getJSON("assets/json/ranges/Hyperlink Ranges.json");
    _loadHyperlinkRanges();

    // Emoji Text Index
    let emojiIndex = _getJSON("assets/json/module/Emoji Text Index.json");
    EMOJI_JSON = emojiIndex["emoji"];
    TEXT_JSON = emojiIndex["text"];

    // Transportation
    TRANSPORTATION_JSON = _getJSON("assets/json/module/Transportation.json");

    // Keypoints
    KEYPOINTS_JSON = _getJSON("assets/json/module/Keypoints.json");

    // Schedule
    let schedule = _getJSON("assets/json/module/Schedule.json");
    PROG_INDEX = schedule["index"];
    PROG_TEXT_SUBSTITUTIONS = schedule["textSubstitutions"];
    TIME_OF_DAY = schedule["timeOfDay"];
    COST_DURING_TRIP_INDEX = schedule["gastoDuranteAViagem"];

    // Backup: SHEET_DATA, P_DATA, HYPERLINK
    SHEET_DATA_BACKUP = _getJSON("assets/json/backups/SHEET_DATA.json");
    P_DATA_BACKUP = _getJSON("assets/json/backups/P_DATA.json");
    HYPERLINK_BACKUP = _getJSON("assets/json/backups/HYPERLINK.json");

    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos,
        behavior: 'smooth'
      })
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
      select('body').classList.toggle('mobile-nav-active')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
      if (select(this.hash)) {
        e.preventDefault()

        let body = select('body')
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        mainLoad()
      });
    }
    /**
     * Hero type effect
     */
    const typed = select('.typed')
    if (typed) {
      let typed_strings = typed.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }

    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
      new Waypoint({
        element: skilsContent,
        offset: '80%',
        handler: function (direction) {
          let progress = select('.progress .progress-bar', true);
          progress.forEach((el) => {
            el.style.width = el.getAttribute('aria-valuenow') + '%'
          });
        }
      })
    }

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          portfolioIsotope.on('arrangeComplete', function () {
            AOS.refresh()
          });
        }, true);
      }

    });
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
    $('body').css('overflow', 'auto');
  } catch (error) {
    _displayErrorMessage(error);
    throw error;
  }
})()

async function mainLoad() {
  if (!FORCE_BACKUP_LOAD && !ERROR_MODE) {
    const loadPromise = _loadClient()
      .then(_getSheetDataSingle)
      .then(_getSheetPlaces)
      .then(_getSheetHyperlinks);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject('Timeout'), 10000) // 10 seconds
    );

    Promise.race([loadPromise, timeoutPromise])
      .catch(function (error) {
        _logger(ERROR, "Error loading data from Google Sheets API: " + error);
        _loadBackup();
      })
      .then(function () {
        if (!SHEET_DATA || !P_DATA || !HYPERLINK) {
          _loadBackup();
        }
        _syncFunctions();
      });
  } else {
    _loadBackup();
    _syncFunctions();
  }
}

function _syncFunctions() {
  try {
    // Data
    _loadPlacesData();
    _loadHyperlinks();
    _loadSheetDetails();

    // Transport Module
    _loadTransporteModule();

    // SumUp
    _loadSumUpSelectBox();
    _loadFirstSumUp();

    // Schedule
    _loadSchedule();
    _getDiaADia();

    // Other Modules
    _loadDadosModule();
    _loadSobreModule();

    // Places
    if (IS_PLACES_ACTIVE) {
      _loadPlaces();
    }

    // Loading Screen
    _stopLoadingScreen();
  } catch (error) {
    _displayErrorMessage(error);
    throw error;
  }
}

function _getJSON(path) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', path, false);
  xhr.send();

  if (xhr.status === 200) {
    return JSON.parse(xhr.responseText);
  } else {
    _logger(ERROR, "Failed to load JSON file in path: '" + path, "'")
  }
}