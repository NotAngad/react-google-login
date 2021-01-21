const { OAuth2Client } = require("google-auth-library");
// Client ID for Google Login:
const client = new OAuth2Client("CLIENT-IDXXXXXXXXXXXXXXXXXXXX");

class Controller {
  // Endpoint to verify token of a user and get user details:
  async googleAuth(req, res) {
    // Get the token from the body of the request:
    const { token } = req.body;
    // Verify the token and then get User details from the payload if verified:
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "CLIENT-IDXXXXXXXXXXXXXXXXXXXX",
      });
      const payload = ticket.getPayload();

      /******* 
      ......
      Perform Database insertion or
      retrieval operations here ...
      ......
      *******/

      // Send the payload
      res.send({
        payload,
        isSuccess: true,
      });
    } catch (error) {
      console.log(error);
      // If error then send an empty payload:
      res.send({
        payload: {},
        isSuccess: false,
      });
    }
  }
}

module.exports = new Controller();
