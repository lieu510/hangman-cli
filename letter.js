var Letter = function(letter) {
    this.letter = letter;
    this.guessed = false;
}

Letter.prototype.display = function() {
    if (this.guessed) {
        return this.letter;
        // console.log(this.letter);
    } else {
        return "_";
        // console.log("_");
    }
}

module.exports = Letter;