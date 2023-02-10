$(document).ready(function() {
    const userId = localStorage.getItem('user');

    $("#user-name").text("loading...");
    $("#user-email").text("loading...");
    $("#user-first-name").text("loading...");
    $("#user-last-name").text("loading...");

    axiosInstance.get(`/users/${userId}`).then((response) => {
        const user = response.data;
        console.log(user);

        $("#user-intro").text("Hello " + user.fields.firstName + " " + user.fields.lastName + "!")
        $("#user-name").text(user.fields.firstName + " " + user.fields.lastName);
        $("#user-email").text(user.fields.email);
        $("#user-first-name").text(user.fields.firstName);
        $("#user-last-name").text(user.fields.lastName);
        $("#user-points").text(user.fields.points);
    });
});
