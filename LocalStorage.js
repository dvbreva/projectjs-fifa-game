var LocalStorage = {

    addHistoryItem(item, value) {
        var currentDate = new Date();
        var historyItem = currentDate.getFullYear() + "/" + currentDate.getMonth() + "/" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + " >> " + value;
        var newHistoryItem;
        
        if(localStorage.getItem(item) == null) {
            newHistoryItem = historyItem;
        } else {
            newHistoryItem = localStorage.getItem(item) + "," + historyItem;
        }

        localStorage.setItem(item, newHistoryItem);
    },

    printHistoryItem(item) {
       return historyItems = localStorage.getItem(item).split(",");
    },

    deleteHistoryItem(item) {
        localStorage.removeItem(item);
        location.reload();
    }
};