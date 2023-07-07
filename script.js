// Variables
let bobuxCount = 0;
let bobuxPerSecond = 0;

// Check if game data exists in local storage
if (localStorage.getItem("gameData")) {
    let gameData = JSON.parse(localStorage.getItem("gameData"));
    bobuxCount = gameData.bobuxCount;
    bobuxPerSecond = gameData.bobuxPerSecond;
}

// Click button event
document.getElementById("clickButton").addEventListener("click", function() {
    bobuxCount++;
    updateBobuxCount();
});

// Upgrade buttons event
let upgradeButtons = document.getElementsByClassName("upgradeButton");
for (let i = 0; i < upgradeButtons.length; i++) {
    upgradeButtons[i].addEventListener("click", function() {
        let upgradeCost = parseInt(this.parentNode.querySelector(".upgradeCost").textContent.split(":")[1]);
        if (bobuxCount >= upgradeCost) {
            bobuxCount -= upgradeCost;
            let upgradeRate = parseInt(this.parentNode.querySelector(".upgradeRate").textContent.split(":")[1]);
            bobuxPerSecond += upgradeRate;
            updateBobuxCount();
            updateBobuxPerSecond();
            updateUpgradeCost(this.parentNode, upgradeCost);
            updateUpgradeRate(this.parentNode, upgradeRate);
        }
    });
}

// Update Bobux count on the page
function updateBobuxCount() {
    document.getElementById("bobuxCount").textContent = bobuxCount + " Bobux";
}

// Update Bobux per second on the page
function updateBobuxPerSecond() {
    document.getElementById("bobuxPerSecond").textContent = bobuxPerSecond + " Bobux/s";
}

// Update upgrade cost on the page
function updateUpgradeCost(upgradeElement, upgradeCost) {
    upgradeCost = Math.round(upgradeCost * 1.5);
    upgradeElement.querySelector(".upgradeCost").textContent = "Cost: " + upgradeCost + " Bobux";
}

// Update upgrade rate on the page
function updateUpgradeRate(upgradeElement, upgradeRate) {
    upgradeRate = Math.round(upgradeRate * 1.2);
    upgradeElement.querySelector(".upgradeRate").textContent = "Generates: " + upgradeRate + " Bobux/s";
}

// Auto-generate Bobux per second
setInterval(function() {
    bobuxCount += bobuxPerSecond;
    updateBobuxCount();
}, 1000);

// Save game data to local storage when the page is unloaded
window.addEventListener("beforeunload", function() {
    let gameData = {
        bobuxCount: bobuxCount,
        bobuxPerSecond: bobuxPerSecond
    };
    localStorage.setItem("gameData", JSON.stringify(gameData));
});
