var method = Company.prototype;

function Company(companyId, companyName) {
    this.companyId = companyId;
    this.companyName = companyName;
};

module.exports = Company;
