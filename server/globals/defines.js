let responseMessages = {
    ok: 'ok',
    error: 'error',
    notExist: 'not_exist',
    alreadyExist: 'already-exist',
    dbError: 'db-error',
};

let apis = {
    weatherAPIKey: 'W62ykXGtLAPpYSffpGWiXZyGWfZdACAW',
    weatherAPI_GeoPositionURL: 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search',
    weatherAPI_CurrentConditionURL: 'http://dataservice.accuweather.com/currentconditions/v1/',
    geocodingAPIKey: 'AIzaSyAwRD83rZgwMX6eBRFVMgew7jqlokkxDGg',
    geocodingAPIURL: 'https://maps.googleapis.com/maps/api/geocode/json?',
    estatedAPIToken: 'ZdazQ7ljLuBbSvbaJ4rwvQPem0uG3m',
    estatedAPIURL: 'https://apis.estated.com/v4/property?token=',
}

export {responseMessages, apis};
