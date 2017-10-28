var method = Account.prototype;

function Account(accountid, password, title, firstname, surname, email, mobilenumber, homephonenumber, housenumber, street, city, county, postcode) {
    this.accountid = accountid;
    this.title = title;
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.mobilenumber = mobilenumber;
    this.homephonenumber = homephonenumber;
    this.housenumber = housenumber;
    this.street = street;
    this.city = city;
    this.county = county;
    this.postcode = postcode;
    this.password = password;
}


module.exports = Account;
