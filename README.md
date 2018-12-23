# Visa information API

This is an ExpressJS API which connects to a MySQL database containing information regarding visa requirements for each nationality and each country. The data was fetched from Wikipedia using [this webscraper](https://github.com/mierz00/visa-webscraper).

# Requirements

The api requires a MySQL database with two tables.
Table one called "nationalities" in the format:

    nationalities
    Abkhaz
    Afghan"
    Albanian
    Algerian

Table two called "restrictions" in the format:

    nationality;country;visaType;duration;note
    Afghan;Albania;Visa required;30 days;May apply online

## Install

    yarn install

## Run the app for production

    yarn start

## Run the app dev (Uses nodemon)

    yarn start-dev

# API Endpoints

## Get list of nationalities

### Request

`GET /nationalities/`

    curl -i -H 'Accept: application/json' http://localhost:4000/nationalities/

### Response

```json
{
  "status": 200,
  "nationality_list": ["Abkhaz", "Afghan", "Albanian", "Algerian"]
}
```

## Get all visa restrictions for a nationality

### Request

`GET /restrictions/<nationality>`

### Parameters

    nationality

### Example

    curl -i -H 'Accept: application/json' http://localhost:4000/restrictions/australian

### Response

```json
{
    "status": 200,
    "data": {
        "nationality": "australian",
        "countries": [
            {
                "country": "Afghanistan",
                "visatype": "Visa required",
                "duration": "",
                "note": "Due to safety concerns, Australian government advises its citizens not to visit Afghanistan."
            },
            ...
        ]
    }
}
```

## Get country specific visa restrictions for a nationality

### Request

`GET /restrictions/<nationality>/<country>`

### Parameters

    nationality
    country

### Example

    curl -i -H 'Accept: application/json' http://localhost:4000/restrictions/australian/albania

### Response

```json
{
  "status": 200,
  "data": {
    "nationality": "Australian",
    "country": "Albania",
    "visatype": "Visa not required",
    "duration": "90 days",
    "note": ""
  }
}
```
