var method = Account.prototype;

function Account(accountId, password, title, firstName, surname, email, mobilePhone) {
    this.accountId = accountId;
    this.password = password;
    this.title = title;
    this.firstName = firstName;
    this.surname = surname;
    this.email = email;
    this.mobilePhone = mobilePhone;
};

module.exports = Account;
