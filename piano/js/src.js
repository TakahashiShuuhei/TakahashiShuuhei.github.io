var notes = [
    { tone: 'A3', score: 'A' },
    { tone: 'B3', score: 'B' },
    { tone: 'C3', score: 'C' },
    { tone: 'D3', score: 'D' },
    { tone: 'E3', score: 'E' },
    { tone: 'F3', score: 'F' },
    { tone: 'G3', score: 'G' },
    { tone: 'A4', score: 'a' },
    { tone: 'B4', score: 'b' },
    { tone: 'C4', score: 'c' },
    { tone: 'D4', score: 'd' },
    { tone: 'E4', score: 'e' },
    { tone: 'F4', score: 'f' },
    { tone: 'G4', score: 'g' },
    
];

function rndInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getNotes(count) {
    var ans = [];
    for (var i = 0; i < count; i++) {
	ans.push(notes[rndInt(notes.length - 1)]);
    }
    return ans;
}

function init(o) {
    o.notes = getNotes(o.noteCount);
    var abc = "M:4/4\nL:1/4\nK:C\n";
    ABCJS.renderAbc("note", abc);
};

var o = {
    noteCount: 3,
    notes: []
};



function play() {
    var synth = new Tone.Synth().toDestination();
    var now = Tone.now()
    for (var i = 0; i < o.notes.length; i++) {
	var tone = o.notes[i];
	synth.triggerAttackRelease(tone.tone, "8n", now + 0.5 * i);
    }
}

$(function () {
    init(o);
})

$("#play-button").on('click', function () {
    if (Tone.context.state !== 'running') {
	Tone.context.resume();
    }
    play();
});

$("#answer-button").on('click', function () {
    var abc = "M:4/4\nL:1/4\nK:C\n";
    for (var i = 0; i < o.notes.length; i++) {
	if (i % 4 === 2) {
	    abc += ' ';
	} else if (i % 4 === 0 && i > 0) {
	    abc += ' | ';
	}
	abc += o.notes[i].score;
    }
    abc += ' ||';
    ABCJS.renderAbc("note", abc);
});

$("#next-button").on('click', function () {
    init(o);
    play();
});
