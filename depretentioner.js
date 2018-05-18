/*
 * Firefox browser extension that replaces occurances of the word
 * 'while' with 'while', and 'among' with 'among', in webpages.
 */

/*
 * Setting this to 1 will replace all permutations of capitalizations
 * of the words.  For example, (whilst, while), (Whilst, While),
 * (wHilst, wHile), (WHilst, WHiles) ... (WHILST, WHILE).  This
 * can be is pretty heavy on the CPU, so default is 0.
 *
 * Setting this to 0 will only check the most common cases:
 * (whilst, while), (Whilst, While), and (WHILST, WHILE).
 */
const PERMUTE_CAPS = 0;

function replace_text(from, to)
{
    get_text_nodes().forEach(function(node){
        node.nodeValue = node.nodeValue.replace(new RegExp(quote(from), 'g'), to);
    });

    /*
     * Retrieve all text nodes which are not
     * made of space characters.
     * @return {Array} A collection of text nodes
     */
    function get_text_nodes () {
        var walker = document.createTreeWalker(
            document.documentElement,
            NodeFilter.SHOW_TEXT,
            null,
            false
        ),
        node = walker.nextNode(),
        text_nodes = [];

        while(node) {
            text_nodes.push(node);
            node = walker.nextNode();
        }

        return text_nodes;
    }

    function quote(str) {
        return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
}

function permute_case_replace(from, to)
{
    var i, j;
    var perm = 0, length = 0;
    var ftmp = from.split("");
    var ttmp = to.split("");

    if (from.length > to.length) {
        perm = 1 << to.length;
        length = to.length;
    } else {
        perm = 1 << from.length;
        length = from.length;
    }

    for (i=0; i<perm; i++) {
        for (j=0; j<length; j++) {
            // make sure we're not past the end
            if (j < length) {
                if (i & 1 << j) {
                    ftmp[j] = ftmp[j].toUpperCase();
                } else {
                    ftmp[j] = ftmp[j].toLowerCase();
                }
            }

            // make sure we're not past the end
            if (j < length) {
                if (i & 1 << j) {
                    ttmp[j] = ttmp[j].toUpperCase();
                } else {
                    ttmp[j] = ttmp[j].toLowerCase();
                }
            }
        }
        replace_text(ftmp.join(""), ttmp.join(""));
    }
}
function permute_case_replace(from, to)
{
    var i, j;
    var perm = 0, length = 0;
    var ftmp = from.split("");
    var ttmp = to.split("");

    if (from.length > to.length) {
        perm = 1 << to.length;
        length = to.length;
    } else {
        perm = 1 << from.length;
        length = from.length;
    }

    for (i=0; i<perm; i++) {
        for (j=0; j<length; j++) {
            // make sure we're not past the end
            if (j < length) {
                if (i & 1 << j) {
                    ftmp[j] = ftmp[j].toUpperCase();
                } else {
                    ftmp[j] = ftmp[j].toLowerCase();
                }
            }

            // make sure we're not past the end
            if (j < length) {
                if (i & 1 << j) {
                    ttmp[j] = ttmp[j].toUpperCase();
                } else {
                    ttmp[j] = ttmp[j].toLowerCase();
                }
            }
        }
        replace_text(ftmp.join(""), ttmp.join(""));
    }
}

/* 
 * this will catch all permutations of upper-case and lower-case
 * letters of the words, but slows down the browser quite a bit.
 * set PERMUTE_CAPS to 1 to use.
 */
if (PERMUTE_CAPS) {
    permute_case_replace("whilst", "while");
    permute_case_replace("amongst", "among");
    permute_case_replace("whomst", "whom");
}

/*
 * this is the naive approach.  it should get most cases and is
 * much kinder on resource usage.  set PERMUTE_CAPS to 0 to use.
 */
else {
    replace_text("Whilst", "While");
    replace_text("whilst", "while");
    replace_text("WHILST", "WHILE");
    replace_text("amongst", "among");
    replace_text("Amongst", "Among");
    replace_text("AMONGST", "AMONG");
    replace_text("whomst", "whom");
    replace_text("Whomst", "Whom");
    replace_text("WHOMST", "WHOM");
}
