document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".outputArea");
    const commandInput = document.querySelector(".inputArea");
    const primaryText = document.querySelector(".primaryText");
    let activeOutput = false;
    const messageMix = "Stop messing with the mixes.";
    const messageLogin = "Strange login activity";
    const savedLogin = localStorage.getItem("loginString");
    let terminalEnabled = false;
    let authorized = false;
    let login = "";
    if (savedLogin){
        console.log("RETRIEVED LOGIN:" + savedLogin);
        authorized = true;
        login = savedLogin;
        commandInput.setAttribute("placeholder", `Insert command here (as ${login})`);
    } else{
        console.log("NO LOGIN FOUND");
        authorized = false;
        login = "";
    }

    let messages = {
        messageMix: {seen: false},
        messageLogin: {seen: false}
    }

    Object.keys(messages).forEach((message) => {
        if(localStorage.getItem(message) === "seen"){
            messages[message].seen = true;
        }
    })

    const msgMixLines = [
        "FROM: R.Simons [rsimons@sirerecords.com]",
        "TO: dbyrne@thios.com",
        "DATE: October 7, 1980",
        "SUBJECT: Stop messing with the records.",
        "‎",
        "David,",
        "‎",
        "We got your latest version of the album. The label is, for the lack of a better word, concerned.",
        "What happened to the chorus? What is going on with the verses? What happened to normal song structures??",
        "‎",
        "We need something radio-friendly, not this, man. I get that you and Brian want to 'experiment' a bit, but we can't sell a record that sounds like you didn't know what you were doing.",
        "Please, just stop re-inventing the wheel already.",
        "‎",
        "- R. Simons, Sire Records."
    ]

    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const formattedDate = now.toLocaleDateString('en-US', options);

    const msgLoginLines = [
        "FROM: sysadmin [sysadmin@172.64.147.203]",
        "TO: dbyrne@thios.com",
        `DATE: ${formattedDate}`, //TODO: implement dynamic date handling.
        "SUBJECT: Strange login activity.",
        "‎",
        "David,",
        "‎",
        "Seeing some weird activity in the system right now. Someone named 'alexB' just logged in?",
        "Says here they have approved access, but how? The system has been dead for ages.",
        "There's no way someone could even apply for the beta test, we've shut down the website.",
        "‎",
        "I ran a quick trace, but everything that came out was a ping from our local servers.",
        "Tried deleting their credentials as well, but the system just won't let me.",
        "Please visit the office of THL so I could tell you more about this, or to get any information, really.",
        "‎",
        "- Harold A. Armenta, junior system administrator."
    ]

    const unseenMessageKeys = Object.keys(messages).filter(key => messages[key].seen === false);
    console.log(unseenMessageKeys);

    commandInput.classList.add("terminalInput");
    commandInput.focus();

    let files = {
        "girlfriend_is_better.ths": { corrupted: false },
        "this_must_be_the_place.ths": { corrupted: true }, //Set the files as corrupted and not
        "once_in_a_lifetime.ths": { corrupted: false },
        "seen_and_not_seen.ths": { corrupted: false },
        "born_under_punches.ths": { corrupted: true }
    };

    //Check if the files have already been fixed. If yes, then no need to fix them again
    Object.keys(files).forEach((file) => {
        if (localStorage.getItem(file) === "fixed") {
            files[file].corrupted = false;
        }
    });

    function scrollToBottom() {
        outputArea.scrollTop = outputArea.scrollHeight;
    }



    async function establishBridgeLines(){
        activeOutput = true;
        const lines = [
            "0999999912x2 pci_root PNP0A03 host bridge window [nem 0x000a0000-0x000bf]",
            "0381772312x4 pci_root PNP0A03 host bridge window [nem 0x000a0000-0x000cf]",
            "0817634729x2 pci_root PNP0A03 host bridge window [nem 0x000a0000-0x000lv]"
        ]

        for(let line of lines){
            typeLineSystem(line);
            await delay (1000);
        }

        boldName();
        activeOutput = false;
    }

    async function boldName() {
        const logoLines = [
            "████████╗██╗░░██╗██╗░█████╗░░██████╗",
            "╚══██╔══╝██║░░██║██║██╔══██╗██╔════╝",
            "░░░██║░░░███████║██║██║░░██║╚█████╗░",
            "░░░██║░░░██╔══██║██║██║░░██║░╚═══██╗",
            "░░░██║░░░██║░░██║██║╚█████╔╝██████╔╝",
            "░░░╚═╝░░░╚═╝░░╚═╝╚═╝░╚════╝░╚═════╝░"
        ]
        activeOutput = true;
        for (let line of logoLines){
            typeLogo(line);
            await delay(500)
        }
        activeOutput = false;
        if(authorized === false){
            logIn();
        } else{
            if (savedLogin === "alexB"){
                bootSequence();
            }
            else{
                bootSequenceDB();
            }
        }
        
    }

    async function logIn(){
        activeOutput = true;
        const greetingLine = "[SYS]: Please, enter your username to log in.";
        typeLineSystem(greetingLine);
        activeOutput = false;
        enableTerminal();
    }

    async function bootSequenceDB() {
        const bootLines = [
            "Welcome to THIOS v0.983",
            "(C) 1983-1991 Talking Heads Labs. All rights reserved.",
            "",
            "Booting up secondary requirements...",
            "[SYS]: Getting administrator permissions for: dbyrne",
            "[SYS]: Administrator permissions granted: dbyrne",
            `[SYS]: ${Object.keys(files).length} audio files detected.`,
            "[SYS]: Scanning audio files..."
        ];

        const bootWarning = `[SYS]: WARNING! ${countCorruptedFiles()} audio files corrupted.`;

        const bootLines2 = [
            "[SYS]: Uptime: 0:00:02",
            "[SYS]: Use `help` for available commands.",
        ]

        const messageNotificationLines = [
            `[MSG]: ATTENTION! Currently you have ${countMessages()} messages in your inbox`,
            "[MSG]: Type `inbox` to see your inbox."
        ]

        activeOutput = true;
        for (let line of bootLines) {
            typeLineSystem(line);
            await delay(getRandomDelay(700, 2000));
        }
        if (countCorruptedFiles() > 0){
            typeLineSystem(bootWarning);
        } else if (countCorruptedFiles() === 0){
            typeLineSystem("[SYS]: File integrity check: 0 issues found.");
        }
        for(let line of bootLines2){
            typeLineSystem(line);
            await delay(getRandomDelay(700, 2000));
        }
        if(countMessages !== 0){
            for(let line of messageNotificationLines){
                typeLineSystem(line);
                await delay(getRandomDelay(700, 2000));
            }
        }
        activeOutput = false;
        enableTerminal();
    }

    async function bootSequence() {
        const bootLines = [
            "Welcome to THIOS v0.983",
            "(C) 1983-1991 Talking Heads Labs. All rights reserved.",
            "",
            "Booting up secondary requirements...",
            "[SYS]: Getting user permissions for: alexB",
            "[SYS]: User permissions granted: alexB",
            `[SYS]: ${Object.keys(files).length} audio files detected.`,
            "[SYS]: Scanning audio files..."
        ];

        const bootWarning = `[SYS]: WARNING! ${countCorruptedFiles()} audio files corrupted.`;

        const bootLines2 = [
            "[SYS]: Uptime: 0:00:04",
            "[SYS]: Use `help` for available commands."
        ]
        activeOutput = true;
        for (let line of bootLines) {
            typeLineSystem(line);
            await delay(getRandomDelay(700, 2000));
        }
        if (countCorruptedFiles() > 0){
            typeLineSystem(bootWarning);
        } else if (countCorruptedFiles() === 0){
            typeLineSystem("[SYS]: File integrity check: 0 issues found.");
        }
        for(let line of bootLines2){
            typeLineSystem(line);
            await delay(getRandomDelay(700, 2000));
        }
        
        activeOutput = false;

        enableTerminal();
    }

    function delay(time){
        return new Promise(resolve => setTimeout(resolve, time));
    }

    // Counts the number of corrupted files
    function countCorruptedFiles() {
        return Object.values(files).filter(file => file.corrupted).length;
    }

    function countMessages(){
        return Object.values(messages).filter(message => message.seen === false).length;
    }

    // Prints a line with a typing effect FOR LYRICS
    function typeLineLyric(text) {
        return new Promise((resolve) => {
            let lineElement = document.createElement("p");
            terminal.appendChild(lineElement);
            let i = 0;

            function typeCharacter() {
                activeOutput = true;
                if (i < text.length) {
                    lineElement.innerHTML += text[i++];
                    setTimeout(typeCharacter, 62); // Typing speed
                } else {
                    resolve();
                    activeOutput = false;
                }
            }
            typeCharacter();
            terminal.scrollIntoView({behavior: 'smooth', block: 'end'});
        });
    }

    //Prints a line FOR SYSTEM MESSAGES. They appear one line at a time.
    function typeLineSystem(text){
        let lineElement = document.createElement("p");
        terminal.appendChild(lineElement);
        lineElement.innerHTML += text;
        terminal.scrollIntoView({behavior: 'smooth', block: 'end'});
    }
    
    //Prints the LOGO. Specialized function to correct the margin of the <p> elements via .logo class
    function typeLogo(text){
        let lineElement = document.createElement("p");
        lineElement.className = "logo";
        terminal.appendChild(lineElement);
        lineElement.innerHTML += text;
    }

    // Enables terminal input
    function enableTerminal() {
        if(terminalEnabled === false){
            commandInput.addEventListener("keydown", function enterKey(event) {
            if (event.key === "Enter") {
                if(activeOutput){
                    event.preventDefault();
                    return;
                }
                else{
                    event.preventDefault();
                    if(authorized === true){
                        processCommand(commandInput.value.trim());
                        commandInput.value = "";
                    }
                    else {
                        processLoginCommand(commandInput.value.trim());
                        commandInput.value = "";
                    }
                }
            }
        });
        terminalEnabled = true;
        console.log("Terminal enabled: " + terminalEnabled);
        }else{
            console.log("Attempt at enabling the terminal unsuccessful, caused by: terminal already enabled.")
        }

    }
    

    function processLoginCommand(input){
        commandInput.value = "";
        const args = input.split(" ");
        const command = args[0];
        login = args.slice(1).join(" ");

        if(command === "login"){
            if(login === "alexB"){
                authorized = true;
                localStorage.setItem("loginString", "alexB");
                commandInput.setAttribute("placeholder", "Insert command here (as alexB)");
                login = "alexB";
                bootSequence();
            }
            else if (login === "dbyrne"){
                authorized = true;
                localStorage.setItem("loginString", "dbyrne");
                commandInput.setAttribute("placeholder", "Insert command here (as dbyrne)");
                login = "dbyrne";
                bootSequenceDB();
            }
            else{
                typeLineSystem("Sorry, you are not authorized to perform this action (ERROR 0099B)");
            }
        } else {
            typeLineSystem("Sorry, you are not authorized to perform this action (ERROR 0099A)");
        }
    }

    // Processes user commands
    function processCommand(input) {
        const args = input.split(" ");
        const command = args[0];
        const filename = args.slice(1).join(" ");
        
        if(login === "alexB"){
            authorized = true;
            typeLineSystem("alexB@THIOS> " + commandInput.value);
        } else if (login === "dbyrne"){
            authorized = true;
            typeLineSystem("dbyrne@THIOS> " + commandInput.value);   
        }

        commandInput.value = "";

        if (command === "help") {
            stop
            displayHelp();
        } else if (command === "file") {
            displayFiles();
        } else if (command === "choose") {
            activeOutput = true;
            chooseFile(filename);
            activeOutput = false;
        } else if (command === "scan") {
            scanFile(filename);
        } else if (command === "fix") {
            fixFile(filename);
        } else if (command === "login"){
            typeLineSystem("[SYS]: You are already logged in. Use `logout` to log out and log in again. If the issue persists, please contact our customer support team or try again later.")
        } else if (command === "logout"){
            logOut();
        } else if (command === "inbox"){
            if (login === "alexB"){
                typeLineSystem("[SYS]: Sorry, you are not authorized to use the inbox functionality. If you believe you are, please contact our customer support team or try again later.")
            } else if (login === "dbyrne"){
                if(unseenMessageKeys.length > 0){
                    showInbox();
                } else {
                    typeLineSystem("[SYS]: Your inbox is empty.")
                }
                
            }
        } else if (command === "msg_view"){
            if(login === "alexB"){
                typeLineSystem("[SYS]: Sorry, you are not authorized to use the inbox functionality. If you believe you are, please contact our customer support team or try again later.")
            } else if (login === "dbyrne"){
                viewMessage(filename);
            }
        } else if (command === "respond"){
            activeOutput = true;
            if(login === "alexB"){
                typeLineSystem("[SYS]: Sorry, you are not authorized to use the inbox functionality. If you believe you are, please contact our customer support team or try again later.")
            } else if (login === "dbyrne"){
                typeLineSystem("[SYS]: Sorry, there was an error processing your request. Caused by: 500 INTERNAL_SERVER_ERROR. If the issue persists, please contact our customer support or try again later.")
            }
            activeOutput = false;
        }
         else {
            activeOutput = true;
            typeLineSystem(`[SYS]: Unknown command. Type 'help' for available commands.`);
            activeOutput = false;
        }
        scrollToBottom();
    }

    async function showInbox(){
        activeOutput = true;
        for(let i = 0; i < unseenMessageKeys.length; i++){
            if(unseenMessageKeys[i] === "messageMix"){
                typeLineSystem(`INDEX: [${i}]`);
                for(let i = 0; i < 4; i++){
                    typeLineSystem(msgMixLines[i]);
                    await delay(500);
                }
                typeLineSystem("---------");
            } else if(unseenMessageKeys[i] === "messageLogin"){
                typeLineSystem(`INDEX: [${i}]`);
                for(let i = 0; i < 4; i++){
                    typeLineSystem(msgLoginLines[i]);
                    await delay(500);
                }
                typeLineSystem("---------");
            }

        }

        typeLineSystem("[SYS]: To see a specific message, use `msg_view [INDEX]` without the square brackets.");
        activeOutput = false;
    }

    async function viewMessage(id){
        activeOutput = true;
        if(!id){
            typeLineSystem("[SYS]: Error using `msg_view`, this command requires an index.")
        }
        if(unseenMessageKeys[id] === "messageMix"){
            typeLineSystem("---------");
            for(let i = 0; i < msgMixLines.length; i++){
                typeLineSystem(msgMixLines[i]);
                await delay(700);
            }

            typeLineSystem("---------");
        }
        else if(unseenMessageKeys[id] === "messageLogin"){
            typeLineSystem("---------");
            for(let i = 0; i < msgLoginLines.length; i++){
                typeLineSystem(msgLoginLines[i]);
                await delay(700);
            }
            typeLineSystem("---------");
        }
        typeLineSystem("[SYS]: To respond to this message, use `respond [CONTENT]`.")
        activeOutput = false;
    }

    function logOut(){
        activeOutput = true;
        authorized = false;
        login = "";
        localStorage.removeItem("loginString");
        commandInput.setAttribute("placeholder", "Insert command here")
        typeLineSystem("You have been successfully logged out. Please use `login [USERNAME]` to log back in.")
        activeOutput = false;
    }

    async function displayHelp() {
        const helpLines = [
            "[SYS]: Getting the list of available commands.",
            "    file                 GET LIST OF AVAILABLE FILES",
            "    choose [FILENAME]    INTERACT WITH SELECTED FILE",
            "    scan [FILENAME]      ANALYZE SELECTED FILE FOR POTENTIAL ERRORS",
            "    fix [FILENAME]       ATTEMPT TO FIX DEFECTIVE FILE",
            "    help                 GET LIST OF AVAILABLE COMMANDS",
            "    inbox                GET LIST OF NEW MESSAGES",
            "    msg_view [NUMBER]    VIEW THE FULL MESSAGE",
            "    respond [CONTENT]    RESPOND TO THE CURRENT MESSAGE",
            "    logout               LOG OUT OF THE SYSTEM"
        ];
        activeOutput = true;
        for (let line of helpLines) {
            typeLineSystem(line);
            await delay(700);
        }
        activeOutput = false;
    }

    // Lists files and their status
    async function displayFiles() {
        activeOutput = true;
        let lines = ["[SYS]: Listing available files..."];
        Object.keys(files).forEach(file => {
            let status = files[file].corrupted ? "[WARNING!]: File could not be parsed correctly." : "";
            lines.push(`    ${file} ${status}`);
        });
        lines.push("Try `scan` on defective files to reveal potential errors and solutions.");
        for (let line of lines) {
            typeLineSystem(line);
            await delay(700);
        }
        activeOutput = false;
    }

    // Handles file selection
    async function chooseFile(filename) {
        activeOutput = true;
        if (!filename) {
            activeOutput = false;
            return typeLineSystem("[SYS]: Error using `choose`, this command requires a filename.");
        }
        if (!files[filename]) {
            activeOutput = false;
            return typeLineSystem(`[SYS]: Error! ${filename} not found.`);
        }
        if (files[filename].corrupted) {
            activeOutput = true;
            return typeLineSystem(`[SYS]: Command could not be performed, caused by: file corrupted.`);
        }if(filename === "girlfriend_is_better.ths"){
            commandInput.disabled = true;
            typeLineSystem(`[SYS]: Loading ${filename}...`);
            const lyrics = [
                {time: 4.0, text: "I!"},
                {time: 6.1, text: "Who took the money?"},
                {time: 8.3, text: "Who took the money away?"},
                {time: 11.9, text: "I, I, I, I,"},
                {time: 14.6, text: "it's always showtime,"},
                {time: 16.7, text: "Here at the edge of the stage"},
                {time: 20.0, text: "And I, I, I, wake up and wonder"},
                {time: 24.0, text: "What was the place, what was the name?"},
                {time: 29.0, text: "We wanna wait, but here we go again"},
                {time: 36.0, text: "I,"},
                {time: 38.5, text: "Takes over slowly,"},
                {time: 40.5, text: "But doesn't last very long"},
                {time: 44.5, text: "I, I, I, I,"},
                {time: 47.0, text: "No need to worry"},
                {time: 48.8, text: "Everything's under control"},
                {time: 52.8, text: "O-U-T,"},
                {time: 55.0, text: "But no hard feelings"},
                {time: 57.0, text: "What do you know? Take you away"},
                {time: 61.0, text: "We're being taken for a ride again"},
                {time: 69.0, text: "I got a girlfriend that's better than that"},
                {time: 73.0, text: "She has the smoke in her eyes"},
                {time: 77.0, text: "She's coming up, going right through my heart"},
                {time: 81.0, text: "She's gonna give me surprise"},
                {time: 85.0, text: "I think it's right, better than this"},
                {time: 89.5, text: "I think you can if you like"},
                {time: 93.5, text: "I got a girlfriend with bows in her hair"},
                {time: 97.0, text: "And nothing is better than that! Is it?"},
                {time: 101.0, text: "Down, down in the basement"},
                {time: 105.7, text: "We hear the sound of machines"},
                {time: 109.0, text: "I, I, I'm "},
                {time: 111.9, text: "Driving in circles"},
                {time: 113.7, text: "Come to my senses sometimes"},
                {time: 117.8, text: "Why, why, why, why start it over?"},
                {time: 121.5, text: "Nothing was lost, everything's free"},
                {time: 126.0, text: "I don't care how impossible it seems"},
                {time: 134.0, text: "Somebody calls you but you cannot hear"},
                {time: 137.7, text: "Get closer to be far away"},
                {time: 141.5, text: "And only one look and that's all that it takes"},
                {time: 145.8, text: "Maybe that's all that we need"},
                {time: 150.0, text: "All that it takes, I'll bet it's right"},
                {time: 154.0, text: "All it takes, if it's right"},
                {time: 158.0, text: "I got a girlfriend that's better than that"},
                {time: 161.8, text: "And she goes wherever she likes (there she goes)"},
                {time: 198.0, text: "I got a girlfriend that's better than that"},
                {time: 202.0, text: "Now everyone's getting involved"},
                {time: 206.8, text: "She's moving up, going right through my heart"},
                {time: 211.0, text: "We might not ever get caught"},
                {time: 214.7, text: "Going right through, try to stay cool"},
                {time: 218.5, text: "Going through, staying cool"},
                {time: 222.9, text: "I got a girlfriend, she's better than that"},
                {time: 226.7, text: "And nothing is better than you (wait a minute)"},
                {time: 231.0, text: "I got a girlfriend that's better than this"},
                {time: 234.0, text: "But you don't remember at all"},
                {time: 239.0, text: "As we get older and stop making sense"},
                {time: 243.0, text: "You won't find her waiting long"},
                {time: 247.0, text: "Stop making sense, stop making sense"},
                {time: 251.0, text: "Stop making sense, making sense"},
                {time: 256.0, text: "I got a girlfriend, she's better than that"},
                {time: 259.0, text: "And nothing is better than this (is it?)"}
        ]

            const audio = new Audio("GIB.mp3");
            audio.play().then( async () => {
                let lastLyricIndex = 0;
                function checkLyrics(){
                    const currentTime = audio.currentTime;
                    for(let i = lastLyricIndex; i < lyrics.length; i++){
                        if(currentTime >= lyrics[i].time){
                            typeLineLyric(lyrics[i].text);
                            lastLyricIndex = i + 1;
                        }
                    }
                    if(!audio.ended){
                        requestAnimationFrame(checkLyrics);
                    } else {
                        typeLineSystem("[SYS]: girlfriend_is_better.ths - Audio playback completed.")
                commandInput.disabled = false;
                    }
                }
                requestAnimationFrame(checkLyrics);
            }).catch(error => console.error("Playback error", error));

        }  if(filename === "born_under_punches.ths"){
            commandInput.disabled = true;
            typeLineSystem(`[SYS]: Loading ${filename}...`);
            const lyrics = [
                {time: 27.0, text: "Take a look at these hands"},
                {time: 32.0, text: "Take a look at these hands!"},
                {time: 35.8, text: "The hand speaks"},
                {time: 39.0, text: "The hand of a government man"},
                {time: 43.8, text: "Well, I'm a tumbler"},
                {time: 47.5, text: "Born under punches"},
                {time: 51.2, text: "I'm so thin"},
                {time: 52.8, text: "All I want"},
                {time: 56.0, text: "Is to breathe"},
                {time: 59.8, text: "(I'm too thin)"},
                {time: 61.0, text: "Won't you breathe"},
                {time: 64.7, text: "With me?"},
                {time: 69.7, text: "Find a little space"},
                {time: 73.5, text: "So we move in-between"},
                {time: 78.0, text: "And keep one step ahead"},
                {time: 81.0, text: "Of yourself"},
                {time: 86.8, text: "Don't you miss it? Don't you miss it?"},
                {time: 89.3, text: "Some 'a you people just about missed it!"},
                {time: 95.0, text: "Last time to make plans"},
                {time: 99.0, text: "Well, I'm a tumbler"},
                {time: 102.5, text: "I'm a government man"},
                {time: 104.0, text: "Never seen anything like that before"},
                {time: 112.5, text: "Falling bodies tumble 'cross the floor"},
                {time: 117.8, text: "(Well, I'm a tumbler!)"},
                {time: 121.0, text: "When you get to where you wanna be"},
                {time: 126.0, text: "(U-uh, thank you, thank you!)"},
                {time: 129.8, text: "When you get to where you wanna be"},
                {time: 134.0, text: "(U-uh, don't even mention it!)"},
                {time: 138.0, text: "Wooah, take a look at these hands, they're passing in-between us"},
                {time: 142.8, text: "Take a look at these hands!"},
                {time: 146.5, text: "Take a look at these hands! You don't have to mention it"},
                {time: 150.5, text: "No thanks"},
                {time: 153.5, text: "I'm a government man"},
                {time: 196.8, text: "And the heat goes on, and the heat goes on"},
                {time: 201.0, text: "And the heat goes on, and the heat goes on"},
                {time: 205.5, text: "And the heat goes on, where the hand has been"},
                {time: 210.0, text: "And the heat goes on, and the heat goes on"},
                {time: 214.0, text: "And the heat goes on (Got time?), and the heat goes on"},
                {time: 218.0, text: "And the heat goes on, and the heat goes on"},
                {time: 222.5, text: "And the heat goes on, where the hand has been"},
                {time: 227.0, text: "And the heat goes on, and the heat goes on"},
                {time: 231.0, text: "And the heat goes on (I'm not a drowning man), and the heat goes on"},
                {time: 235.0, text: "And the heat goes on (And I'm not a burning building), and the heat goes on (I'm a tumbler)"},
                {time: 239.0, text: "And the heat goes on (Drowning cannot hurt a man), where the hand has been"},
                {time: 244.0, text: "And the heat goes on (Fire cannot hurt a man), and the heat goes on (Not the government man)"},
                {time: 248.0, text: "And the heat goes on (All), and the heat goes on"},
                {time: 252.0, text: "And the heat goes on (I want is to breathe), and the heat goes on (Thank you, thank you)"},
                {time: 257.0, text: "And the heat goes on, and the heat goes on (Won't you breathe)"},
                {time: 261.0, text: "And the heat goes on, and the heat goes on (With me?)"},
                {time: 265.0, text: "And the heat goes on, and the heat goes on (Find a little space)"},
                {time: 269.0, text: "And the heat goes on, and the heat goes on (So we move in-between) (I'm so thin)"},
                {time: 273.5, text: "And the heat goes on, and the heat goes on (And keep one step ahead)"},
                {time: 278.0, text: "And the heat goes on, and the heat goes on (Of yourself) (I'm catching up with myself!)"},
                {time: 282.0, text: "And the heat goes on, and the heat goes on (All I want)"},
                {time: 286.0, text: "And the heat goes on, and the heat goes on (Is to breathe)"},
                {time: 291.0, text: "And the heat goes on, and the heat goes on (Won't you breathe)"},
                {time: 295.0, text: "And the heat goes on, and the heat goes on (With me?) (Hands of a government man)"},
                {time: 299.0, text: "And the heat goes on, and the heat goes on (Find a little space)"},
                {time: 303.0, text: "And the heat goes on, and the heat goes on (So we move in-between)"},
                {time: 307.5, text: "And the heat goes on, and the heat goes on (And keep one step ahead)"},
                {time: 312.0, text: "And the heat goes on, and the heat goes on (Of yourself) (Don't you miss it, don't you miss it)"},
                {time: 316.0, text: "And the heat goes on, and the heat goes on (All I want)"},
                {time: 320.0, text: "And the heat goes on, and the heat goes on (Is to breathe)"},
                {time: 324.0, text: "And the heat goes on, and the heat goes on (Won't you breathe)"},
                {time: 328.0, text: "And the heat goes on, and the heat goes on (With me?)"},
                {time: 333.0, text: "And the heat goes on, and the heat goes on (Find a little space)"},
                {time: 337.0, text: "And the heat goes on, and the heat goes on (So we move in-between)"},
                {time: 341.0, text: "And the heat goes on, and the heat goes on (And keep one step ahead)"},
                {time: 345.0, text: "And the heat goes on (Of yourself)"}
            ];

            const audio = new Audio("BUP.mp3");
            audio.play().then( async () => {
                let lastLyricIndex = 0;
                function checkLyrics(){
                    const currentTime = audio.currentTime;
                    for(let i = lastLyricIndex; i < lyrics.length; i++){
                        if(currentTime >= lyrics[i].time){
                            typeLineLyric(lyrics[i].text);
                            lastLyricIndex = i + 1;
                        }
                    }
                    if(!audio.ended){
                        requestAnimationFrame(checkLyrics);
                    } else {
                        typeLineSystem("[SYS]: born_under_punches.ths - Audio playback completed.")
                commandInput.disabled = false;
                    }
                }
                requestAnimationFrame(checkLyrics);
            }).catch(error => console.error("Playback error", error));

        }if(filename === "seen_and_not_seen.ths"){
            commandInput.disabled = true;
            typeLineSystem(`[SYS]: Loading ${filename}...`);
            // Simulate lyrics appearing slowly
            const lyrics = [
                {time: 19.7, text: "He would see faces in movies, on TV, in magazines, and in books"},
                {time: 27.5, text: "He thought that some of these faces might be right for him"},
                {time: 31.5, text: "And that through the years, by keeping an ideal facial structure fixed in his mind"},
                {time: 37.8, text: "Or somewhere in the back of his mind"},
                {time: 40.5, text: "That he might, by force of will, cause his face to approach those of his ideal"},
                {time: 49.7, text: "The change would be very subtle"},
                {time: 54.3, text: "It might take ten years or so"},
                {time: 59.7, text: "Gradually his face would change its shape"},
                {time: 63.0, text: "A more hooked nose"},
                {time: 65.8, text: "Wider, thinner lips"},
                {time: 69.7, text: "Beady eyes"},
                {time: 73.8, text: "A larger forehead"},
                {time: 88.5, text: "He imagined that this was an ability he shared with most other people"},
                {time: 93.8, text: "They had also molded their faces according to some ideal"},
                {time: 98.5, text: "Maybe they imagined that their new face"},
                {time: 101.0, text: "Would better suit their personality"},
                {time: 103.5, text: "Or maybe they imagined that their personality"},
                {time: 108.0, text: "Would be forced to change to fit the new appearance"},
                {time: 118.0, text: "This is why first impressions are often correct"},
                {time: 127.7, text: "Although some people might have made mistakes"},
                {time: 132.7, text: "They may have arrived at an appearance"},
                {time: 135.5, text: "That bears no relationship to them"},
                {time: 138.5, text: "They may have picked an ideal appearance"},
                {time: 141.3, text: "Based on some childish whim, or momentary impulse"},
                {time: 147.9, text: "Some may have gotten halfway there"},
                {time: 152.2, text: "And then changed their minds"},
                {time: 166.8, text: "He wonders if he too"},
                {time: 168.9, text: "Might have made a similar mistake"}
            ];

            const audio = new Audio("SANS.mp3");
            audio.play().then( async () => {
                let lastLyricIndex = 0;
                function checkLyrics(){
                    const currentTime = audio.currentTime;
                    for(let i = lastLyricIndex; i < lyrics.length; i++){
                        if(currentTime >= lyrics[i].time){
                            typeLineLyric(lyrics[i].text);
                            lastLyricIndex = i + 1;
                        }
                    }
                    if(!audio.ended){
                        requestAnimationFrame(checkLyrics);
                    } else {
                        typeLineSystem("[SYS]: seen_and_not_seen.ths - Audio playback completed.")
                commandInput.disabled = false;
                    }
                }
                requestAnimationFrame(checkLyrics);
            }).catch(error => console.error("Playback error", error));

        } if(filename === "once_in_a_lifetime.ths"){
            commandInput.disabled = true;
            typeLineSystem(`[SYS]: Loading ${filename}...`);
            // Simulate lyrics appearing slowly
            const lyrics = [
                {time: 17.0, text: "You may find yourself"},
                {time: 19.3, text: "Living in a shotgun shack"},
                {time: 21.7, text: "And you may find yourself"},
                {time: 23.8, text: "In another part of the world"},
                {time: 25.8, text: "And you may find yourself"},
                {time: 27.8, text: "Behind the wheel of a large automobile"},
                {time: 31.0, text: "And you may find yourself in a beautiful house"},
                {time: 35.0, text: "With a beautiful wife"},
                {time: 37.0, text: "And you may ask yourself"},
                {time: 38.5, text: "'Well ... how did I get here?'"},
                {time: 41.3, text: "Letting the days go by!"},
                {time: 43.5, text: "Let the water hold me down"},
                {time: 45.5, text: "Letting the days go by!"},
                {time: 47.5, text: "Water flowing underground"},
                {time: 49.5, text: "Into the blue again"},
                {time: 51.3, text: "After the money's gone"},
                {time: 53.8, text: "Once in a lifetime!"},
                {time: 56.0, text: "Water flowing underground"},
                {time: 57.8, text: "And you may ask yourself"},
                {time: 59.7, text: "'How do I work this?'"},
                {time: 61.8, text: "And you may ask yourself"},
                {time: 64.0, text: "'Where is that large automobile?'"},
                {time: 66.0, text: "And you may tell yourself"},
                {time: 68.0, text: "'This is not my beautiful house!'"},
                {time: 70.3, text: "And you may tell yourself"},
                {time: 72.0, text: "'This is not my beautiful wife!'"},
                {time: 74.0, text: "Letting the days go by!"},
                {time: 76.0, text: "Let the water hold me down"},
                {time: 78.0, text: "Letting the days go by!"},
                {time: 80.0, text: "Water flowing underground"},
                {time: 82.0, text: "Into the blue again"},
                {time: 84.0, text: "After the money's gone"},
                {time: 86.0, text: "Once in a lifetime!"},
                {time: 88.0, text: "Water flowing underground"},
                {time: 91.0, text: "Same as it ever was"},
                {time: 93.0, text: "Same as it ever was"},
                {time: 95.0, text: "Same as it ever was"},
                {time: 97.0, text: "Same as it ever was"},
                {time: 99.0, text: "Same as it ever was"},
                {time: 101.0, text: "Same as it ever was"},
                {time: 103.0, text: "Same as it ever was"},
                {time: 105.0, text: "Same as it ever was"},
                {time: 107.0, text: "Water dissolving, and water removing!"},
                {time: 110.5, text: "There is water at the bottom of the ocean"},
                {time: 113.8, text: "Under the water, carry the water"},
                {time: 116.0, text: "Remove the water at the bottom of the ocean"},
                {time: 119.5, text: "Water dissolving, and water removing!"},
                {time: 123.0, text: "Letting the days go by!"},
                {time: 125.0, text: "Let the water hold me down"},
                {time: 127.0, text: "Letting the days go by!"},
                {time: 129.0, text: "Water flowing underground"},
                {time: 131.0, text: "Into the blue again"},
                {time: 133.3, text: "Into the silent water"},
                {time: 135.0, text: "Under the rocks and stones"},
                {time: 137.0, text: "There is water underground"},
                {time: 139.5, text: "Letting the days go by!"},
                {time: 141.5, text: "Let the water hold me down"},
                {time: 143.5, text: "Letting the days go by!"},
                {time: 145.5, text: "Water flowing underground"},
                {time: 147.5, text: "Into the blue again"},
                {time: 149.5, text: "After the money's gone"},
                {time: 151.8, text: "Once in a lifetime!"},
                {time: 153.8, text: "Water flowing underground"},
                {time: 155.8, text: "You may ask yourself"},
                {time: 157.8, text: "'What is that beautiful house?'"},
                {time: 160.0, text: "You may ask yourself"},
                {time: 162.0, text: "'Where does that highway go to?'"},
                {time: 164.0, text: "And you may ask yourself"},
                {time: 166.0, text: "'Am I right? Am I wrong?'"},
                {time: 168.0, text: "And you may say to yourself"},
                {time: 169.5, text: "'My God! What have I done?!'"},
                {time: 172.0, text: "Letting the days go by!"},
                {time: 174.0, text: "Let the water hold me down"},
                {time: 176.5, text: "Letting the days go by"},
                {time: 178.0, text: "Water flowing underground"},
                {time: 180.7, text: "Into the blue again"},
                {time: 182.7, text: "Into the silent water"},
                {time: 184.5, text: "Under the rocks and stones"},
                {time: 186.7, text: "There is water underground"},
                {time: 188.8, text: "Letting the days go by!"},
                {time: 191.0, text: "Let the water hold me down"},
                {time: 193.0, text: "Letting the days go by!"},
                {time: 195.0, text: "Water flowing underground"},
                {time: 197.0, text: "Into the blue again"},
                {time: 199.0, text: "After the money's gone"},
                {time: 201.0, text: "Once in a lifetime!"},
                {time: 203.0, text: "Water flowing underground"},
                {time: 205.0, text: "Same as it ever was"},
                {time: 207.5, text: "Same as it ever was"},
                {time: 209.5, text: "Same as it ever was"},
                {time: 212.0, text: "And look where my hand was"},
                {time: 214.0, text: "Time isn't holding up"},
                {time: 216.0, text: "Time isn't after us"},
                {time: 218.0, text: "Same as it ever was"},
                {time: 220.0, text: "Same as it ever was"},
                {time: 222.0, text: "Same as it ever was"},
                {time: 224.0, text: "Same as it ever was"},
                {time: 225.5, text: "Same as it ever was"},
                {time: 227.5, text: "Same as it ever was"},
                {time: 230.0, text: "Letting the days go by"},
                {time: 231.5, text: "Same as it ever was"},
                {time: 234.0, text: "And here, a twister comes, here comes the twister"},
                {time: 238.0, text: "Same as it ever was (Letting the days go by!)"},
                {time: 240.0, text: "Same as it ever was"},
                {time: 242.0, text: "Same as it ever was (Letting the days go by!)"},
                {time: 244.0, text: "Same as it ever was"},
                {time: 246.3, text: "Once in a lifetime!"},
                {time: 248.8, text: "Let the water hold me down"},
                {time: 250.0, text: "Letting the days go by!"},
                {time: 252.0, text: "Water flowing underground"},
                {time: 255.0, text: "Into the blue again"}
            ];

            const audio = new Audio("OIAL.mp3");
            audio.play().then( async () => {
                let lastLyricIndex = 0;
                function checkLyrics(){
                    const currentTime = audio.currentTime;
                    for(let i = lastLyricIndex; i < lyrics.length; i++){
                        if(currentTime >= lyrics[i].time){
                            typeLineLyric(lyrics[i].text);
                            lastLyricIndex = i + 1;
                        }
                    }
                    if(!audio.ended){
                        requestAnimationFrame(checkLyrics);
                    } else {
                        typeLineSystem("[SYS]: once_in_a_lifetime.ths - Audio playback completed.")
                commandInput.disabled = false;
                    }
                }
                requestAnimationFrame(checkLyrics);
            }).catch(error => console.error("Playback error", error));

        }

        if(filename === "this_must_be_the_place.ths"){
            commandInput.disabled = true;
            typeLineSystem(`[SYS]: Loading ${filename}...`);
            // Simulate lyrics appearing slowly
            const lyrics = [
                {time: 64.0, text: "Home"},
                {time: 66.0, text: "Is where I want to be"},
                {time: 67.5, text: "Pick me up, and turn me 'round"},
                {time: 71.7, text: "I feel numb"},
                {time: 74.5, text: "Born with a weak heart"},
                {time: 76.5, text: "I guess I must be having fun"},
                {time: 80.5, text: "The less we say about it, the better"},
                {time: 85.0, text: "We'll make it up as we go along"},
                {time: 89.0, text: "Feet on the ground, head in the sky"},
                {time: 93.0, text: "It's okay, I know nothing's wrong, nothing"},
                {time: 98.0, text: "Hi-yeah"},
                {time: 100.0, text: "I got plenty of time"},
                {time: 106.5, text: "Hi-yeah"},
                {time: 108.3, text: "You've got light in your eyes"},
                {time: 113.5, text: "And you're standing here beside me"},
                {time: 118.8, text: "I love the passing of time"},
                {time: 123.0, text: "Never for money, always for love"},
                {time: 126.8, text: "Cover up and say goodnight"},
                {time: 130.0, text: "Say goodnight"},
                {time: 168.7, text: "Home"},
                {time: 170.5, text: "Is where I want to be"},
                {time: 172.0, text: "But I guess I'm already there"},
                {time: 176.8, text: "I come home"},
                {time: 179.0, text: "She lifted up her wings"},
                {time: 181.0, text: "I guess that this must be the place"},
                {time: 185.5, text: "I can't tell one from another"},
                {time: 189.5, text: "Did I find you or you find me?"},
                {time: 194.0, text: "There was a time, before we were born"},
                {time: 198.0, text: "If someone asks, this is where I'll be"},
                {time: 201.0, text: "Where I'll be"},
                {time: 202.8, text: "Hi-yeah"},
                {time: 205.0, text: "We drift in and out"},
                {time: 211.0, text: "Hi-yeah"},
                {time: 213.5, text: "Sing into my mouth"},
                {time: 218.5, text: "Out of all those kinds of people"},
                {time: 223.5, text: "You got a face with a view"},
                {time: 227.8, text: "I'm just an animal looking for a home and"},
                {time: 231.8, text: "Share the same space for a minute or two"},
                {time: 235.0, text: "And you'll love me 'til my heart stops"},
                {time: 240.5, text: "Love me 'til I'm dead"},
                {time: 244.5, text: "Eyes that light up, eyes look through you"},
                {time: 248.0, text: "Cover up the blank spots, hit me on the head, I go"},
                {time: 252.3, text: "Ooo-o-o-ooh!"}
            ];

            const audio = new Audio("TMBTP.mp3");
            audio.play().then( async () => {
                let lastLyricIndex = 0;
                function checkLyrics(){
                    const currentTime = audio.currentTime;
                    for(let i = lastLyricIndex; i < lyrics.length; i++){
                        if(currentTime >= lyrics[i].time){
                            typeLineLyric(lyrics[i].text);
                            lastLyricIndex = i + 1;
                        }
                    }
                    if(!audio.ended){
                        requestAnimationFrame(checkLyrics);
                    } else {
                        typeLineSystem("[SYS]: this_must_be_the_place.ths - Audio playback completed.")
                commandInput.disabled = false;
                    }
                }
                requestAnimationFrame(checkLyrics);
            }).catch(error => console.error("Playback error", error));

        }
    }

    // Handles file scanning
    async function scanFile(filename) {
        activeOutput = true;
        if (!filename) {
            activeOutput = false;
            return typeLineSystem("[SYS]: Error using `scan`, this command requires a filename.");
        }
        if (!files[filename]) {
            activeOutput = false;
            return typeLineSystem(`[SYS]: Error! ${filename} not found.`);
        }
        if (!files[filename].corrupted) {
            activeOutput = false;
            return typeLineSystem("[SYS]: No issues detected.");
        }

        const scanResults = [
            `[SYS]: Scanning ${filename}...`,
            "[SYS]: Found 2 issues:",
            "    -[CRIT] Lyrics file damaged.",
            "    -[WARN] Encryption layer detected.",
            "Try running `fix` to attempt repair."
        ];
        for (let line of scanResults) {
            typeLineSystem(line);
            await delay(700);
        }
        activeOutput = false;
    }

    // Fixes corrupted files
    async function fixFile(filename) {
        activeOutput = true;
        if (!filename) {
            activeOutput = false;
            return typeLineSystem("[SYS]: Error using `fix`, this command requires a filename.");
        }
        if (!files[filename]) {
            activeOutput = false;
            return typeLineSystem(`[SYS]: Error! ${filename} not found.`);
        }
        if (!files[filename].corrupted) {
            activeOutput = false;
            return typeLineSystem("[SYS]: Success! 0 issues fixed, 0 issues left.");
        }

        const fixLines = [
            "[SYS]: Connecting to 172.64.147.203...",
            "[SYS]: 64KB data fetched in 16ms.",
            "[SYS]: Lyrics file: success!",
            "[SYS]: Decryption: success!",
            `[SYS]: Error manager succeeded at fixing ${filename}.`
        ];
        for (let line of fixLines) {
            typeLineSystem(line);
            await delay(getRandomDelay(700, 2000));
        }

        files[filename].corrupted = false;
        localStorage.setItem(filename, "fixed");
        activeOutput = false;
    }

    // Start the boot sequence
    establishBridgeLines();

    function getRandomDelay(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }
});
