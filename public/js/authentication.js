//Name that will be used for the authentication cookie
const authenticationCookieName = "devvo-authentication";

//function that sets cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//getting the cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};


//function to check authentication cookie
function checkAuthentication() {
    var dopplegangerAuthentication = getCookie(authenticationCookieName)
    if (dopplegangerAuthentication) {

        //Hide the sign in button
        $("#signInButton").hide();

        //Show the results link in the navbar
        $("#resultsLink").show();

        //Get the profile image url from the database
        db.collection("users").where("email", "==", dopplegangerAuthentication)
            .get()
            .then(function (snapshot) {

                //User already exists in the database
                if (snapshot && snapshot.docs && snapshot.docs.length > 0) {

                    //Set the image source to the photo url from the fire database
                    $(".yourImg").attr("src", snapshot.docs[0].data().photoURL);
                    // enables the compare button
                    $("#compareButton, #carouselCompareButton").attr("disabled", false);

                    //Store the user's display name as an attribute on the signInButton element
                    $("#signInButton").attr("data-user-display-name", snapshot.docs[0].data().displayName);

                }
            });
    }
    else {
        //Show the sign in button
        $("#signInButton").show();
        //Hide the results link in the navbar
        $("#resultsLink").hide();
    }
};