var method = Account.prototype;

function Account(accountid, password, title, firstname, surname, email, mobilenumber) {
    this.accountid = accountid;
    this.password = password;
    this.title = title;
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.mobilenumber = mobilenumber;
};


module.exports = Account;
