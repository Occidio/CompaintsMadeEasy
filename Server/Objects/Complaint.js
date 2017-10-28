var method = Complaint.prototype;

function Complaint(accountId, companyId, reason, details) {
    this.accountId = accountId;
    this.companyId = companyId;
    this.reason = reason;
    this.details = details;
};

module.exports = Complaint;
