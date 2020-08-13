var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

const BLACKLISTED_KEY_CODES = [ 38 ];
const COMMANDS = {
  about:
    '<span class ="infolist">Name:</span> Melissa Chan<br>' +
    '<span class ="infolist">Graduated:</span> May 2020<br>' +
    '<span class ="infolist">College: </span> Macaulay Honors College at John Jay College of Criminal Justice<br>' +
    '<span class ="infolist">Degree:</span> Bachelors of Science (B.S.) in Computer Science and Information Security<br>' +
    '<span class ="infolist">Interest:</span> Machine Learning and Artificial Intelligence in Cybersecurity<br>',

  skills:
  '<span class ="infolist">Languages:</span> Python, C++, HTML, CSS<br>' +
  '<span class ="infolist">Tools:</span> Wireshark, Git, Docker, Juypter<br>' +
  '<span class ="infolist">Operating System:</span> Windows, MacOS, Linux<br>' +
  '<span class ="infolist">Frameworks:</span> NIST Cybersecurity Framework, Agile methodology<br>' +
  '<span class ="infolist">Other skills:</span> Analytical thinking, communication, data analysis, design thinking <br>',

  awards:
  '<span class ="infolist">Macaulay Honors College:</span> Legacy Award (2020), Dean\'s List (2016-2020)<br>' +
  '<span class ="infolist">Scholarship/Fellowships:</span> Macaulay Honors Scholarship (2016-2020),' +
  ' Rewriting the Code (RTC) Fellowship (2017-2018)' +
  ' Women in Technology and Entrepreneurship of New York (WiTNY) Scholarship (2017)<br>' +
  '<span class ="infolist">Recognition:</span> 3rd Place in ISACA Cybersecurity Case Study Competition (2020)'+
  'Honors Capstone Outstanding Prize in Technology (2020)<br>'+
  '<span class ="infolist">Publication:</span> "Classifying Malicious and Benign Websites based on Application and Network Features" in John Jay\'s Finest (April 2020)',

  hobbies:
  '<span class ="infolist">1:</span> Baking and experimenting with new recipes<br>' +
  '<span class ="infolist">2:</span> Crocheting amigurumi (Tiny stuff animals or items)<br>' +
  '<span class ="infolist">3:</span> Watching re-runs of "Friends" and crime shows (E.g. "Criminal Minds" & "Law and Order: SVU")<br>',

};
let userInput, terminalOutput;

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
  console.log("Application loaded");
};

const execute = function executeCommand(input) {
  let output;
  input = input.toLowerCase();
  if (input.length === 0) {
    return;
  }
  output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
  if (!COMMANDS.hasOwnProperty(input)) {
    output += `<div class="terminal-line">no such command: ${input}</div>`;
    console.log("Oops! no such command");
  } else {
    output += COMMANDS[input];
  }

  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${output}</div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

const key = function keyEvent(e) {
  const input = userInput.innerHTML;

  if (BLACKLISTED_KEY_CODES.includes(e.keyCode)) {
    return;
  }

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
