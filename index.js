const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')

try {
  // get the input values
  const filePath = core.getInput('filepath');
    console.log(filePath);
  const versionNumber = core.getInput('versionnumber');
  console.log(versionNumber);
  
    fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    //<ApplicationVersion>1</ApplicationVersion>
    //var replacementString = `<ApplicationVersion>${versionNumber}</ApplicationVersion>`;
    //var result = data.replace('<ApplicationVersion>1</ApplicationVersion>', replacementString);
    //var replacementString = `<ApplicationDisplayVersion>${versionNumber}</ApplicationDisplayVersion>`;
    //var result = result.replace('<ApplicationDisplayVersion>1</ApplicationDisplayVersion>', replacementString);

    var versionReplacementString = `<ApplicationVersion>${versionNumber}</ApplicationVersion>`;      
      console.log(versionReplacementString);
    var displayVersionReplacementString = `<ApplicationDisplayVersion>${versionNumber}</ApplicationDisplayVersion>`;  
    console.log(displayVersionReplacementString);
    var result = data.replace('<ApplicationVersion>1</ApplicationVersion>', versionReplacementString);
    result = result.replace('<ApplicationDisplayVersion>${versionNumber}</ApplicationDisplayVersion>', displayVersionReplacementString);
      
    console.log(result);
        fs.writeFile(filePath, result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });

} catch (error) {
  core.setFailed(error.message);
}
