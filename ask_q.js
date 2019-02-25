let c_module = require('./build/index')
let fileProcess = require('./build/process')
const fs = require('fs')
const figlet = require('figlet')
const chalk = require('chalk')

let question = [
    {
        type: 'input',
        name: 'filePath',
        message: chalk.green('Enter File Path'),
        validate: (filePath) => {
            return new Promise((resolve, reject) => {
                fs.existsSync(filePath) ? resolve(true) : resolve(false);
            })
        }
    },
    {
        type: 'input',
        name: 'fileRecord',
        message: chalk.green('Enter Records To Filter'),
        validate: () => {
            return true;
        }
    }
];

(async () => {

    console.log(chalk.yellowBright(figlet.textSync('FILE PROECESSING', {
        font: 'Fire Font-k',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })));
    console.log(chalk.redBright('------------------------------------------------------------------------------\r\n'))

    let filepath = await c_module.askQuestions(question[0]);
    let fileRecords = await c_module.askQuestions(question[1]);

    console.log('Received Path : ', filepath)
    let records = fileRecords.split(',')

    console.log('Records to Filter : ', records)

    let inputs = {
        filePath : filepath,
        records : records
    }

    console.log(chalk.redBright('------------------------------------------------------------------------------\r\n'))

    let result = await fileProcess(inputs)


    console.log('Press any key and enter to Exit')
    var stdin = process.stdin;

    // without this, we would only get streams once enter is pressed
    //stdin.setRawMode( true );

    // resume stdin in the parent process (node app won't quit all by itself
    // unless an error or process.exit() happens)
    await stdin.resume();

    // i don't want binary, do you?
    await stdin.setEncoding('utf8');

    // on any data into stdin
    await stdin.on('keypress', function (key) {

        process.exit();

        // ctrl-c ( end of text )
        if (key === '\u0003') {
            // process.exit();
        }

        // without rawmode, it returns EOL with the string
        // if (key.indexOf('1') == 0) {
        //     console.log("Bye");
        //     process.exit();
        // }


        //   write the key to stdout all normal like
        // process.stdout.write( key );
    });

})().catch(err => console.log(err));
