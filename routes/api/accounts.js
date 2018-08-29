const router = require("express").Router();
const passport = require("passport");
const Account = require("../../models/Account");
const Transaction = require("../../models/Transaction");

router.get("/test", (req, res) => res.json({ msg: success }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.find({ user: req.user._id }).then(accounts => {
      if (!accounts) {
        return res
          .status(404)
          .json({ user, error: "This user has no account" });
      }
      res.json({ user: req.user, accounts });
    });
  }
);

router.post(
  "/:accountNumber/transfer",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const accountNumber = req.params.accountNumber;

    const transaction = new Transaction({
      amount: req.body.amount,
      type: req.body.type,
      senderAccount: accountNumber,
      recipientAccount: req.body.recipientAccount,
      bankName: req.body.bankName,
      description: req.body.description
    });

    // Add remarks for transaction
    transaction.addRemark();

    // Find current account
    Account.findOne({ number: accountNumber })
      .then(account => {
        account.debitAccount(transaction.amount).then(() => {
          transaction.save();
        });
        return res.json({ success: true, transaction });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({
          success: false,
          transaction: err.message
        });
      });
  }
);

module.exports = router;
