var method = Account.prototype;

function Account(accountid, password, title, firstName, surname, email, mobilePhone) {
    this.accountid = accountid;
    this.password = password;
    this.title = title;
    this.firstName = firstName;
    this.surname = surname;
    this.email = email;
    this.mobilePhone = mobilePhone;
};

module.exports = Account;
