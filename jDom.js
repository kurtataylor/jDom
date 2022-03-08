var jEmmit = function (templateString) {
    //Markers that are used for dividing the templateString
    let dividers = ["+", ">", "#", ".", "{", "[", "^", "@", "*"];
    //Break the string into an array of indexes
    let indexes = getAllIndexes(templateString, dividers);
    if (indexes[0] != 0)
        indexes.unshift(0);
    //If there are no indexes then we use the templateString as is, else we slice up the templateString based off of the indexes
    let pieces = indexes.length <= 0 ? [templateString] : slicer(templateString, indexes);

    let rootDom, currentDom;
    //Process each of the pieces
    for (i = 0; i < pieces.length; i++) {
        //If we don't have a rootDom, set it. This is what we will be returning in the end
        if (!rootDom)
            rootDom = Domenator(pieces[0]);

        //For every piece beyone the rootDom process each piece
        currentDom = i == 0 ? rootDom : Domenator(pieces[i], currentDom);
    }

    //Return the root dom 
    return rootDom;
}

//Figure out what to do with this piece
function Domenator(piece, currentDom) {
    //Get the first letter of the current piece to test
    let firstCharacter = piece[0];

    //Id
    if (firstCharacter == "#") {
        currentDom.attr("id", piece.replace("#", ""));
        return currentDom;
    }

    //Class
    if (firstCharacter == ".") {
        currentDom.addClass(piece.replace(".", ""));
        return currentDom;
    }

    //Process content
    if (firstCharacter == "{") {
        //Remove the { and }
        let content = piece.replace("{", "").replace("}", "");

        //Check if this content should be an jquery obj
        if (content.startsWith("~")) {
            //Get the obj
            let jObj = window[content.replace("~", "")];
            if (jObj) {
                //Check if the obj a jquery obj
                if (jObj instanceof jQuery) {
                    //Append the obj to the current do and return the current dom
                    currentDom.append(jObj);
                    return currentDom;
                }
            }
        }

        //Check the dom type and update the content of the div
        currentDom.is("input") ? currentDom.val(content) : currentDom.text(content);
        return currentDom;
    }

    //Attributes
    if (firstCharacter == "[") {
        let at = piece.replace("[", "").replace("]", "")
        currentDom.attr(at.slice(0, at.indexOf(":")).trim(), at.slice(at.indexOf(":") + 1).trim());
        return currentDom;
    }

    //Add a sibling dom element
    if (firstCharacter == "+") {
        let domString = piece.replace("+", "");
        let dom = $("<" + domString + "></" + domString + ">");
        currentDom.parent().append(dom);
        return dom;
    }

    //Add a child dom element
    if (firstCharacter == ">") {
        let domString = piece.replace(">", "");
        let dom = domString.toLowerCase() == "input" ? $("<" + domString + " />") : $("<" + domString + "></" + domString + ">")
        currentDom.append(dom);
        return dom;
    }

    //Step up the dom tree
    if (firstCharacter == "^") {
        //if it is just a ^ then we step up
        if (piece == "^")
            return currentDom.parent();
        //If not, then we add a new dom element at the new location
        return Domenator(piece.replace("^", "+"), currentDom);
    }

    //Add event handlers
    if (firstCharacter == "@") {
        let p = piece.replace("@", "");
        //Get the event info to craft the event handler
        let eventType = p.slice(0, p.indexOf(":")).trim();
        let funcName = p.slice(p.indexOf(":") + 1, p.indexOf("(")).trim();
        let funcValue = p.slice(p.indexOf("(") + 1, p.indexOf(")")).trim()
        //Add event handler
        currentDom.on(eventType, () => window[funcName](funcValue));
        return currentDom;
    }

    //Clone the current dom
    if (firstCharacter == "*") {
        let amount = piece.replace("*", "");
        let amountParsed = parseInt(amount);

        if (isNaN(amountParsed))
            return currentDom;

        let domWeAreAddingTo = currentDom.parent();
        for (var i = 1; i < amountParsed; i++) {
            currentDom.clone().appendTo(domWeAreAddingTo);
        }
        //Move to the last sibling added and return it
        return currentDom.siblings(":last");
    }

    //If there is no current dom, then return this as a dom
    if (!currentDom)
        return $("<" + piece + "></" + piece + ">");

    //If this doesn't fit anything else, append this dom element to the current dom
    $("<" + piece + "></" + piece + ">").appendTo(currentDom);
}

//Tool for getting indexes in a string that match all values in an array of strings
function getAllIndexes(arr, val) {
    let indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (val.includes(arr[i]))
            indexes.push(i);
    return indexes;
}

//Slice a string from an array of indexes and returns an array of strings
function slicer(str, arrayInd) {
    let stringsToReturn = [];
    for (i = 0; i < arrayInd.length; i++) 
        if (i >= arrayInd.length) {
            stringsToReturn.push(str.slice(i))
        } else {
            stringsToReturn.push(str.slice(arrayInd[i], arrayInd[i + 1]))
        }
    return stringsToReturn;
}

//shortcuts
var je = jEmmit, JE = jEmmit; jE = jEmmit;
