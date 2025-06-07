document.addEventListener("DOMContentLoaded", function () {
    const userImage = sessionStorage.getItem("userImage");
    const userName = sessionStorage.getItem("userName");
    const loggedInEmail = sessionStorage.getItem("loggedInUser");

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
            name: name && name !== "" ? name : "Nickname não informado"
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
            const name = document.getElementById("name")?.value.trim() || "";
            const profilePicInput = document.getElementById("profilePic");

            if (password !== passwordConfirm) {
                alert("As senhas não coincidem!");
                return;
            }

            const users = getUsers();
            if (users.some(user => user.email === email)) {
                alert("Esse email já está cadastrado!");
                return;
            }

            const file = profilePicInput?.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    saveUser(email, password, e.target.result, name);
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = "login.html";
                };
                reader.readAsDataURL(file);
            } else {
                saveUser(email, password, null, name);
                alert("Cadastro realizado com sucesso!");
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

            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                sessionStorage.setItem("loggedInUser", email);
                sessionStorage.setItem("userImage", user.profileImage || "");
                sessionStorage.setItem("userName", user.name || "Nome não informado");
                alert("Login bem-sucedido!");
                window.location.href = "home.html";
            } else {
                alert("Email ou senha incorretos.");
            }
        });
    }

    // === Preencher informações no header ===
    const headerImage = document.getElementById("profileImage");
    const headerName = document.getElementById("userName");
    const userEmailElement = document.getElementById("userEmail");

    if (userEmailElement && loggedInEmail) userEmailElement.innerText = loggedInEmail;
    if (headerImage && userImage) headerImage.src = userImage;
    if (headerName && userName) headerName.innerText = userName;

    const profileName = document.getElementById("profileName");
    const profilePic = document.getElementById("profilePic");

    if (profileName && userName) profileName.innerText = userName;
    if (profilePic && userImage) profilePic.src = userImage;

    // === Logout ===
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            sessionStorage.clear();
            alert("Você saiu da conta.");
            window.location.href = "login.html";
        });
    }

    // === Menu lateral ===
    const menuButton = document.getElementById("menuButton");
    const sideMenu = document.getElementById("sideMenu");

    if (menuButton && sideMenu) {
        menuButton.addEventListener("click", () => {
            sideMenu.classList.toggle("open");
        });

        document.addEventListener("click", (event) => {
            if (!sideMenu.contains(event.target) && !menuButton.contains(event.target)) {
                sideMenu.classList.remove("open");
            }
        });
    }

    // === Marcar link ativo no menu lateral ===
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll("#sideMenu ul li a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // === Editar perfil: atualizar imagem ===
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

    // === Avatar da galeria ===
    const avatarPreview = document.getElementById("avatarSelecionado");
    if (avatarPreview && userImage) {
        avatarPreview.src = userImage;
    }

    // === Chatbot: imagem do bot e usuário ===
    const botAvatar = document.getElementById("botAvatar");
    if (botAvatar) botAvatar.src = "imagens/luddis-bot.png"; // ajuste para sua pasta

    const userAvatar = document.getElementById("userAvatar");
    if (userAvatar && userImage) {
        userAvatar.src = userImage;
    }

    // === Tutorial ===
    const video = document.getElementById('tutorialVideo');
    const btnAssistido = document.getElementById('btnAssistido');

    if (video && btnAssistido) {
        const assistido = localStorage.getItem('tutorialAssistido');
        if (assistido === 'true') {
            btnAssistido.classList.remove('btn-outline-success');
            btnAssistido.classList.add('btn-success');
            btnAssistido.innerHTML = '<i class="bi bi-check-circle-fill"></i> Assistido';
            btnAssistido.disabled = true;
        }

        video.addEventListener('ended', () => {
            localStorage.setItem('tutorialAssistido', 'true');
            btnAssistido.classList.remove('btn-outline-success');
            btnAssistido.classList.add('btn-success');
            btnAssistido.innerHTML = '<i class="bi bi-check-circle-fill"></i> Assistido';
            btnAssistido.disabled = true;

            const modalEl = document.getElementById('entendeuModal');
            if (modalEl) {
                const modal = new bootstrap.Modal(modalEl);
                modal.show();

                document.getElementById('btnProntoJogar')?.addEventListener('click', () => {
                    modal.hide();
                    window.location.href = 'mapa.html';
                });
            }
        });

        btnAssistido.addEventListener('click', () => {
            localStorage.setItem('tutorialAssistido', 'true');
            btnAssistido.classList.remove('btn-outline-success');
            btnAssistido.classList.add('btn-success');
            btnAssistido.innerHTML = '<i class="bi bi-check-circle-fill"></i> Assistido';
            btnAssistido.disabled = true;
        });
    }
});

// === Salvar alterações do perfil ===
function salvarPerfil() {
    const loggedInEmail = sessionStorage.getItem("loggedInUser");
    if (!loggedInEmail) {
        alert("Usuário não logado.");
        window.location.href = "login.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
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

// === Abrir/Fechar Chat ===
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
