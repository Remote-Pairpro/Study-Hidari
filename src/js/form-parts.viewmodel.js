var viewModel = {
    stringValue : ko.observable("こんにちわ"),
    passwordValue : ko.observable("hogehoge"),
    booleanValue : ko.observable(true),
    optionValues : ["Alpha", "Beta", "Gamma"],
    selectedOptionValue : ko.observable("Gamma"),
    multipleSelectedOptionValues : ko.observable(["Alpha"]),
    radioSelectedOptionValue : ko.observable("Beta")
};
ko.applyBindings(viewModel);