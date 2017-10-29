var method = Complaint.prototype;

function Complaint(accountId, companyId, details) {
    this.accountId = accountId;
    this.companyId = companyId;
    this.details = details;
};

module.exports = Complaint;
