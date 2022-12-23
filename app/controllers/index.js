const messages = require("../../utils/messages");
const status = require("../../utils/http-status");

/**
 * @author   Harinder Kumar
 * @param    {String} val required
 */
function getIntegerValue(req, res) {
  try {
    let userInput = {
      val: Number(req.params.val),
    };
    if (!userInput.val) {
      res.json({
        msg: messages.toastr.VALID_NUMBER,
        status: false,
      });
    }
    let multiple5 = isMultipleWith5or7(userInput.val, 5);
    let multiple7 = isMultipleWith5or7(userInput.val, 7);
    if (multiple5 === true && multiple7 === false) {
      res.json({
        msg: messages.toastr.MULTIPLE_BY_5,
        data: "L",
        status: true,
      });
    } else if (multiple7 === true && multiple5 === false) {
      res.json({
        msg: messages.toastr.MULTIPLE_BY_7,
        data: "R",
        status: true,
      });
    } else if (multiple5 === true && multiple7 === true) {
      res.json({
        msg: messages.toastr.MULTIPLE_BY_5_7,
        data: "L R",
        status: true,
      });
    } else {
      res.json({
        msg: messages.toastr.NOT_MULTIPLE_BY_5_7,
        data: userInput.val,
        status: true,
      });
    }
  } catch (error) {
    res.json({
      msg: messages.toastr.SERVER_ERROR,
      error: error,
      status: false,
      statusCode: status.SERVER_ERROR,
    });
  }
}

function isMultipleWith5or7(n, m) {
  while (n > 0) {
    n = n - m;
  }
  if (n == 0) {
    return true;
  }
  return false;
}

module.exports = {
  getIntegerValue,
};
