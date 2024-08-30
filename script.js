import { wordList } from "./wordList.js";

let selectedWords = [];
let incorrectWords = [];
let currentIndex = 0;
let correctAnswers = {};

// 随机选择10个单词
function getRandomWords() {
    const keys = Object.keys(wordList);
    while (selectedWords.length < 10) {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        if (!selectedWords.includes(randomKey)) {
            selectedWords.push(randomKey);
        }
    }
}

// 显示当前单词的中文释义和当前单词的序号
function displayWord() {
    // 跳过已经正确的单词
    while (selectedWords[currentIndex] === "✔" && currentIndex < selectedWords.length) {
        currentIndex++;
    }

    if (currentIndex < selectedWords.length) {
        const chineseMeaning = wordList[selectedWords[currentIndex]].chinese;
        correctAnswers = wordList[selectedWords[currentIndex]].forms;
        document.getElementById("chinese-meaning").textContent = chineseMeaning;

        // 更新当前单词序号显示
        document.getElementById("word-counter").textContent = `${currentIndex + 1} / ${selectedWords.length}`;
        document.getElementById("feedback").textContent = "";
    } else if (incorrectWords.length > 0) {
        selectedWords = [...incorrectWords];
        incorrectWords = [];
        currentIndex = 0;
        displayWord();
    } else {
        document.getElementById("feedback").textContent = "恭喜你，全部完成!";
        document.getElementById("feedback").style.color = "blue";
        setTimeout(() => {
            location.reload(); // 0.5秒后刷新页面
        }, 500);
    }
}

// 检查用户输入
function checkAnswer() {
    const baseFormInput = document.getElementById("base-form").value.trim().toLowerCase();
    const thirdPersonInput = document.getElementById("third-person").value.trim().toLowerCase();
    const pastTenseInput = document.getElementById("past-tense").value.trim().toLowerCase();
    const pastParticipleInput = document.getElementById("past-participle").value.trim().toLowerCase();
    const presentParticipleInput = document.getElementById("present-participle").value.trim().toLowerCase();
    const feedback = document.getElementById("feedback");

    if (
        baseFormInput === correctAnswers.baseForm &&
        thirdPersonInput === correctAnswers.thirdPerson &&
        pastTenseInput === correctAnswers.pastTense &&
        pastParticipleInput === correctAnswers.pastParticiple &&
        presentParticipleInput === correctAnswers.presentParticiple
    ) {
        selectedWords[currentIndex] = "✔"; // 将正确的单词替换为 ✔
        currentIndex++;

        document.getElementById("base-form").value = "";
        document.getElementById("third-person").value = "";
        document.getElementById("past-tense").value = "";
        document.getElementById("past-participle").value = "";
        document.getElementById("present-participle").value = "";
        displayWord();
    } else {
        feedback.innerHTML = `错误!<br>答案: ${correctAnswers.baseForm}-${correctAnswers.thirdPerson}-${correctAnswers.pastTense}-${correctAnswers.pastParticiple}-${correctAnswers.presentParticiple}`;
        feedback.style.color = "red";

        if (!incorrectWords.includes(selectedWords[currentIndex])) {
            incorrectWords.push(selectedWords[currentIndex]);
        }
    }
}

// 初始化页面
function init() {
    getRandomWords();
    displayWord();

    const inputs = ["base-form", "third-person", "past-tense", "past-participle", "present-participle"];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                checkAnswer();
            }
        });

        document.getElementById(id).addEventListener("input", function () {
            feedback.innerHTML = "";
        });
    });

    const sbt = document.getElementById("sbt");
    sbt.addEventListener("click", checkAnswer);
}

window.onload = init;
