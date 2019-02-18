
const path = require('path')
const Progress = require('progress')
const chalk = require('chalk')
const fs = require('fs')

// Filter File Records...
let fileProcess = function (inputs) {

    return new Promise((resolve, reject) => {
        let user = process.env.USERPROFILE
        let public = process.env.PUBLIC

        var outputFileFolder = path.join(public, 'Documents', 'ProgressBar_Filtered')

        if (!(fs.existsSync(outputFileFolder))) {
            fs.mkdirSync(outputFileFolder)
        }

        var outputFile = path.join(outputFileFolder, 'filtered_output_' + Date.now() + '.txt');

        if (fs.existsSync(outputFile)) {
            fs.unlink(outputFile, (err) => {
                if (err) console.log(err);
            });
        }

        var filedetails = fs.statSync(inputs.filePath);
        var filesize = filedetails.size;

        var bar = new Progress(chalk.greenBright.bold('Processing') + ' ' + chalk.greenBright(': [ ') + ':bar' + chalk.greenBright(' ]') + ' ' + chalk.yellowBright.bold('[:percent] [:etas]'), {
            total: filesize,
            width: 100,
            complete: "=",
            incomplete: "."
        });

        var previousLine;
        let total_records = 0;
        let matched = 0;

        require('readline').createInterface({

            input: require('fs').createReadStream(inputs.filePath)

        }).on('line', function (line) {

            bar.tick(Buffer.byteLength(line, 'utf8'));

            total_records = total_records + 1;

            inputs.records.forEach(function (value, index, arry) {

                if (line.indexOf(value) != -1) {
                    matched = matched + 1;
                    //Append line to new file...
                    fs.appendFileSync(outputFile, line + '\r\n', 'utf8');
                }
            });

            previousLine = line;

        }).on('close', function () {

            bar.update(1);
            console.log('')
            console.log(chalk.redBright('------------------------------------------------------------------------------\r\n'))
            console.log(chalk.yellowBright('\r\nFile Filtered.')+'   '+chalk.yellowBright.bold('Total Records :'+chalk.cyanBright(total_records))+' | | '+chalk.yellowBright.bold('Matched : '+chalk.cyanBright(matched)))
            console.log(chalk.yellowBright.bold('\n\n\rOutput File Generated -- '))
            console.log(chalk.blue(outputFile))
            resolve('File Processed');
        });
    })

}

module.exports = fileProcess;