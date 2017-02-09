let LOGIN_FORM_ID = 'login';
let FAVORITES_ID = 'other-series-nav';

class elementFactory {

    static checkbox(label, onclick, initial) {
        var checkbox = $(document.createElement("input"));
        checkbox.attr("type", "checkbox");
        checkbox.attr("id", `${label}-checkbox`);
        checkbox.on("change", onclick);
        if (initial) {
            checkbox.attr("checked", "checked");
        }
        var checkboxLabel = $(document.createElement("label"));
        checkboxLabel.html(label);
        checkboxLabel.append(checkbox);
        checkboxLabel.attr("for", `${label}-checkbox`);
        return checkboxLabel;
    }

    static div() {
        return "div";
    }

    static rDiv() {
        return this.div();
    }
}

var trueCheckbox = elementFactory.checkbox("test", function() {
    console.log($(this).prop("checked"));
}, true);
$("body").append(trueCheckbox);
$("body").append(elementFactory.checkbox("test2", function() {
    console.log($(this).prop("checked"));
}, false));
