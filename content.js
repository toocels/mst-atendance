//Direct Access to the site

// enableDarkMode()
var MTattendance;
var participantsButStat = false
var moreParticipantsStat = false

function receivedMessage(message) {
    if (message.action == "change_title") {
        runAttendance()
    }
    else {
        console.log(message)
    }
}

function runAttendance() {
    if (participantsButStat) {
        // if(moreParticipantsStat is availabel){}
        //click it
        var bot = new MTattendance(document)
        bot.take_attendance()
        console.log("Took attendance.")
        // bot.results()
        sendMessage({
            attendance: {
                absentees: bot.absentees,
                extras: bot.extras
            }
        })
    } else {
        document.querySelector("#roster-button").click()
        // document.querySelector("#roster-button").click()
        participantsButStat = true
    }
}

function sendMessage(message) {
    chrome.runtime.sendMessage(message, function (response) {
        // console.log(response)
        return
    });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        receivedMessage(request)
        return
    }
);

var MTattendance = class {
    constructor(documentObj) {
        console.log("MTattendance class initialised...")
        this.document = documentObj
        this.stu_12D = ['AAKASH V', 'ADVAITH A', 'ADVIKA SEETHARAMAN', 'AKSHARA NIRMAL KUMAR', 'AKSHAYA R K', 'AKSHAYA V', 'ANIKA SEETHARAMAN', 'ANIRUDH RATHNA ARVIND', 'ASHISH H', 'AVANTIKAA R', 'BALAJI RAVI', 'BHARATH RAJESH', 'BHARATHI R', 'DEEKSHITHA MANI', 'DHEEXSHAN C', 'DISHA MOHAPATRA', 'HARIKRISHNAN K S', 'HARISH VIJAYAKUMAR', 'KIRTANA NARAYANAN', 'NANDITHAA S', 'NAVEENA J', 'NEEHARIKA S', 'PAVITHRA G V', 'PIDURU SAI CHINMAYEE REDDY', 'PRANAV KUMAR S', 'RAINA SIVANI  V', 'SAATHVIK B', 'SHANTANU RAMANUJAPURAM', 'SHIVANSH MISHRA', 'SHRIVATSHAN S K', 'SNEHA VALLIAMMAI SUBBIAH', 'SREEHARI R', 'SRINIDHI SRIDHAR', 'SURAJ M', 'SURYA KRISHNA BABU', 'SWAYAM PRAKASH B R', 'THIRU KATHIR', 'VARSHINI H', 'VASAN LENNIN', 'VIKRAM EASHWAR  R']
        // this.stu_12D = ['None ']
        this.participantsraw = []
        this.absentees = []
        this.participants = []
        this.extras = []
    }

    take_attendance() {
        var roles_list = this.document.getElementsByClassName('ts-accordion')
        var roles = roles_list[0].getElementsByTagName('accordion-section')

        for (var i = 0; i < roles.length; i++) {
            // if (raw[i].getAttribute('init-opened') == '::ctrl.sectionsOpened[ctrl.listType.Attendees]') {
            //     console.log('continuingg')
            //     continue //skip the role sectiont hat shows they are not CURRENTLY in the meet
            // }
            var role = roles[i]
            var studentslist = role.getElementsByTagName('span')
            for (var j = 0; j < studentslist.length; j++) {
                if (studentslist[j].className == 'ts-user-name') {
                    this.participantsraw.push(studentslist[j])
                    this.participants.push(studentslist[j].textContent)
                }
            }

        }
        // this.filter_participants()
        this.findExtras()
        this.findAbsentees()
    }

    findExtras() {
        for (var i = 0; i < this.participants.length; i++) {
            if (this.stu_12D.includes(this.participants[i])) { } else {
                this.extras.push(this.participants[i])
            }
        }
    }

    findAbsentees() {
        var absenteesTemp = []
        for (var i = 0; i < this.stu_12D.length; i++) {
            if (this.participants.includes(this.stu_12D[i])) { } else {
                absenteesTemp.push(this.stu_12D[i])
            }
        }
        this.absentees = absenteesTemp
    }

    results() {
        console.log('Absentees')
        console.log(this.absentees)
        console.log()
        console.log('Extras')
        console.log(this.extras)
    }
}

