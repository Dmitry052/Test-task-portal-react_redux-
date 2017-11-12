var dbUtills = require('./expl_dbUtills');

var query = {
    action_GET: function (action) {
        switch (action) {
            case 'myWG':
                return '';
            case 'toMe':
                return '';
            case 'doneMe':
                return '';
            case 'cancelClient':
                return '';
            default:
                return null;
        }
    },
    action_POST: function () {

    }
}