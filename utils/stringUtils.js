// write a function that takes a string and number called n, and repeats
// the string n times with a space in the middle of each time.

function repeatNTimesWithSpace(string, n){
    if(!string) return "";

    // console.log(new Array (n).fill(string).join(" "));
    return new Array(n).fill(string).join(" ")
    // return (string + " ").repeat(n);
};

function captializeFirstLetter(string){
    if(!string) return "";

    return string[0].toUpperCase() + string.slice(1);
};

module.exports = {
    repeatNTimesWithSpace,
    captializeFirstLetter
};