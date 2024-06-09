import { Connection, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from '@solana/web3.js'
import { getKeypairFromEnvironment } from '@solana-developers/helpers'
require('dotenv').config()

//BASIC SCAFFOLDING
const suppliedToPk = process.argv[2] || null;
if (!suppliedToPk) {
    console.log('Please provide a public key to send to');
    process.exit(1)
}

const senderKeypair = getKeypairFromEnvironment('SECRET_KEY');
console.log(`suppliedtopk: ${suppliedToPk}`);
const toPubKey = new PublicKey(suppliedToPk);
const connection = new Connection(clusterApiUrl('devnet'));
console.log(`Loaded our own keypair, the destination key and connected to solana`)


// CREATE TRANSACTION
const transaction = new Transaction();
const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey: toPubKey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

console.log(`Finished! sent ${LAMPORTS_TO_SEND} to the address ${toPubKey}.`)

console.log(`Transaction signature is ${signature}!`)