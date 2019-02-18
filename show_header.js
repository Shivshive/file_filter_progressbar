const figlet = require('figlet')

figlet.text('File Processing', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});


