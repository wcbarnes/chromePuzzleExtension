function hello() {
  chrome.tabs.executeScript({
    file: 'background.js'
  });
}
document.getElementById('clickme').addEventListener('click', hello);
