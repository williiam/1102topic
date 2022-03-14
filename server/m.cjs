const maker = function(){

    var fs = require("fs");
    var str = fs.readFileSync("./package.json").toString('utf-8');

    if(str==null){
        throw new Error("package.json not found or no ");xa
    }

    const obj = JSON.parse(str)


    let dependencies = Object.keys(obj.dependencies)

    if(obj.dependencies!=null){

        var myString1 = dependencies.join(' ');

        command1 = "yarn add " + myString1;

        console.log(command1);

    }
    if(obj.devDependencies!=null){

    let devDependencies = Object.keys(obj.devDependencies)


        var myString2 = devDependencies.join(' ');

        command2 = "yarn add " + myString2 + " --dev";

        console.log(command2);

    }

}

maker();

