const BEP20YAY = artifacts.require("BEP20YAY");

async function main() {
  const token = await BEP20YAY.new();
  BEP20YAY.setAsDeployed(token);

  console.log("contract deployed: ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });