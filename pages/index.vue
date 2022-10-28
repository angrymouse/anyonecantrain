<template>
    <div class="h-full w-full flex flex-col items-center justify-center">
        <img src="~assets/brain.svg" class="w-24 mt-6" />
        <h1 class="text-3xl">Neural network that anyone can train</h1>
        <p>Censorship resistant and permanent with <a href="https://arweave.org/" class="link link-primary">Arweave</a>,
            powered by <a class="link link-primary" href="https://brain.js.org/">brain.js</a>
        </p>

        <h2 class="text-2xl mt-4 text-center w-96 flex flex-row justify-center items-center">Ask it!




        </h2>
        <div class="form-control mt-2 w-full flex flex-row justify-center">
            <div class="input-group lg:w-2/4">
                <input type="text" placeholder="E.g What's your name?" class="input input-bordered w-full"
                    v-model="askInput" />
                <button class="btn btn-square" @click.prevent="ask">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" class="w-6 inline-block ">
                        <path fill="#BE1931"
                            d="M21 27c-1.657 0-3-1.343-3-3v-4c0-1.657 1.343-3 3-3 .603-.006 6-1 6-5 0-2-2-4-5-4-2.441 0-4 2-4 3 0 1.657-1.343 3-3 3s-3-1.343-3-3c0-4.878 4.58-9 10-9 8 0 11 5.982 11 11 0 4.145-2.277 7.313-6.413 8.92-.9.351-1.79.587-2.587.747V24c0 1.657-1.343 3-3 3z" />
                        <circle fill="#BE1931" cx="21" cy="32" r="3" />
                        <circle fill="#BE1931" cx="6" cy="32" r="3" />
                        <path fill="#BE1931"
                            d="M9 24c0 1.657-1.343 3-3 3s-3-1.343-3-3V5c0-1.657 1.343-3 3-3s3 1.343 3 3v19z" />
                    </svg>
                </button>
            </div>
        </div>
        <p class="bg-neutral text-primary w-3/4 lg:w-1/4 mt-2 p-2 rounded-md" v-if="reply">{{ reply }}</p>
        <h2 class="text-2xl mt-4">Train it!</h2>
        <div class="form-control mt-2 w-full flex flex-row justify-center">
            <div class="input-group lg:w-2/4">
                <input type="text" placeholder="E.g Arweave is best storage protocol"
                    class="input input-bordered w-full" v-model="trainingInput" />
                <button class="btn btn-square" @click.prevent="train">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" class="h-6 w-6">
                        <path fill="#31373D" d="M24 14H12s-5 6-5 10 11 11 11 11 11-7 11-11-5-10-5-10z" />
                        <path fill="#292F33"
                            d="M19.64 1.28c-.901-.704-2.377-.704-3.278 0L1.639 12.776c-.901.704-.901 1.856 0 2.56l14.722 11.495c.902.704 2.377.704 3.278 0l14.722-11.495c.902-.704.902-1.856 0-2.56L19.64 1.28z" />
                        <path fill="#394146"
                            d="M19.64 1.28c-.901-.704-2.377-.704-3.278 0L1.639 12.776c-.901.704-.901 1.856 0 2.56l14.722 11.495c.901.704 2.377.704 3.278 0l14.723-11.495c.901-.704.901-1.856 0-2.56L19.64 1.28z" />
                        <path fill="#FCAB40" d="M8 25s-2 2-2 3v6s0 2 2 2 2-2 2-2v-6c0-1-2-3-2-3z" />
                        <circle fill="#FDD888" cx="8" cy="26" r="3" />
                        <path fill="#FCAB40"
                            d="M8.001 27c-.552 0-1-.447-1-1v-3.958c-.042-.634.187-2.036 1.317-2.884l9.022-7.91c.416-.365 1.048-.323 1.411.093.364.415.322 1.047-.093 1.411l-9.08 7.958C8.974 21.166 9 21.982 9 21.99L9.002 26c0 .553-.448 1-1.001 1z" />
                        <circle fill="#31373D" cx="18" cy="13" r="3" />
                    </svg>
                </button>
            </div>
        </div>
        <p class="bg-neutral text-primary w-3/4 lg:w-1/4 mt-4 p-2 rounded-md " v-if="trainingResult">
            Trained!&nbsp;Now&nbsp;he&nbsp;knows that&nbsp;"{{ trainingResult }}"
        </p>
    </div>
</template>

<script setup>
import Arweave from "arweave-js"
import ArDB from 'ardb';
import * as brain from "brain.js";
console.log(brain)
let anyoneCanTrain = new brain.recurrent.LSTM();
const arweaveState = useState("arweave", () => Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 60000,
    logging: false,
}));
let arweave = arweaveState.value
console.log(anyoneCanTrain)
const ardbState = useState("ardb", () => new ArDB(arweave.value));
let ardb = ardbState.value
let reply = ref("")
let askInput = ref("")
let trainingInput = ref("")
let trainingResult = ref(null)
ardb.search("transactions").tag("Protocol-Name", "AnyoneCanTrain").exclude("anchor").findAll().then(async transactions => {
    transactions = await Promise.all(transactions.map(async transaction => {
        return await fetch(`https://arweave.net/` + transaction.id).then(r => r.text())
    }))
    await anyoneCanTrain.train(transactions)
    console.log(anyoneCanTrain.toJSON())
})
async function ask() {
    reply.value = await anyoneCanTrain.run(askInput.value)
    console.log(reply.value)
}
async function train() {
    let transaction = await arweave.createTransaction({
        data: trainingInput.value,
    })
    transaction.addTag('Content-Type', 'text/plain');
    transaction.addTag('Protocol-Name', 'AnyoneCanTrain');
    let clone = trainingInput.value
    trainingInput.value = ""
    await window.arweaveWallet.dispatch(transaction)
    await anyoneCanTrain.train([clone]);
    trainingResult.value = clone;

}
</script>