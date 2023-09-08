function initLivenessSDK(token) {
    HyperSnapSDK.init("Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjBzM3dwayIsImhhc2giOiI3ZmY0MjkzMTdlZjVjMWFhZDNmNjE4NmMzMGM0YmMwOTdkY2UzZGRmNGM2YWQzZjVkZjZhMTlkMmVmMmM4N2VhIiwiaWF0IjoxNjk0MDA5NTk5LCJleHAiOjE2OTQwOTU5OTksImp0aSI6ImU3M2ExY2UxLTkxNmEtNDAwOC04NDVkLTZiMmU1N2YxMjRjOSJ9.noyk10uYV8GzeFk9wZWIfagne3cnlJx20yUaKjWKWfus1u7udIjHM7FlIsgkAB5ugUqmbeDDmIF-mw5jKG7M_e7xEpdxbjy9ftJGx6yyEhoMgziT6Y7CI3KLQqQrcoMMcuc8ftX11JKz8RMyRcjsIPa0lUt3pheEvWwpo9WcS8o",HyperSnapParams.Region.India);
    HyperSnapSDK.startUserSession();
}


async function launchFaceCaptureScreen(){
    let promise = new Promise(function(resolve,reject){
        var hvFaceConfig = new HVFaceConfig(); // First create a hvdoc config object
hvFaceConfig.setShouldShowInstructionPage(false);

HVFaceModule.start(hvFaceConfig, callback);// Start the HVFaceModule. Callback is the function that receives the data once the api call finishes.It gets two objects HVError and HVResponse.

 

function callback (HVError, HVResponse){
  if(HVError) {
    resolve(JSON.stringify(HVError));
  } 
  else if(HVResponse) {
    console.log(HVResponse);

    var apiResults = HVResponse.getApiResult();
    var apiHeaders = HVResponse.getApiHeaders();
    var imageBase64 = HVResponse.getImageBase64();
    var attempts = HVResponse.getAttemptsCount();
    // console.log(HVResponse['croppedFace']);
    // console.log(imageBase64);
    // console.log(apiHeaders);
    // console.log(attempts);
    // console.log("api results",apiResults);
    resolve(JSON.stringify(HVResponse));
  }
}
});
let result = await promise;
// console.log("result",result);
return result;
    
}
