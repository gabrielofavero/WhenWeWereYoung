# TripViewer

## Description
Web application developed for viewing travels. This variation was designed for individual travels (or in small groups). This is a personal project and non-profit. Anyone is welcome to fork it, but ensure to mantain the credits located at the footer of the page.

There are other variations of this implementation, such as [FamilyTripViewer](https://github.com/gabrielofavero/FamilyTripViewer), which is focused on family trips and [Places](https://github.com/gabrielofavero/Passeios), which only lists places to visit in cities without the need of a trip.

For now, the application is only available in Portuguese. I'm planning to translate it to English in the future, but since is a personal project, it's not a priority.

## Credits
Developed by me! :D
Feel free to check my [LinkedIn](https://www.linkedin.com/in/gabrielfavero/).

### Front-End
- **index.html:** Adapted from the "MyResume" template from [BootstrapMade](https://bootstrapmade.com/);
- **places.html:** Made from scratch. The next version, not yet implemented, will be designed by [Guilherme Machado](https://www.linkedin.com/in/guilherme-machado-1797a31bb/).

### Back-End
- **main.js:** Adapted from the "MyResume" template from [BootstrapMade](https://bootstrapmade.com/). 
- All the other code was developed by me with the help of blood, sweat, tears, Google and ChatGPT ;)
- Currently the application uses [Google Sheets](https://www.google.com/sheets/about/) as database. The access is made through the [Google Sheets API](https://developers.google.com/sheets/api/quickstart/js). The API key is exposed in the code, but it only works in the domain of the website. I might scrap this in the future and use a proper database, but no ETA for that.

## Files

### Exclusive Files
<sub>Only used in this project. Not reusable attributes</sub>

#### JavaScript
- **data**
    - dataModules.js
- **features**
    - gallery.js
    - schedule-list.js
    - sum-up.js

#### JSON
- **backups**
    - HYPERLINK.json
    - P_DATA.json
    - SHEET_DATA.json
- **module**
    - Gallery.json
    - Schedule.json
    - Transportation.json

#### Images
- All images are exclusive to this project.

### Partially Reusable Files
<sub>Have reusable attributes, but the file varies according to the implementation</sub>

#### HTML
- index.html

#### CSS
- **index.html**
 - style.css
 - style-dark.css

#### JavaScript
- **main**
    - main.js
    - module.js
    - variables.js

#### JSON
- **ranges**
    - Hyperlink Ranges.json
    - Places Ranges.json
- **module**
    - Keypoints.json

### Reusable Files
<sub>The JS file is the same for all implementations</sub>

#### HTML
- places.html

#### CSS
- **places.html**
 - places.css
 - places-dark.css

#### JavaScript
- **data**
    - sheetData.js
- **features**
    - countdown.js
- **main**
    - placesHTML.js
- **support**
     - date.js
     - device.js
     - lightbox.js
     - loading.js
     - logger.js
     - visibility.js

#### JSON
- **module**
    - Cities.json
    - Emoji Text Index.json
    - Places.json


## Pending Tasks
### High Priority
1. Remodel Front-End / Back-End of "Places" according to the new pattern developed by Guilherme.

### Medium Priority

### Low Priority