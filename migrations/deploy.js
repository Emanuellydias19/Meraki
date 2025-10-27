const anchor = require("@coral-xyz/anchor");

module.exports = async function (provider) {
  anchor.setProvider(provider);
  const program = anchor.workspace.MerakiContract;
  console.log("Deploying Meraki Contract:", program.programId.toString());
};
