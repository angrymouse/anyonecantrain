<template>
    <div class="h-full w-full flex flex-col items-center justify-center">
        <div v-if="notLoaded" id="loader" class="anchor">
            <div class="dna">
                <div class="particles" id="blue">
                    <div class="particle blue" id="p_b__00"></div>
                    <div class="particle blue" id="p_b__01"></div>
                    <div class="particle blue" id="p_b__02"></div>
                    <div class="particle blue" id="p_b__03"></div>
                    <div class="particle blue" id="p_b__04"></div>
                    <div class="particle blue" id="p_b__05"></div>
                    <div class="particle blue" id="p_b__06"></div>
                    <div class="particle blue" id="p_b__07"></div>
                    <div class="particle blue" id="p_b__08"></div>
                    <div class="particle blue" id="p_b__09"></div>
                </div>
                <div class="particles" id="red">
                    <div class="particle red" id="p_r__00"></div>
                    <div class="particle red" id="p_r__01"></div>
                    <div class="particle red" id="p_r__02"></div>
                    <div class="particle red" id="p_r__03"></div>
                    <div class="particle red" id="p_r__04"></div>
                    <div class="particle red" id="p_r__05"></div>
                    <div class="particle red" id="p_r__06"></div>
                    <div class="particle red" id="p_r__07"></div>
                    <div class="particle red" id="p_r__08"></div>
                    <div class="particle red" id="p_r__09"></div>
                </div>
                <div class="rods">
                    <div class="rod" id="r__00"></div>
                    <div class="rod" id="r__01"></div>
                    <div class="rod" id="r__02"></div>
                    <div class="rod" id="r__03"></div>
                    <div class="rod" id="r__04"></div>
                    <div class="rod" id="r__05"></div>
                    <div class="rod" id="r__06"></div>
                    <div class="rod" id="r__07"></div>
                    <div class="rod" id="r__08"></div>
                    <div class="rod" id="r__09"></div>
                </div>
            </div>
            <!-- Display text -->
            <div class="progress">
                <img src="~assets/brain.svg" class="w-24 mt-6" />
                <h2>
                    Welcome to anyoneCanTrain!
                </h2>
                <p id="loader__progress">
                    Please give me a couple of minutes<br />
                    to get the data from arweave and<br />
                    initialize the neural net with it..
                </p>
            </div>
        </div>
        <img src="~assets/brain.svg" class="w-24 mt-6" />
        <h1 class="text-3xl">
            Neural network that anyone can train
        </h1>
        <p>
            Censorship resistant and permanent with <a href="https://arweave.org/"
                class="link link-primary">Arweave</a>,
            powered by <a class="link link-primary" href="https://brain.js.org/">brain.js</a>
        </p>
        <h2 class="text-2xl mt-4 text-center w-96 flex flex-row justify-center items-center">
            Ask it!
        </h2>
        <div class="form-control mt-2 w-full flex flex-row justify-center">
            <div class="input-group lg:w-2/4">
                <input type="text" placeholder="E.g What's your name?" class="input input-bordered w-full"
                    v-model="question" />
                <button class="btn btn-square" @click.prevent="questionHandler">
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
        <p class="bg-neutral text-primary w-3/4 lg:w-1/4 mt-2 p-2 rounded-md" v-if="reply">
            {{ reply }}
        </p>
        <h2 class="text-2xl mt-4">
            Train it!
        </h2>
        <div class="form-control mt-2 w-full flex flex-row justify-center">
            <div class="input-group lg:w-2/4">
                <input type="text" placeholder="E.g Arweave is best storage protocol"
                    class="input input-bordered w-full" v-model="traindata" />
                <button class="btn btn-square" @click.prevent="trainHandler">
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
        <p class="bg-neutral text-primary w-3/4 lg:w-1/4 mt-4 p-2 rounded-md " v-if="results">
            Trained!&nbsp;Now&nbsp;he&nbsp;knows that&nbsp;"{{ results }}"
        </p>
    </div>
</template>

<script setup>
import Arweave from "arweave"
import ArDB from "ardb";
import * as brain from "brain.js";

const initialState = {
    reply: "",
    question: "",
    traindata: "",
    results: null
};

const arweaveState = useState("arweave", () => {
    Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
        timeout: 60_000,
        logging: false,
    });
});

const config = {
    train: {
        iterations: 600,
        data: [
            "My name is Ivan.",
            "We where fighting deflation and suddenly there came inflation out of nowhere"
        ],
    }
};

const anyoneCanTrain = new brain.recurrent.LSTM();
anyoneCanTrain.options.hiddenLayers = [5, 13];
anyoneCanTrain.trainOpts.iterations = config.train.iterations;

const arweave = arweaveState.value;
const ardbState = useState("ardb", () => new ArDB(arweave.value));

let ardb = ardbState.value;

let reply = ref(initialState.reply);
let question = ref(initialState.question);
let traindata = ref(initialState.traindata);
let results = ref(initialState.results);
let notLoaded = ref(true);

const removeLoader = () => {
    notLoaded.value = false;
};

const questionHandler = async () => {
    reply.value = await anyoneCanTrain.run(question.value);
};

const trainHandler = async () => {
    let transaction = await arweave.createTransaction({
        data: traindata.value,
    });
    transaction.addTag('Content-Type', 'text/plain');
    transaction.addTag('Protocol-Name', 'AnyoneCanTrain');
    const clone = traindata.value;
    traindata.value = initialState.traindata;
    await window.arweaveWallet.dispatch(transaction);
    await anyoneCanTrain.train([clone], config.train.iterations);
    results.value = clone;
};

const init = () => {
    ardb.search("transactions")
        .tag("Protocol-Name", "AnyoneCanTrain")
        .exclude("anchor")
        .findAll()
        .then(async transactions => {
            console.log(transactions);

            const transactiondata = await Promise.all(transactions.map(async transaction => {
                const URL = `https://arweave.net/${transaction.id}`;
                return await fetch(URL)
                    .then(r => r.text());
            }));

            console.log(transactiondata);

            await anyoneCanTrain.train([...config.train.data, ...transactiondata], config.train.iterations)

            removeLoader();
        });
};

init();
</script>
<style>
@import "~/assets/style/dna.css";
</style>