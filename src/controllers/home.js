const path = require('path');

const home = (req, res) => {
    res.sendFile(path.join(__dirname, '../../resources/static/assets/tmp/views/index.html'));
}

module.exports = {
    getHome: home
}