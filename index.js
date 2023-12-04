// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");


//import user input functionality
const prompt = require('prompt-sync')({sigint: true});




// Ask for the Public Adress from the user   23Xc6LsBsX588Jw4oPqvbvMyg1FA1Tkf2wrfPduGsBbH
const Public = prompt("Supply your wallet address:")


// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log(`wallet Adress: ${Public}`)


// Get the wallet balance from a given private key
const getWalletBalance = async (Public) => {
    try {
        const walletBalance = await connection.getBalance(
            new PublicKey(Public)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};





const airDropSol = async (Public) => {
    try {
        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(Public),
            2 * LAMPORTS_PER_SOL
        );
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getWalletBalance(Public);
    await airDropSol(Public);
    await getWalletBalance(Public);
}

mainFunction();

