// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction
} = require("@solana/web3.js");

// Making a keypair and getting the private key
const newPair = Keypair.generate();
console.log("Below is what you will paste into your code:\n")
console.log(newPair.secretKey);
 
const DEMO_FROM_SECRET_KEY = new Uint8Array(
    // paste your secret key inside this empty array
    // then uncomment transferSol() at the bottom
    [
     
    ]            
);

   const getSenderBalance = async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
        try {
            const walletBalance = await connection.getBalance(
                new PublicKey(from.publicKey)
            );
            console.log(`Sender Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
        } catch (err) {
            console.log(err);
             }
   }
   getSenderBalance()



const transferSol = async() => {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
            try {
                    // Get Keypair from Secret Key
                    var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

                    // Generate another Keypair (account we'll be sending to)
                    const to = Keypair.generate();

                    // Send money from "from" wallet and into "to" wallet
                    var transaction = new Transaction().add(
                        SystemProgram.transfer({
                            fromPubkey: from.publicKey,
                            toPubkey: to.publicKey,
                            lamports: 0.5 * walletBalance
                        })
                    );

                    // Sign transaction
                    var signature = await sendAndConfirmTransaction(
                        connection,
                        transaction,
                        [from]
                    );
                    console.log('Signature is', signature);   

                    //Get users current acct balance after sending SOL 
                    const SenderBalance =  await connection.getBalance(from.publicKey);
                    console.log(`Sender Wallet balance: ${parseInt(SenderBalance) / LAMPORTS_PER_SOL} SOL`);
                } catch (err) {
                console.log(err);
                 }
}

transferSol();