document.addEventListener("DOMContentLoaded", function () {
    // === Mostrar/Ocultar senha ===
    function setupTogglePassword(toggleButtonId, passwordFieldId) {
        const toggleButton = document.getElementById(toggleButtonId);
        const passwordField = document.getElementById(passwordFieldId);

        if (toggleButton && passwordField) {
            toggleButton.addEventListener("click", function () {
                const isPassword = passwordField.type === "password";
                passwordField.type = isPassword ? "text" : "password";
                this.querySelector("i").classList.toggle("bi-eye", !isPassword);
                this.querySelector("i").classList.toggle("bi-eye-slash", isPassword);
            });
        }
        const avatarPreview = document.getElementById("avatarSelecionado");
        if (avatarPreview && userImage) {
            avatarPreview.src = userImage;
        }

    }

    setupTogglePassword("togglePassword", "password");
    setupTogglePassword("togglePasswordConfirm", "passwordConfirm");

    // === LocalStorage helpers ===
    function getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }

    function saveUser(email, password, profileImageBase64, name) {
        let users = getUsers();
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        users.push({
            id,
            email,
            password,
            profileImage: profileImageBase64 || "",
            name: name && name !== "" ? name : "Nome não informado"
        });
        localStorage.setItem("users", JSON.stringify(users));
    }


    // === Cadastro ===
    const cadastroForm = document.getElementById("cadastroForm");
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const passwordConfirm = document.getElementById("passwordConfirm").value;
            const nameInput = document.getElementById("name");
            const name = nameInput ? nameInput.value.trim() : "";

            const profilePicInput = document.getElementById("profilePic");

            if (password !== passwordConfirm) {
                alert("As senhas não coincidem!");
                return;
            }

            let users = getUsers();
            if (users.some(user => user.email === email)) {
                alert("Esse email já está cadastrado!");
                return;
            }

            const file = profilePicInput?.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    saveUser(email, password, e.target.result, name);
                    alert("Cadastro realizado com sucesso! Redirecionando para o login.");
                    window.location.href = "login.html";
                };
                reader.readAsDataURL(file);
            } else {
                saveUser(email, password, null, name);
                alert("Cadastro realizado com sucesso! Redirecionando para o login.");
                window.location.href = "login.html";
            }
        });
    }

    // === Login ===
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const users = getUsers();

            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                sessionStorage.setItem("loggedInUser", email);
                sessionStorage.setItem("userImage", user.profileImage || "");
                sessionStorage.setItem("userName", user.name || "Nome não informado");
                alert("Login bem-sucedido! Redirecionando...");
                window.location.href = "home.html";
            } else {
                alert("Email ou senha incorretos.");
            }
        });
    }

    // === Verificação de login e exibição de dados ===
    const loggedInEmail = sessionStorage.getItem("loggedInUser");
    const userImage = sessionStorage.getItem("userImage");
    const userName = sessionStorage.getItem("userName");

    const headerImage = document.getElementById("profileImage");
    const headerName = document.getElementById("userName");
    const userEmailElement = document.getElementById("userEmail");

    if (loggedInEmail) {
        if (userEmailElement) userEmailElement.innerText = loggedInEmail;
        if (headerImage && userImage) headerImage.src = userImage;
        if (headerName && userName) headerName.innerText = userName;

        const profileName = document.getElementById("profileName");
        const profilePic = document.getElementById("profilePic");
        if (profileName && userName) profileName.innerText = userName;
        if (profilePic && userImage) profilePic.src = userImage;
    } else if (userEmailElement || headerImage || headerName) {
        window.location.href = "login.html";
    }

    // === Logout ===
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            sessionStorage.clear();
            alert("Você saiu da conta.");
        });
    }

    // === Menu lateral toggle ===
    const menuButton = document.getElementById("menuButton");
    const sideMenu = document.getElementById("sideMenu");

    if (menuButton && sideMenu) {
        menuButton.addEventListener("click", function () {
            sideMenu.classList.toggle("open");
        });

        document.addEventListener("click", function (event) {
            if (!sideMenu.contains(event.target) && !menuButton.contains(event.target)) {
                sideMenu.classList.remove("open");
            }
        });
    }

    // === Marcar item ativo do menu ===
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll("#sideMenu ul li a").forEach(item => {
        if (item.getAttribute("href") === currentPage) {
            item.classList.add("active");
        }
    });

    // === Atualização de imagem de perfil (editar perfil) ===
    const editInput = document.getElementById("editProfilePic");

    if (editInput) {
        editInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageUrl = e.target.result;
                    sessionStorage.setItem("userImage", imageUrl);

                    const profilePic = document.getElementById("profilePic");
                    const headerImage = document.getElementById("profileImage");

                    if (profilePic) profilePic.src = imageUrl;
                    if (headerImage) headerImage.src = imageUrl;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

function salvarPerfil() {
    const loggedInEmail = sessionStorage.getItem("loggedInUser");
    if (!loggedInEmail) {
        alert("Usuário não logado.");
        window.location.href = "login.html";
        return;
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === loggedInEmail);
    if (userIndex === -1) {
        alert("Usuário não encontrado.");
        return;
    }

    const newName = document.getElementById("editName")?.value.trim();
    const newImage = sessionStorage.getItem("userImage");

    if (newName) {
        users[userIndex].name = newName;
        sessionStorage.setItem("userName", newName);
    }

    if (newImage) {
        users[userIndex].profileImage = newImage;
    }

    localStorage.setItem("users", JSON.stringify(users));

    alert("Perfil atualizado com sucesso!");
    window.location.href = "perfil.html";
}

function toggleChat() {
    const chatBox = document.getElementById("chat-box");
    if (chatBox.classList.contains("d-none")) {
        chatBox.classList.remove("d-none", "animate__fadeOutDown");
        chatBox.classList.add("animate__fadeInUp");
    } else {
        chatBox.classList.remove("animate__fadeInUp");
        chatBox.classList.add("animate__fadeOutDown");
        setTimeout(() => chatBox.classList.add("d-none"), 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Carregar imagem do bot (fixa)
    const botAvatar = document.getElementById("botAvatar");
    botAvatar.src = "images/luddis-bot.png"; // substitua com o caminho da sua imagem do bot

    // Carregar imagem do usuário
    const userAvatar = document.getElementById("userAvatar");
    const userImage = sessionStorage.getItem("userImage");
    if (userImage && userAvatar) {
        userAvatar.src = userImage;
    }
});
