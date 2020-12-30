const url = "http://localhost:8080/api";

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed');
} else {
    console.error('MetaMask is NOT installed')
}

const ethereumButton = document.querySelector('#enableEthereumButton');
const showAccount = document.querySelector('#showAccount');
const sendEthButton = document.querySelector('#sendEthButton');
let accounts = [];
let dataLoaded = false;

ethereumButton.addEventListener('click', async () => {
    await getAccount();
    checkAndEnable();
});

async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    showAccount.innerHTML = accounts[0];
}

loadData().then(res => {
    dataLoaded = true;
    checkAndEnable();
    sendEthButton.addEventListener('click', () => {
        ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: accounts[0],
                        to: res.to,
                        value: res.value
                    },
                ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error(error));
    });
});

function checkAndEnable() {
    sendEthButton.disabled = !(dataLoaded && accounts.length);
}

function paintTxData({to, value}) {
    document.getElementById("to").innerText = to;
    document.getElementById("value").innerText = value;
}

async function loadData() {
    const result = await fetch(url, {
        method: "get",
        mode: "cors"
    }).then(res => res.json());

    paintTxData(result);

    return result;
}

