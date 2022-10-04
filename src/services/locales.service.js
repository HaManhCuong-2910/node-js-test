function configure(app){
    const i18n = require("i18n");
    const path = require('path');
    i18n.configure({
        locales:['en', 'vi'],
        directory: path.join(__dirname, '../locales'),
        cookie: 'lang',
        defaultLocale: 'vi'
    });

    app.use(i18n.init);
}

module.exports = {configure};