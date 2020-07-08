var BudgetController = (function () {
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.perc = -1;
    };
    Expense.prototype.Calcperc = function (totalInc) {
        if (totalInc > 0) {
            this.perc = Math.round((this.value / totalInc) * 100);
        } else {
            this.perc = -1;
        }
    };
    Expense.prototype.getPerc = function () {
        return this.perc;
    };

    var CalculateSmall = function (options) {
        var sum = 0;
        everything.allItems[options].forEach(function (cur) {
            sum += cur.value;

        });
        everything.totals[options] = sum;
    };
    var everything = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        Budget: 0,
        Percentage: 0
    }
    return {
        add: function (options, descr, valu) {
            var obs, id;
            if (everything.allItems[options].length > 0) {
                id = everything.allItems[options][everything.allItems[options].length - 1].id + 1;
            } else {
                id = 0;
            }


            if (options === "inc") {
                obs = new Income(id, descr, valu);
            } else if (options === "exp") {
                var obs = new Expense(id, descr, valu);
            }

            everything.allItems[options].push(obs);
            return obs;
        },

        DeleteItem: function (type, id) {
            var ids, index;
            ids = everything.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                everything.allItems[type].splice(index, 1);
            }
        },


        CalculateAll: function () {
            CalculateSmall('exp');
            CalculateSmall('inc');

            //Calculating the budget
            everything.Budget = everything.totals.inc - everything.totals.exp;
            //Calculate the percentage
            if (everything.totals.inc > 0) {
                everything.Percentage = Math.round((everything.totals.exp / everything.totals.inc) * 100);
            }
            else {
                everything.Percentage = -1;
            }

        },

        fgh: function () {
            everything.allItems.exp.forEach(function (cur) {
                cur.Calcperc(everything.totals.inc);
            });


        },

        gsdf: function () {
            var allPerc = everything.allItems.exp.map(function (cur) {
                return cur.getPerc();
            });
            return allPerc;
        },


        getBudget: function () {
            return {
                Budget: everything.Budget,
                totalInc: everything.totals.inc,
                totalExp: everything.totals.exp,
                Percentage: everything.Percentage

            }
        },



        ass: function () {
            console.log(everything);
        }
    }
}



)();

var UiController = (function () {
    var ghm = {
        optn: '.option',
        des: '.adds',
        val: '.value',
        IncomeValue: '.all',
        ExpenseValue: '.all2',
        TotalB: '.full',
        TotalI: '.dgt',
        TotalE: '.dgt2',
        per: '.per',
        container: '.container',
        percn: '.per'
    };



    return {
        alkes: function () {
            return {
                options: document.querySelector(ghm.optn).value,
                desc: document.querySelector(ghm.des).value,
                values: parseFloat(document.querySelector(ghm.val).value)
            };
        },

        remove: function (selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        addListItem: function (obj, options) {
            var html, newHTML, element;
            if (options === 'inc') {
                element = ghm.IncomeValue;
                html = '<div class="box1" id="inc-ghj"><div class="gt"><span class="cf">rent</span><span class="judgk">fgt</span></span></div><button class="item_delete--btn">sd<i class="ion-ios-close-outline"></i></button></div>'
            }
            else if (options === 'exp') {
                element = ghm.ExpenseValue;
                html = '<div class="box2" id="exp-ghj"><div class="gt2"><span class="cf2">rent</span><span class="judgk2">fgt</span></span></div><button class="item_delete--btn">sd<i class="ion-ios-close-outline"></i></button><span class="per2">12</span></div>'
            }

            newHTML = html.replace('ghj', obj.id);
            newHTML = newHTML.replace('rent', obj.description);
            newHTML = newHTML.replace('fgt', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);





        },

        displayPerc: function (percentages) {
            var ad = document.querySelectorAll('.per2');

            var nodeListForEach = function (list, callback) {
                for (i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            }

            nodeListForEach(ad, function (current, index) {
                current.textContent = percentages[index] + '%';
            });
        },

        displayDate: function () {
            var btg = new Date();
            var year = btg.getFullYear();
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var month = btg.getMonth();
            document.querySelector('.month').textContent = ' ' + months[month] + ' ' + year;

        },


        clearInputFields: function () {
            var selectAll, convert;
            selectAll = document.querySelectorAll(ghm.des + ', ' + ghm.val);
            convert = Array.prototype.slice.call(selectAll);
            convert.forEach(function (current, index, array) {
                current.value = "";
            });

            convert[0].focus();
        },

        DisplayUI: function (obj) {
            document.querySelector(ghm.TotalB).textContent = obj.Budget;
            document.querySelector(ghm.TotalI).textContent = obj.totalInc;
            document.querySelector(ghm.TotalE).textContent = obj.totalExp;


            if (obj.Percentage > 0) {
                document.querySelector(ghm.per).textContent = obj.Percentage + '%';
            } else {
                document.querySelector(ghm.per).textContent = '---'
            }

        },


        DOMstrings: function () {
            return ghm;
        }
    };
})();

var Control = (function (dd, ded) {

    var CalcBudget = function () {
        BudgetController.CalculateAll();
        var sabk = BudgetController.getBudget();
        ded.DisplayUI(sabk);

    }
    var AddPerst = function () {
        BudgetController.fgh();
        var ddef = BudgetController.gsdf();
        console.log(ddef);
        ded.displayPerc(ddef);
    }

    var ctrlDelItem = function (event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            dd.DeleteItem(type, ID);
            ded.remove(itemID);
            CalcBudget();
            AddPerst();
        }
    }









    var grh = function () {
        var ff, newItem;
        ff = UiController.alkes();

        if (ff.desc !== "" && !isNaN(ff.values) && ff.values > 0) {
            newItem = dd.add(ff.options, ff.desc, ff.values);
            ded.addListItem(newItem, ff.options);
            ded.clearInputFields();
            CalcBudget();
            AddPerst();
        }



    }

    var EventListeners = function () {
        var DOM = ded.DOMstrings();
        document.querySelector('.ok').addEventListener('click', grh);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                grh();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDelItem);
    };
    return {
        init: function () {
            console.log('starteed');
            EventListeners();
            ded.DisplayUI({
                Budget: 0,
                totalInc: 0,
                totalExp: 0,
                Percentage: 0,

            });
            ded.displayDate();
        }
    }


})(BudgetController, UiController);

Control.init();
