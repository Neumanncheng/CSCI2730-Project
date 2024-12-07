const hre = require("hardhat");

async function main(){
    const Market = await hre.ethers.getContractFactory("market");//Fetch byte code
    const market = await Market.deploy();//Creat an instance of smart contract

    await market.deployed();//deploying smart contract
    console.log("Deployed contract address:",`${market.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//0x14Dc05dd26d4091761DD616B3fE040fEFF00e683