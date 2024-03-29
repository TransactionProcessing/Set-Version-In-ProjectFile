const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

try {
    // get the input values
    const filePath = core.getInput("filepath");
    console.log(filePath);
    const versionNumber = core.getInput("versionnumber");
    console.log(versionNumber);
    const isWindows = core.getInput("isWindows");
    console.log(isWindows);

    fs.readFile(filePath,
        "utf8",
        function(err, data) {
            if (err) {
                return console.log(err);
            }

            var versionReplacementString = `<ApplicationVersion>${versionNumber}</ApplicationVersion>`;
            versionReplacementString  = versionReplacementString.replaceAll(".","");
            console.log(versionReplacementString);
            var displayVersionReplacementString =
                `<ApplicationDisplayVersion>${versionNumber}</ApplicationDisplayVersion>`;
            console.log(displayVersionReplacementString);
            
            var result = null;
            if (isWindows === "true"){
                result = data.replace("<ApplicationVersion>1</ApplicationVersion>", "");
                result = result.replace("<ApplicationDisplayVersion>1</ApplicationDisplayVersion>",
                    displayVersionReplacementString);
            }
            else{
                result = data.replace("<ApplicationVersion>1</ApplicationVersion>", versionReplacementString);
                result = result.replace("<ApplicationDisplayVersion>1</ApplicationDisplayVersion>",
                    displayVersionReplacementString);
            }

            console.log(result);
            fs.writeFile(filePath,
                result,
                "utf8",
                function(err) {
                    if (err) return console.log(err);
                });
            fs.readFile(filePath,
                "utf8",
                function(err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(data);
                });


        });

} catch (error) {
    core.setFailed(error.message);
}
