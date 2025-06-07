document.addEventListener("DOMContentLoaded", function () {
    const publicPages = ["login.html", "cadastro.html", "redefinir_senha.html"];
    const currentPage = window.location.pathname.split("/").pop();
    const isPublic = publicPages.includes(currentPage);

    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (!loggedInUser && !isPublic) {
        window.location.href = "login.html";
    }
});
