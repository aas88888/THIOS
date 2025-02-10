document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".outputArea");
    const commandInput = document.querySelector(".inputArea");
    const primaryText = document.querySelector(".primaryText");
    let activeOutput = false;
    const messageMix = "Stop messing with the mixes.";
    const messageLogin = "Strange login activity";
    const savedLogin = localStorage.getItem("loginString");
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
        "FROM: beno [beno@172.64.147.203]",
        "TO: dbyrne@thios.com",
        "DATE: October 7, 1980",
        "SUBJECT: Stop messing with the records.",
        "‎",
        "David,",
        "‎",
        "We got your latest version of the album. We are, for the lack of a better word, concerned.",
        "What happened to the chorus? What is going on with the verses? What happened to normal song structures??",
        "‎",
        "We need something radio-friendly, not this, man. We can't sell a record that sounds like you didn't know what you were doing.",
        "Please, just stop re-inventing the wheel already.",
        "‎",
        "- B.E."
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
        "Says here they have approved access, but how? The system was dead for ages.",
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
        const greetingLine = "[SYS]: Please, enter your username to log in.";
        typeLineSystem(greetingLine);
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
            "[SYS]: Getting administrator permissions for: alexB",
            "[SYS]: Administrator permissions granted: alexB",
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

    
    // Prints a line with a typing effect FOR ONCE IN A LIFETIME ONLY (Because these are faster)
    function typeLineLyricOIAL(text) {
        return new Promise((resolve) => {
            let lineElement = document.createElement("p");
            terminal.appendChild(lineElement);
            let i = 0;

            function typeCharacter() {
                activeOutput = true;
                if (i < text.length) {
                    lineElement.innerHTML += text[i++];
                    setTimeout(typeCharacter, 20); // Typing speed
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
        commandInput.addEventListener("keydown", (event) => {
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
            if(login === "alexB"){
                typeLineSystem("[SYS]: Sorry, you are not authorized to use the inbox functionality. If you believe you are, please contact our customer support team or try again later.")
            } else if (login === "dbyrne"){
                typeLineSystem("[SYS]: Sorry, there was an error processing your request. Caused by: 500 INTERNAL_SERVER_ERROR. If the issue persists, please contact our customer support or try again later.")
            }
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
        } if(filename === "girlfriend_is_better.ths"){
            typeLineSystem(`[SYS]: Loading ${filename}...`);
            // Simulate lyrics appearing slowly
            const lyrics = [
                "I!",
                "Who took the money?",
                "Who took the money away?",
                "I, I, I, I,",
                "it's always showtime,",
                "Here at the edge of the stage",
                "And I, I, I, wake up and wonder",
                "What was the place, what was the name?",
                "We wanna wait, but here we go again",
                "I,",
                "Takes over slowly,",
                "But doesn't last very long",
                "I, I, I, I,",
                "No need to worry",
                "Everything's under control",
                "O-U-T,",
                "But no hard feelings",
                "What do you know? Take you away",
                "We're being taken for a ride again",
                "I got a girlfriend that's better than that",
                "She has the smoke in her eyes",
                "She's coming up, going right through my heart",
                "She's gonna give me surprise",
                "I think it's right, better than this",
                "I think you can if you like",
                "I got a girlfriend with bows in her hair",
                "And nothing is better than that! Is it?",
                "Down, down in the basement",
                "We hear the sound of machines",
                "I, I, I'm ",
                "Driving in circles",
                "Come to my senses sometimes",
                "Why, why, why, why start it over?",
                "Nothing was lost, everything's free",
                "I don't care how impossible it seems",
                "Somebody calls you but you cannot hear",
                "Get closer to be far away",
                "And only one look and that's all that it takes",
                "Maybe that's all that we need",
                "All that it takes, I'll bet it's right",
                "All it takes, if it's right",
                "I got a girlfriend that's better than that",
                "And she goes wherever she likes (there she goes)",
                "I got a girlfriend that's better than that",
                "Now everyone's getting involved",
                "She's moving up, going right through my heart",
                "We might not ever get caught",
                "Going right through, try to stay cool",
                "Going through, staying cool",
                "I got a girlfriend, she's better than that",
                "And nothing is better than you (wait a minute)",
                "I got a girlfriend that's better than this",
                "But you don't remember at all",
                "As we get older and stop making sense",
                "You won't find her waiting long",
                "Stop making sense, stop making sense",
                "Stop making sense, making sense",
                "I got a girlfriend, she's better than that",
                "And nothing is better than this (is it?)"
        ];

            const delays = [
                4000, 2000, 1000, 2000, 1900, 500, 2000, 2000, 2000, 5000, 2500, 1000, 2000, 1300, 1300, 2000, 1500, 1100, 1800, 5600, 1300, 1600,
                1300, 2100, 1600, 1500, 1800, 1900, 2000, 2000, 1400, 1300, 1900, 2000, 2000, 5400, 1500, 2000, 1400, 2200,
                1800, 1800, 1400, 34000, 1600, 1600, 1400, 1800, 1600, 1800, 1700, 1600, 1600, 1600, 1700, 1700, 1700, 1700, 1700
            ];
            const bias = 0.97;
            const audio = new Audio("GIB.mp3");
            audio.play().then(async () => {
            commandInput.disabled = true;
            for(let i = 0; i < lyrics.length; i++){
                const delay = delays[i];
                await new Promise(res => setTimeout(res, delay*bias));
                await typeLineLyric(lyrics[i]);
            }
            audio.addEventListener("ended", () => {
                typeLineSystem("[SYS]: girlfriend_is_better.ths - Audio playback completed.")
                commandInput.disabled = false;
            })
            }).catch(error => console.error("Playback error", error));



        }   if(filename === "born_under_punches.ths"){
            typeLineSystem(`[SYS]: Loading ${filename}...`);
            // Simulate lyrics appearing slowly
            const lyrics = [
                "Take a look at these hands",
                "Take a look at these hands!",
                "The hand speaks",
                "The hand of a government man",
                "Well, I'm a tumbler",
                "Born under punches",
                "I'm so thin",
                "All I want",
                "Is to breathe",
                "Won't you breathe",
                "With me?",
                "Find a little space",
                "So we move in-between",
                "And keep one step ahead",
                "Of yourself",
                "Don't you miss it? Don't you miss it?",
                "Some 'a you people just about missed it!",
                "Last time to make plans",
                "Well, I'm a tumbler",
                "I'm a government man",
                "Never seen anything like that before",
                "Falling bodies tumble 'cross the floor",
                "When you get to where you wanna be",
                "When you get to where you wanna be",
                "Wooah, take a look at these hands, they're passing in-between us",
                "Take a look at these hands!",
                "Take a look at these hands! You don't have to mention it",
                "No thanks",
                "I'm a government man",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, where the hand has been",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on (Got time?), and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, where the hand has been",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on (I'm not a drowning man), and the heat goes on",
                "And the heat goes on (And I'm not a burning building), and the heat goes on (I'm a tumbler)",
                "And the heat goes on (Drowning cannot hurt a man), where the hand has been",
                "And the heat goes on (Fire cannot hurt a man), and the heat goes on (Not the government man)",
                "And the heat goes on (All), and the heat goes on",
                "And the heat goes on (I want is to breathe), and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on",
                "And the heat goes on, and the heat goes on"
            ];

            const delays = [
                27000, 3200, 2600, 2400, 2600, 2600, 2600, 1500, 1500, 4000, 
                2500, 4000, 2800, 2500, 2500, 4000, 900, 3800, 1800, 1800, 
                1000, 5000, 6500, 6300, 6000, 1000, 2000, 1000, 1000, 41000, 
                500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 
                500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 
                500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 
                500, 500, 500, 500, 
            ];

            const audio = new Audio("BUP.mp3");
            audio.play().then(async () => {
            commandInput.disabled = true;
            const bias = 0.99;
            for(let i = 0; i < lyrics.length; i++){
                const delay = delays[i];
                await new Promise(res => setTimeout(res, delay*bias));
                await typeLineLyric(lyrics[i]);
                
            }
            audio.addEventListener("ended", () => {
                typeLineSystem("[SYS]: born_under_punches.ths - Audio playback completed.")
                commandInput.disabled = false;
            })
            }).catch(error => console.error("Playback error", error));


        }
        if(filename === "seen_and_not_seen.ths"){
            typeLineSystem(`[SYS]: Loading ${filename}...`);
            const lyrics = [
                "He would see faces in movies, on TV, in magazines, and in books",
                "He thought that some of these faces might be right for him",
                "And that through the years, by keeping an ideal facial structure fixed in his mind",
                "Or somewhere in the back of his mind",
                "That he might, by force of will, cause his face to approach those of his ideal",
                "The change would be very subtle",
                "It might take ten years or so",
                "Gradually his face would change its shape",
                "A more hooked nose",
                "Wider, thinner lips",
                "Beady eyes",
                "A larger forehead",
                "He imagined that this was an ability he shared with most other people",
                "They had also molded their faces according to some ideal",
                "Maybe they imagined that their new face",
                "Would better suit their personality",
                "Or maybe they imagined that their personality",
                "Would be forced to change to fit the new appearance",
                "This is why first impressions are often correct",
                "Although some people might have made mistakes",
                "They may have arrived at an appearance",
                "That bears no relationship to them",
                "They may have picked an ideal appearance",
                "Based on some childish whim, or momentary impulse",
                "Some may have gotten halfway there",
                "And then changed their minds",
                "He wonders if he too",
                "Might have made a similar mistake"
            ];

            const delays = [
                20000, 2500, 1100, 500, 1500, 2000, 2000, 3000, 1500, 1500, 
                2300, 3300, 13000, 2000, 900, 500, 1000, 500, 5000, 7000, 
                2000, 500, 1000, 500, 2000, 2000, 12000, 500
            ];

            const audio = new Audio("SANS.mp3");
            audio.play().then(async () => {
            commandInput.disabled = true;
            const bias = 1;
            for(let i = 0; i < lyrics.length; i++){
                const delay = delays[i];
                await new Promise(res => setTimeout(res, delay*bias));
                await typeLineLyric(lyrics[i]);
                
            }
            audio.addEventListener("ended", () => {
                typeLineSystem("[SYS]: seen_and_not_seen.ths - Audio playback completed.")
                commandInput.disabled = false;
            })
            }).catch(error => console.error("Playback error", error));

        } if(filename === "once_in_a_lifetime.ths"){
            typeLineSystem(`[SYS]: Loading ${filename}...`);
            // Simulate lyrics appearing slowly
            const lyrics = [
                "You may find yourself",
                "Living in a shotgun shack",
                "And you may find yourself",
                "In another part of the world",
                "And you may find yourself",
                "Behind the wheel of a large automobile",
                "And you may find yourself in a beautiful house",
                "With a beautiful wife",
                "And you may ask yourself",
                "'Well ... how did I get here?'",
                "Letting the days go by!",
                "Let the water hold me down",
                "Letting the days go by!",
                "Water flowing underground",
                "Into the blue again",
                "After the money's gone",
                "Once in a lifetime!",
                "Water flowing underground",
                "And you may ask yourself",
                "'How do I work this?'",
                "And you may ask yourself",
                "'Where is that large automobile?'",
                "And you may tell yourself",
                "'This is not my beautiful house!'",
                "And you may tell yourself",
                "'This is not my beautiful wife!'",
                "Letting the days go by!",
                "Let the water hold me down",
                "Letting the days go by!",
                "Water flowing underground",
                "Into the blue again",
                "After the money's gone",
                "Once in a lifetime!",
                "Water flowing underground",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "Water dissolving, and water removing!",
                "There is water at the bottom of the ocean",
                "Under the water, carry the water",
                "Remove the water at the bottom of the ocean",
                "Water dissolving, and water removing!",
                "Letting the days go by!",
                "Let the water hold me down",
                "Letting the days go by!",
                "Water flowing underground",
                "Into the blue again",
                "Into the silent water",
                "Under the rocks and stones",
                "There is water underground",
                "Letting the days go by!",
                "Let the water hold me down",
                "Letting the days go by!",
                "Water flowing underground",
                "Into the blue again",
                "After the money's gone",
                "Once in a lifetime!",
                "Water flowing underground",
                "You may ask yourself",
                "'What is that beautiful house?'",
                "You may ask yourself",
                "'Where does that highway go to?'",
                "And you may ask yourself",
                "'Am I right? Am I wrong?'",
                "And you may say to yourself",
                "'My God! What have I done?!'",
                "Letting the days go by!",
                "Let the water hold me down",
                "Letting the days go by",
                "Water flowing underground",
                "Into the blue again",
                "Into the silent water",
                "Under the rocks and stones",
                "There is water underground",
                "Letting the days go by!",
                "Let the water hold me down",
                "Letting the days go by!",
                "Water flowing underground",
                "Into the blue again",
                "After the money's gone",
                "Once in a lifetime!",
                "Water flowing underground",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "And look where my hand was",
                "Time isn't holding up",
                "Time isn't after us",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "Same as it ever was",
                "Letting the days go by",
                "Same as it ever was",
                "And here, a twister comes, here comes the twister",
                "Same as it ever was (Letting the days go by!)",
                "Same as it ever was",
                "Same as it ever was (Letting the days go by!)",
                "Same as it ever was",
                "Once in a lifetime!",
                "Let the water hold me down",
                "Letting the days go by!",
                "Water flowing underground",
                "Into the blue again"
            ];

            const delays = [
                17000, 1200, 2000, 1500, 1500, 1300, 1500, 2000, 1500, 1500, 
                1700, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 
                1300, 1300, 1300, 1300, 1300, 1300, 1000, 1100, 1200, 1300, 
                1300, 1300, 1300, 1300, 1500, 1500, 1500, 1500, 1500, 1500, 
                1500, 1500, 1500, 2000, 2000, 2000, 2000, 1300, 1300, 1300, 
                1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 
                1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 
                1000, 1300, 1300, 1350, 1300, 1300, 1300, 1300, 1300, 1300, 
                1300, 1300, 1300, 1300, 1300, 1300, 1300, 1500, 1500, 1500, 
                1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 
                1500, 1500, 2000, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 100,
            ];

            const audio = new Audio("OIAL.mp3");
            audio.play().then(async () => {
            commandInput.disabled = true;
            const bias = 1;
            for(let i = 0; i < lyrics.length; i++){
                const delay = delays[i];
                await new Promise(res => setTimeout(res, delay*bias));
                await typeLineLyricOIAL(lyrics[i]);
                
            }
            audio.addEventListener("ended", () => {
                typeLineSystem("[SYS]: once_in_a_lifetime.ths - Audio playback completed.")
                commandInput.disabled = false;
            })
            }).catch(error => console.error("Playback error", error));

        }

        if(filename === "this_must_be_the_place.ths"){
            typeLineSystem(`[SYS]: Loading ${filename}...`);
            // Simulate lyrics appearing slowly
            const lyrics = [
                "Home",
                "Is where I want to be",
                "Pick me up, and turn me 'round",
                "I feel numb",
                "Born with a weak heart",
                "I guess I must be having fun",
                "The less we say about it, the better",
                "We'll make it up as we go along",
                "Feet on the ground, head in the sky",
                "It's okay, I know nothing's wrong, nothing",
                "Hi-yeah",
                "I got plenty of time",
                "Hi-yeah",
                "You've got light in your eyes",
                "And you're standing here beside me",
                "I love the passing of time",
                "Never for money, always for love",
                "Cover up and say goodnight",
                "Say goodnight",
                "Home",
                "Is where I want to be",
                "But I guess I'm already there",
                "I come home",
                "She lifted up her wings",
                "I guess that this must be the place",
                "I can't tell one from another",
                "Did I find you or you find me?",
                "There was a time, before we were born",
                "If someone asks, this is where I'll be",
                "Where I'll be",
                "Hi-yeah",
                "We drift in and out",
                "Hi-yeah",
                "Sing into my mouth",
                "Out of all those kinds of people",
                "You got a face with a view",
                "I'm just an animal looking for a home and",
                "Share the same space for a minute or two",
                "And you'll love me 'til my heart stops",
                "Love me 'til I'm dead",
                "Eyes that light up, eyes look through you",
                "Cover up the blank spots, hit me on the head, I go",
                "Ooo-o-o-ooh!"
            ];

            const delays = [
               64000, 1500, 500, 2000, 2000, 500, 2000, 2000, 2000, 2000, 
               2000, 1500, 4500, 1500, 4000, 2000, 3000, 2000, 1000, 38000, 
               1500, 500, 2000, 2000, 500, 1800, 2000, 2000, 2000, 500, 
               1000, 1500, 5000, 1500, 4300, 2200, 2000, 1000, 2000, 2000, 2500, 
               2000, 1000
            ];

            const audio = new Audio("TMBTP.mp3");
            audio.play().then(async () => {
                commandInput.disabled = true;
                for(let i = 0; i < lyrics.length; i++){
                const delay = delays[i];
                await new Promise(res => setTimeout(res, delay));
                await typeLineLyric(lyrics[i]);
            }
            audio.addEventListener("ended", () => {
                typeLineSystem("[SYS]: this_must_be_the_place.ths - Audio playback completed.")
                commandInput.disabled = false;
            })
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
